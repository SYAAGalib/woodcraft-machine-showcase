
import { Outlet } from 'react-router-dom';
import Header from './Header';
import FloatingContact from './FloatingContact';
import { RecentViewsProvider } from '@/contexts/RecentViewsContext';

const Layout = () => {
  return (
    <RecentViewsProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Outlet />
        </main>
        <FloatingContact />
      </div>
    </RecentViewsProvider>
  );
};

export default Layout;
