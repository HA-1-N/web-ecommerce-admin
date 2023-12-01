import HTTP_ADMIN_SERVICE from '@/configs/axios.config';

export const getAllCategoryApi = () => {
  return HTTP_ADMIN_SERVICE.get('/category/get-all');
};
