import { Navigate, createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import { routes } from './constants';
import PublicLayout from './layouts/PublicLayout';

const router = createBrowserRouter([
  {
    path: routes.index,
    element: <Navigate to={routes.login} />,
  },
  {
    element: <PublicLayout />,
    children: [
      {
        path: routes.login,
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
