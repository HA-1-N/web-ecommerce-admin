import AuthenticationRouter from '@/components/auth/AuthenticationRouter';
import AuthorizationRouter from '@/components/auth/AuthorizationRouter';
import { ROLE_CONSTANT } from '@/constants/auth.constant';
import ErrorPage from '@/pages/404/ErrorPage';
import Login from '@/pages/auth/login/Login';
import Dashboard from '@/pages/dashboard/Dashboard';
import LayoutApp from '@/pages/layout/LayoutApp';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// const dashboardRouter = {
//   path: '/dashboard',
//   element: <Outlet />,
//   children: [{ index: true, element: <Dashboard /> }],
// };

const dashboardRouter = {
  path: '/',
  element: <Dashboard />,
  children: [],
};

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: (
      <AuthenticationRouter>
        <AuthorizationRouter roles={[ROLE_CONSTANT.ADMIN]}>
          <LayoutApp />
        </AuthorizationRouter>
      </AuthenticationRouter>
    ),
    children: [dashboardRouter],
  },
  {
    path: '/404',
    element: <ErrorPage />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
