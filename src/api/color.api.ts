import HTTP_ADMIN_SERVICE from '@/configs/axios.config';
import { ColorModels } from '@/model/color.model';
import { ParamsModel } from '@/model/page.model';

export const getAllColorApi = () => {
  return HTTP_ADMIN_SERVICE.get('/color/get-all');
};

export const filterColorApi = (body: ColorModels, params: ParamsModel) => {
  return HTTP_ADMIN_SERVICE.post('/color/filter', body, { params });
};

export const getColorByIdApi = (id: number | undefined) => {
  return HTTP_ADMIN_SERVICE.get(`/color/find-by-id/${id}`);
};

export const createColorApi = (body: ColorModels) => {
  return HTTP_ADMIN_SERVICE.post('/color/create', body);
};

export const updateColorApi = (body: ColorModels) => {
  return HTTP_ADMIN_SERVICE.post(`/color/update`, body);
};

export const deleteColorApi = (id: number | undefined) => {
  return HTTP_ADMIN_SERVICE.delete(`/color/delete/${id}`);
};
