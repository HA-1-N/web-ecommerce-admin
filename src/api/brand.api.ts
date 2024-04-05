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

export const createBrandApi = (body: FormData) => {
  return HTTP_ADMIN_SERVICE.post('/brand/create', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      type: 'formData',
    },
  });
};

export const updateBrandApi = (body: FormData, id: number | undefined) => {
  return HTTP_ADMIN_SERVICE.post(`/brand/update/${id}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      type: 'formData',
    },
  });
};

export const deleteBrandApi = (id: number | undefined) => {
  return HTTP_ADMIN_SERVICE.delete(`/brand/delete/${id}`);
};
