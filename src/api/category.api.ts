import HTTP_ADMIN_SERVICE from '@/configs/axios.config';
import { CategoryModels } from '@/model/category.model';
import { ParamsModel } from '@/model/page.model';

export const getAllCategoryApi = () => {
  return HTTP_ADMIN_SERVICE.get('/category/get-all');
};

export const filterCategoryApi = (body: CategoryModels, params: ParamsModel) => {
  return HTTP_ADMIN_SERVICE.post('/category/filter', body, { params });
};

export const getCategoryByIdApi = (id: number | undefined) => {
  return HTTP_ADMIN_SERVICE.get(`/category/find-by-id/${id}`);
};

export const createCategoryApi = (body: FormData) => {
  return HTTP_ADMIN_SERVICE.post('/category/create', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      type: 'formData',
    },
  });
};

export const updateCategoryApi = (body: FormData, id: number | undefined) => {
  return HTTP_ADMIN_SERVICE.post(`/category/update/${id}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      type: 'formData',
    },
  });
};

export const deleteCategoryApi = (id: number | undefined) => {
  return HTTP_ADMIN_SERVICE.delete(`/category/delete/${id}`);
};
