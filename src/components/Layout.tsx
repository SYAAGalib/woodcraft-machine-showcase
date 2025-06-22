
import { Outlet } from 'react-router-dom';
import Header from './Header';
import FloatingContact from './FloatingContact';

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Outlet />
      </main>
      <FloatingContact />
    </div>
  );
};

export default Layout;
