import { useEffect } from 'react';
import EmbeddedLayout from '../../components/EmbeddedLayout';
import useEmbeddedApp from '../../hooks/useEmbeddedApp';
import useEmbeddedNav from '../../hooks/useEmbeddedNav';

export default function ProductsPage() {
  const { renderNav } = useEmbeddedNav();
  const embeddedApp = useEmbeddedApp();

  useEffect(() => {
    embeddedApp.Bar.setTitle('Products Management');
    renderNav('products');
  }, []);

  return (
    <div>
      <p>Hello from product page</p>
    </div>
  );
}

ProductsPage.layout = EmbeddedLayout;
