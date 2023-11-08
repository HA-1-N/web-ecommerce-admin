import React, { useEffect } from 'react';
import './App.css';
import AppRoutes from '@/routes/AppRoutes';
import { useAppSelector } from './app/hook';
import Spinner from '@/components/spinner/Spinner';
import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

function App() {
  const [api, contextHolder] = notification.useNotification();

  const count = useAppSelector((state) => state.counter.value);
  const loading = useAppSelector((state) => state.counter.spinnerLoading);
  const notificationMsg = useAppSelector((state) => state.counter.notification);

  useEffect(() => {
    if (notificationMsg) {
      const { type, message, description } = notificationMsg;
      api[type as NotificationType]({
        message,
        description,
      });
    }
  }, [api, notificationMsg]);

  return (
    <>
      {contextHolder}
      <div className="App">
        <Spinner open={loading} />
        <Spinner open={count !== 0} />
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
