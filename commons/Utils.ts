const subdomainRegex: RegExp = new RegExp("(.*).mysapogo.com");

export default class Utils {
  public static ExtractSubDomain(domain: string): string | null {
    let regexExec = subdomainRegex.exec(domain);
    return regexExec ? regexExec[1] : null;
  }
}
