import HTTP_ADMIN_SERVICE from '@/configs/axios.config';
import { ParamsModel } from '@/model/page.model';
import { FilterUserModel } from '@/model/user.model';

export const getCurrentUserByIdApi = (id: number) => {
  return HTTP_ADMIN_SERVICE.get(`/user/get-by-id/${id}`);
};

export const filterUserApi = (body: FilterUserModel, params: ParamsModel) => {
  return HTTP_ADMIN_SERVICE.post('/user/filter', body, { params });
};
