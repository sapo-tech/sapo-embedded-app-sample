import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import { SapoApp } from '../hooks/useEmbeddedApp';
import getConfig from 'next/config';
import Utils from '../commons/Utils';

interface Props {
  children: React.ReactNode;
}

export default function EmbeddedLayout({ children }: Props) {
  const {
    publicRuntimeConfig: { embeddedApiKey },
  } = getConfig();

  const [initEmbedded, setInitEmbedded] = useState<boolean>(false);

  // embedded app push message khi window load nên phải init app trước đó, useEffect run code khi window.ready,
  if (typeof document !== 'undefined') {
    let params = new URL(document.location.href).searchParams;
    if (params.get('jwt')) {
      sessionStorage.setItem('sample_app_jwt', params.get('jwt'));
      sessionStorage.setItem(
        'sample_app_store_alias',
        Utils.ExtractSubDomain(params.get('tenant'))
      );
    }

    let sapoApp = (window as any).SapoApp as SapoApp;
    if (sapoApp && !sapoApp._isReady) {
      const subDomain =
        sessionStorage.getItem('sample_app_store_alias') ??
        Utils.ExtractSubDomain(params.get('tenant'));      
      if (typeof sapoApp !== 'undefined' && subDomain) {
        sapoApp.init({
          apiKey: embeddedApiKey,
          shopOrigin: `https://${subDomain}.mysapogo.com`,
        });
        const initSapo = () => {
          sapoApp.ready(() => {
            setInitEmbedded(true);
          });
          sapoApp.Bar.setTitle('Sample App Title');
        };
        initSapo();
      }
    } else {
      sapoApp.Bar.setTitle('Sample App Title');
    }
  }
  useEffect(() => {
    let sapoApp = (window as any).SapoApp as SapoApp;
    setInitEmbedded(sapoApp._isReady);
  }, []);

  return (
    <>
      <Script
        key="appjs"
        strategy="beforeInteractive"
        src="https://sapo.dktcdn.net/fe-cdn-production/lib/app/app.js?v=20210815"
      ></Script>
      {initEmbedded ? children : <div>Loading ...</div>}
    </>
  );
}
