import AuthenticationRouter from '@/components/auth/AuthenticationRouter';
import AuthorizationRouter from '@/components/auth/AuthorizationRouter';
import { ROLE_CONSTANT } from '@/constants/auth.constant';
import ErrorPage from '@/pages/404/ErrorPage';
import Login from '@/pages/auth/login/Login';
import ResetPassword from '@/pages/auth/reset-password/ResetPassword';
import VerifyEmail from '@/pages/auth/verify-email/VerifyEmail';
import ListBrand from '@/pages/brand/list-brand/ListBrand';
import ListCategory from '@/pages/category/list-category/ListCategory';
import Dashboard from '@/pages/dashboard/Dashboard';
import LayoutApp from '@/pages/layout/LayoutApp';
import ListProduct from '@/pages/product/list-product/ListProduct';
import ListSize from '@/pages/size/list-size/ListSize';
import ListUser from '@/pages/user/list-user/ListUser';
import React from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

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

const productRouter = {
  path: '',
  element: <Outlet />,
  children: [
    {
      path: '/product/list-product',
      element: <ListProduct />,
      children: [],
    },
  ],
};

const userRouter = {
  path: '',
  element: <Outlet />,
  children: [
    {
      path: '/user/list-user',
      element: <ListUser />,
    },
  ],
};

const sizeRouter = {
  path: '/size',
  element: <Outlet />,
  children: [
    {
      path: '/size/list-size',
      element: <ListSize />,
    },
  ],
};

const categoryRouter = {
  path: '/category',
  element: <Outlet />,
  children: [
    {
      path: '/category/list-category',
      element: <ListCategory />,
    },
  ],
};

const brandRouter = {
  path: '/brand',
  element: <Outlet />,
  children: [
    {
      path: '/brand/list-brand',
      element: <ListBrand />,
    },
  ],
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
    children: [dashboardRouter, userRouter, productRouter, sizeRouter, categoryRouter, brandRouter],
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
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
