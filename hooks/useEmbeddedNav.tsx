import useEmbeddedApp from "./useEmbeddedApp";
import useEmbeddedRoute from "./useEmbeddedRoute";

export default function useEmbeddedNav() {
    const sapoApp = useEmbeddedApp();
    const embeddedRoute = useEmbeddedRoute();
  
    const renderNav = (activeMenu?: 'dashboard' | 'products' | 'orders') => {
      sapoApp.Menu.initialize({
        title: 'Sample Embedded App',
        expand: true,
        links: [
          {
            label: 'Dashboard',
            active: activeMenu === 'dashboard',
            href: '/embedded',
            callback: function () {
              embeddedRoute.replace('/embedded');
            },
          },
          {
            label: 'Products Management',
            active: activeMenu === 'products',
            href: '/embedded/products',
            callback: function () {
              embeddedRoute.replace('/embedded/products');
            },
          },
          {
            label: 'Orders Management',
            active: activeMenu === 'orders',
            href: '/embedded/orders',
            callback: function () {
              embeddedRoute.replace('/embedded/orders');
            },
          }
        ],
      });
    };
  
    return {
      renderNav,
    };
  }
  