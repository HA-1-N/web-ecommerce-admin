import React from 'react';
import './App.css';
import AppRoutes from '@/routes/AppRoutes';
import { useAppSelector } from './app/hook';
import Spinner from '@/components/spinner/Spinner';

function App() {
  const count = useAppSelector((state) => state.counter.value);

  return (
    <>
      <Spinner open={count !== 0} />
      <AppRoutes />
    </>
  );
}

export default App;
