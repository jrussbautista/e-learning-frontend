import { routes } from '@/constants';
import useAuthStore from '@/store/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  const currentUser = useAuthStore((state) => state.currentUser);

  if (!currentUser) {
    return <Navigate to={routes.login} replace />;
  }

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default ProtectedLayout;
