import HTTP_ADMIN_SERVICE from '@/configs/axios.config';

export const loginApi = async (body: any) => {
  return await HTTP_ADMIN_SERVICE.post('/auth/login', body);
};

export const verifyEmailApi = async (params: any) => {
  return await HTTP_ADMIN_SERVICE.get('/auth/verify-email', { params });
};

export const resetPasswordApi = async (body: any) => {
  return await HTTP_ADMIN_SERVICE.post('/auth/reset-password', body);
};
