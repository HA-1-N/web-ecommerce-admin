import React from 'react';
import { Outlet } from 'react-router-dom';

const LayoutApp = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default LayoutApp;
