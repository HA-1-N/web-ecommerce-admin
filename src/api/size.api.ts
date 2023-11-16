import HTTP_ADMIN_SERVICE from '@/configs/axios.config';
import { ParamsModel } from '@/model/page.model';
import { SizeModel } from '@/model/size.model';

export const createSizeApi = (body: SizeModel) => {
  return HTTP_ADMIN_SERVICE.post('/size/create', body);
};

export const filterSizeApi = (body: SizeModel, params: ParamsModel) => {
  return HTTP_ADMIN_SERVICE.post('/size/filter', body, { params });
};

export const getSizeByIdApi = (id: string) => {
  return HTTP_ADMIN_SERVICE.get(`/size/detail/${id}`);
};

export const updateSizeApi = (body: SizeModel) => {
  return HTTP_ADMIN_SERVICE.put('/size/update', body);
};
