import { NextRouter, useRouter } from 'next/dist/client/router';
import useEmbeddedApp, { SapoApp } from './useEmbeddedApp';

class EmbeddedRoute {
  private router: NextRouter;
  private sapoApp: SapoApp;
  constructor(route: NextRouter, sapoApp: SapoApp) {
    this.router = route;
    this.sapoApp = sapoApp;
  }

  async push(url: string): Promise<boolean> {
    await this.router.push(url);
    this.sapoApp.pushState(url);
    return true;
  }

  async replace(url: string): Promise<boolean> {
    await this.router.push(url);
    this.sapoApp.pushState(url);
    return true;
  }

  reload() {
    this.router.reload();
  }
}

export default function useEmbeddedRoute() {
  const router = useRouter();
  const sapoApp = useEmbeddedApp();
  return new EmbeddedRoute(router, sapoApp);
}
