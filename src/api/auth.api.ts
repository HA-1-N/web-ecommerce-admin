import HTTP_ADMIN_SERVICE from '@/configs/axios.config';
import { LoginProps } from '@/model/auth.model';

export const loginApi = async (body: LoginProps) => {
  return await HTTP_ADMIN_SERVICE.post('/auth/login', body);
};

export const verifyEmailApi = async (params: any) => {
  return await HTTP_ADMIN_SERVICE.get('/auth/verify-email', { params });
};

export const resetPasswordApi = async (body: any) => {
  return await HTTP_ADMIN_SERVICE.post('/auth/reset-password', body);
};
