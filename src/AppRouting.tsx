import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { routes } from '@/constants';
import PublicLayout from '@/layouts/PublicLayout';
import PrivateLayout from '@/layouts/ProtectedLayout';
import useAuthStore from '@/store/useAuthStore';
import LoginPage from '@/pages/Auth/LoginPage';
import DashboardPage from '@/pages/Dashboard/DashboardPage';
import SubjectsPage from '@/pages/Subjects/SubjectsPage';
import SubjectsCreatePage from '@/pages/Subjects/SubjectsCreatePage';
import SubjectsEditPage from '@/pages/Subjects/SubjectsEditPage';

const AppRouting = () => {
  const currentUser = useAuthStore((state) => state.currentUser);

  const router = createBrowserRouter([
    {
      path: routes.index,
      element: <Navigate to={currentUser ? routes.dashboard : routes.login} />,
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
    {
      element: <PrivateLayout />,
      children: [
        {
          path: routes.dashboard,
          element: <DashboardPage />,
        },
        {
          path: routes.subjects,
          element: <SubjectsPage />,
        },
        {
          path: routes.subjectsCreate,
          element: <SubjectsCreatePage />,
        },
        {
          path: routes.subjectsEdit,
          element: <SubjectsEditPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
export default AppRouting;
