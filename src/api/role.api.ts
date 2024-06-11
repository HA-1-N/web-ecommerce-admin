import HTTP_ADMIN_SERVICE from '@/configs/axios.config';

export const getAllRoleApi = async () => {
  return HTTP_ADMIN_SERVICE.get('/role/get-all');
};
