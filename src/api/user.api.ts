import HTTP_ADMIN_SERVICE from '@/configs/axios.config';

export const getCurrentUserByIdApi = (id: number) => {
  return HTTP_ADMIN_SERVICE.get(`/user/get-by-id/${id}`);
};
