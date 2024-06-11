import AuthenticationRouter from '@/components/auth/AuthenticationRouter';
import AuthorizationRouter from '@/components/auth/AuthorizationRouter';
import { ROLE_CONSTANT } from '@/constants/auth.constant';
import ErrorPage from '@/pages/404/ErrorPage';
import Login from '@/pages/auth/login/Login';
import ResetPassword from '@/pages/auth/reset-password/ResetPassword';
import VerifyEmail from '@/pages/auth/verify-email/VerifyEmail';
import VerifyOtp from '@/pages/auth/verify-otp/VerifyOtp';
import CreateBanner from '@/pages/banner/create/CreateBanner';
import ListBanner from '@/pages/banner/list-banner/ListBanner';
import UpdateBanner from '@/pages/banner/update/UpdateBanner';
import ListBrand from '@/pages/brand/list-brand/ListBrand';
import ListCategory from '@/pages/category/list-category/ListCategory';
import ListColor from '@/pages/color/list-color/ListColor';
import Dashboard from '@/pages/dashboard/Dashboard';
import HotCategoryProductDetail from '@/pages/hot-category/hot-category-product-detail/HotCategoryProductDetail';
import ListHotCategory from '@/pages/hot-category/list-hot-category/ListHotCategory';
import LayoutApp from '@/pages/layout/LayoutApp';
import OrderStatus from '@/pages/order-status/OrderStatus';
import OrderDetail from '@/pages/order/detail/OrderDetail';
import ListOrder from '@/pages/order/list-order/ListOrder';
import ListPaymentType from '@/pages/payment-type/ListPaymentType';
import CreateProductQuantity from '@/pages/product/create-product-quantity/CreateProductQuantity';
import CreateProduct from '@/pages/product/create/CreateProduct';
import ListProductQuantity from '@/pages/product/list-product-quantity/ListProductQuantity';
import ListProduct from '@/pages/product/list-product/ListProduct';
import UpdateProductQuantity from '@/pages/product/update-product-quantity/UpdateProductQuantity';
import UpdateProduct from '@/pages/product/update/UpdateProduct';
import ShippingMethod from '@/pages/shipping-method/ShippingMethod';
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
    {
      path: '/product/create-product',
      element: <CreateProduct />,
      children: [],
    },
    {
      path: '/product/update-product/:id',
      element: <UpdateProduct />,
      children: [],
    },
  ],
};

const productQuantityRouter = {
  path: '/product',
  element: <Outlet />,
  children: [
    {
      path: '/product/list-product-quantity',
      element: <ListProductQuantity />,
      children: [],
    },
    {
      path: '/product/create-product-quantity',
      element: <CreateProductQuantity />,
      children: [],
    },
    {
      path: '/product/update-product-quantity/:id',
      element: <UpdateProductQuantity />,
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

const colorRouter = {
  path: '/color',
  eletment: <Outlet />,
  children: [
    {
      path: '/color/list-color',
      element: <ListColor />,
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

const bannerRouter = {
  path: '/banner',
  element: <Outlet />,
  children: [
    {
      path: '/banner/list-banner',
      element: <ListBanner />,
    },
    {
      path: '/banner/create-banner',
      element: <CreateBanner />,
    },
    {
      path: '/banner/update-banner/:id',
      element: <UpdateBanner />,
    },
  ],
};

const hotCategoryRouter = {
  path: '/hot-category',
  element: <Outlet />,
  children: [
    {
      path: '/hot-category/list-hot-category',
      element: <ListHotCategory />,
    },
    {
      path: '/hot-category/:id/hot-category-product-detail',
      element: <HotCategoryProductDetail />,
    },
  ],
};

const paymetTypeRouter = {
  path: '/payment-type',
  element: <ListPaymentType />,
  children: [],
};

const shippingMethodRouter = {
  path: '/shipping-method',
  element: <ShippingMethod />,
  children: [],
};

const orderStatusRouter = {
  path: '/order-status',
  element: <OrderStatus />,
  children: [],
};

const orderRouter = {
  path: '',
  element: <Outlet />,
  children: [
    {
      path: '/order',
      element: <ListOrder />,
    },
    {
      path: '/order/:id',
      element: <OrderDetail />,
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
    children: [
      dashboardRouter,
      userRouter,
      productRouter,
      productQuantityRouter,
      sizeRouter,
      colorRouter,
      categoryRouter,
      brandRouter,
      bannerRouter,
      hotCategoryRouter,
      paymetTypeRouter,
      shippingMethodRouter,
      orderStatusRouter,
      orderRouter,
    ],
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />,
  },
  {
    path: '/verify-otp',
    element: <VerifyOtp />,
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
