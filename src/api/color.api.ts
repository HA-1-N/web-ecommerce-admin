import HTTP_ADMIN_SERVICE from '@/configs/axios.config';

export const getAllColorApi = () => {
  return HTTP_ADMIN_SERVICE.get('/color/get-all');
};
