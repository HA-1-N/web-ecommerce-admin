import HTTP_ADMIN_SERVICE from '@/configs/axios.config';
import { ParamsModel } from '@/model/page.model';
import { CreateProductModels, FilterProductModels } from '@/model/product.model';

export const createProductApi = (data: FormData) => {
  return HTTP_ADMIN_SERVICE.post('/product/create', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      type: 'formData',
    },
  });
};

export const filterProductApi = (body: FilterProductModels, params: ParamsModel) => {
  return HTTP_ADMIN_SERVICE.post('/product/filter', body, { params });
};

export const getProductByIdApi = (id: number) => {
  return HTTP_ADMIN_SERVICE.get(`/product/get-by-id/${id}`);
};
