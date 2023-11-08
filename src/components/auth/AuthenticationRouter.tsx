import { useAppDispatch, useAppSelector } from '@/app/hook';
import { getCurrentUserByIdAsync } from '@/features/user/user.slice';
import { clearStorage, getLocalStorageId, getLocalStorageToken } from '@/utils/auth.util';
import { isRejected } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

interface AuthenticationRouterProps {
  children?: React.ReactNode;
}

const AuthenticationRouter = (props: AuthenticationRouterProps) => {
  const { children } = props;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = getLocalStorageToken();
  const id = getLocalStorageId();

  const currentUser = useAppSelector((state) => state.user.currentUser);

  const init = async () => {
    if (token && id) {
      if (!currentUser) {
        const currentUserApiAsyncAction = await dispatch(getCurrentUserByIdAsync(Number(id)));
        if (isRejected(currentUserApiAsyncAction)) {
          clearStorage();
        }
      }
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (token) {
    if (currentUser) {
      if (id) {
        return <>{children}</>;
      } else {
        return <Navigate to={'/login'} replace />;
      }
    } else {
      // TODO: Add spinner
      return <></>;
    }
  }

  return <Navigate to={'/login'} replace />;
};

export default AuthenticationRouter;
