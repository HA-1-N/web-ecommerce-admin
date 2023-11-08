import HTTP_ADMIN_SERVICE from '@/configs/axios.config';

export const loginApi = async (body: any) => {
  return await HTTP_ADMIN_SERVICE.post('/auth/login', body);
};
