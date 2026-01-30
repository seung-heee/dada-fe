import { Outlet } from 'react-router';
import Header from '@/components/shared/Header.tsx';
import { Toaster } from 'sonner';

const RootLayout = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <div className="px-5">
        <Outlet />
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default RootLayout;
