import { createHmac } from 'crypto';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { embeddedApiKey },
  serverRuntimeConfig: { embeddedApiSecret },
} = getConfig();

export default class OauthService {
  public static async getToken(
    code: string,
    subdomain: string
  ): Promise<string | null> {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", embeddedApiKey);
    urlencoded.append("client_secret", embeddedApiSecret);
    urlencoded.append("code", code);

    let response = await fetch(
      `https://${subdomain}.mysapogo.com/admin/oauth/access_token`,
      {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      }
    );
    if (!response.ok) {
      return null;
    }

    let data = await response.json();
    let token = data.access_token;
    return token;
  }

  public static validateRequest(code : string, hmac : string, tenant : string, timestamp: string) {
    let data = code
      ? `code=${code}&tenant=${tenant}&timestamp=${timestamp}`
      : `tenant=${tenant}&timestamp=${timestamp}`;
    let hashTest = createHmac("sha256", embeddedApiSecret)
      .update(data)
      .digest("base64");
    return hashTest === hmac;
  }
}
