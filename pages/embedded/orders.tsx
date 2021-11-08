import { useEffect } from 'react';
import EmbeddedLayout from '../../components/EmbeddedLayout';
import useEmbeddedApp from '../../hooks/useEmbeddedApp';
import useEmbeddedNav from '../../hooks/useEmbeddedNav';

export default function OrdersPage() {
  const { renderNav } = useEmbeddedNav();
  const embeddedApp = useEmbeddedApp();

  useEffect(() => {
    embeddedApp.Bar.setTitle('Order Management');
    renderNav('orders');
  }, []);

  return (
    <div>
      <p>Hello from order page</p>
    </div>
  );
}

OrdersPage.layout = EmbeddedLayout;
