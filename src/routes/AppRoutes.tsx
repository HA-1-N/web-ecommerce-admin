import Login from '@/pages/auth/login/Login';
import Dashboard from '@/pages/dashboard/Dashboard';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  { path: '/login', element: <Login /> },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
