import HTTP_ADMIN_SERVICE from '@/configs/axios.config';
import { ParamsModel } from '@/model/page.model';
import { CreateProductModels, FilterProductModels, FilterProductQuantityModels } from '@/model/product.model';

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

export const updateProductApi = (data: FormData) => {
  return HTTP_ADMIN_SERVICE.post('/product/update', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      type: 'formData',
    },
  });
};

export const deleteProductApi = (id: number) => {
  return HTTP_ADMIN_SERVICE.delete(`/product/delete/${id}`);
};

export const getAllIdNameProductApi = () => {
  return HTTP_ADMIN_SERVICE.get('/product/get-id-name');
};

// product quantity
export const createProductQuantityApi = (data: FormData) => {
  return HTTP_ADMIN_SERVICE.post('/product-quantity/create', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      type: 'formData',
    },
  });
};

export const updateProductQuantityApi = (data: FormData) => {
  return HTTP_ADMIN_SERVICE.post('/product-quantity/update', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      type: 'formData',
    },
  });
};

export const filterProductQuantityApi = (data: FilterProductQuantityModels, params: ParamsModel) => {
  return HTTP_ADMIN_SERVICE.post('/product-quantity/filter', data, { params });
};

export const deleteProductQuantityApi = (id: number) => {
  return HTTP_ADMIN_SERVICE.post(`/product-quantity/delete/${id}`);
};

export const getProductByHotCategoryApi = (id: number, params: ParamsModel) => {
  return HTTP_ADMIN_SERVICE.get(`/product/get-product-by-hot-category/${id}`, { params });
};

export const getProductCategoryByIdApi = (id: number) => {
  return HTTP_ADMIN_SERVICE.get(`/product-quantity/get-by-id/${id}`);
};
