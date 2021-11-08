import { useEffect } from 'react';
import EmbeddedLayout from '../../components/EmbeddedLayout';
import useEmbeddedApp from '../../hooks/useEmbeddedApp';
import useEmbeddedNav from '../../hooks/useEmbeddedNav';

export default function HomePage() {
  const { renderNav } = useEmbeddedNav();
  const embeddedApp = useEmbeddedApp();

  useEffect(() => {
    embeddedApp.Bar.setTitle('Dashboard');
    renderNav('dashboard');
  }, []);

  return (
    <div>
      <p>Hello from embedded app</p>
      <button onClick={() => embeddedApp.Menu.collapse()}>Collapse Menu</button>
      <button onClick={() => embeddedApp.Menu.expand()}>Expand Menu</button>
    </div>
  );
}

HomePage.layout = EmbeddedLayout;
