type Bar = {
  initialize(n: any): void;
  setIcon(icon: any): void;
  setTitle(title: string): void;
  setBreadcrumb(n: any): void;
  setPagination(n: any): void;
  loadingOn(): void;
  loadingOff(): void;
};

type MenuLinkOptions = {
  href?: string;
  external_link?: boolean;
  active?: boolean;
  label: string;
  callback?: (e: any) => void;
};

type MenuOptions = {
  title: string;
  expand?: boolean;
  cookie?: boolean;
  links?: MenuLinkOptions[];
};

type Menu = {
  initialize(options: MenuOptions): void;
  collapse(): void;
  expand(): void;
  openFeedBack(): void;
  hideMenu(): void;
  showMenu(): void;
};

type UninstallOptions = {
  confirm?: boolean;
  callback: () => void;
};

type User = {
  account_owner: boolean;
  email: string;
  full_name: string;
  id: number;
  locale: string;
  mobile: string;
  name: string;
};

export type SapoApp = {
  init(config: any): void;
  ready(callback: () => void): void;
  replaceState(location: string): void;
  pushState(location: string): void;
  redirect(location: string): void;
  toggleMinimize(): void;
  flashNotice(message: string): void;
  flashError(message: string): void;
  getWindowLocation(): any;
  setWindowLocation(location: string): any;
  Menu: Menu;
  shopOrigin: string;
  _isReady: boolean;
  Bar: Bar;
  User: {
    current: User;
  };
};

export default function useEmbeddedApp() {
  return (window as any)?.SapoApp as SapoApp;
}
