import HTTP_ADMIN_SERVICE from '@/configs/axios.config';
import { FilterUserModel } from '@/model/user.model';

export const getCurrentUserByIdApi = (id: number) => {
  return HTTP_ADMIN_SERVICE.get(`/user/get-by-id/${id}`);
};

export const filterUserApi = (body: FilterUserModel) => {
  return HTTP_ADMIN_SERVICE.post('/user/filter', body);
};
