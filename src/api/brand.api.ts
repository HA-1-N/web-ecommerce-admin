import HTTP_ADMIN_SERVICE from '@/configs/axios.config';
import { BrandModels } from '@/model/brand.model';
import { ParamsModel } from '@/model/page.model';

export const getAllBrandApi = () => {
  return HTTP_ADMIN_SERVICE.get('/brand/get-all');
};

export const filterBrandApi = (body: BrandModels, params: ParamsModel) => {
  return HTTP_ADMIN_SERVICE.post('/brand/filter', body, { params });
};

export const getBrandByIdApi = (id: number | undefined) => {
  return HTTP_ADMIN_SERVICE.get(`/brand/find-by-id/${id}`);
};

export const createBrandApi = (body: BrandModels) => {
  return HTTP_ADMIN_SERVICE.post('/brand/create', body);
};

export const updateBrandApi = (body: BrandModels, id: number | undefined) => {
  return HTTP_ADMIN_SERVICE.post(`/brand/update/${id}`, body);
};

export const deleteBrandApi = (id: number | undefined) => {
  return HTTP_ADMIN_SERVICE.delete(`/brand/delete/${id}`);
};
