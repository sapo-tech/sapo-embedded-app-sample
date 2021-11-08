import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Fragment, useState } from 'react';
import StoreService from './../services/StoreService';
import JwtService from '../services/JwtService';
import OauthService from '../services/OauthService';
import Utils from '../commons/Utils';
import getConfig from 'next/config';

const Install = ({
  status,
  errorCode,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [domain, setDomain] = useState('');
  const {
    publicRuntimeConfig: {
      embeddedApiKey,
      embeddedRedirectUrl,
      embeddedScopes,
    },
  } = getConfig();
  if (
    errorCode === 'INVALID_DOMAIN' ||
    errorCode === 'CAN_NOT_GET_SAPO_ACCESS_TOKEN'
  ) {
    return (
      <Fragment>
        <input
          placeholder="Nhập domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
        <button
          onClick={() => {
            window.location.href = `https://${
              Utils.ExtractSubDomain(domain) ?? domain
            }.mysapogo.com/admin/oauth/authorize?client_id=${embeddedApiKey}&scope=${embeddedScopes}&redirect_uri=${embeddedRedirectUrl}`;
          }}
        >
          Cài app
        </button>
      </Fragment>
    );
  }

  return <Fragment>Request invalid</Fragment>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { code, hmac, tenant, timestamp } = context.query;

  let subdomain = Utils.ExtractSubDomain(tenant as string);

  const {
    publicRuntimeConfig: {
      embeddedApiKey,
      embeddedRedirectUrl,
      embeddedScopes,
    },
  } = getConfig();

  if (!subdomain) {
    return {
      props: {
        status: 'error',
        errorCode: 'INVALID_DOMAIN',
      },
    };
  }

  if (
    !OauthService.validateRequest(
      code as string,
      hmac as string,
      tenant as string,
      timestamp as string
    )
  ) {
    return {
      props: {
        status: 'error',
        errorCode: 'INVALID_REQUEST',
      },
    };
  }

  if (code) {
    // accessToken to call sapo API
    // - intend to use for server call server so DO NOT expose to client side
    // - this token only invalid when store uninstall this app, so shoud be persist in DB to use later
    let token = await OauthService.getToken(code as string, subdomain);

    if (token) {
      StoreService.saveStore({
        subdomain,
        token,
      });

      let jwt = JwtService.genToken(subdomain);

      return {
        redirect: {
          permanent: false,
          destination: `/embedded?jwt=${jwt}&tenant=${subdomain}.mysapogo.com`,
        },
      };
    }
  } else {
    let store = StoreService.getBySubDomain(subdomain);
    if (store) {
      let jwt = JwtService.genToken(store.subdomain);
      return {
        redirect: {
          permanent: false,
          destination: `/embedded?jwt=${jwt}&tenant=${subdomain}.mysapogo.com`,
        },
      };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: `https://${tenant}/admin/oauth/authorize?client_id=${embeddedApiKey}&scope=${embeddedScopes.join(
            ','
          )}&redirect_uri=${embeddedRedirectUrl}`,
        },
      };
    }
  }

  return { props: {} };
};

export default Install;
