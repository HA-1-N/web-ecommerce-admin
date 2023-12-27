import HTTP_ADMIN_SERVICE from '@/configs/axios.config';

export const getAllBrandApi = () => {
  return HTTP_ADMIN_SERVICE.get('/brand/get-all');
};
