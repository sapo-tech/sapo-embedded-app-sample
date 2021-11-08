import jwt, { JwtPayload } from "jsonwebtoken";
import getConfig from 'next/config';

const {
  serverRuntimeConfig: { embeddedApiSecret },
} = getConfig();

export default class JwtService {
  public static genToken(subDomain: string): string {
    return jwt.sign({ subDomain }, embeddedApiSecret, { expiresIn: "1h" });
  }

  public static decodeToken(token: string): string | null {
    try {
      let data = jwt.verify(token, embeddedApiSecret) as JwtPayload;
      return data.subDomain;
    } catch (err) {
      return null;
    }
  }
}
