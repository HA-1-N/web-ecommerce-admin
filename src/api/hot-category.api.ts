import HTTP_ADMIN_SERVICE from '@/configs/axios.config';
import { HotCategoryModels } from '@/model/hot-category.model';
import { ParamsModel } from '@/model/page.model';

export const getAllHotCategoryApi = async (params: ParamsModel) => {
  return HTTP_ADMIN_SERVICE.get('/hot-category/get-all', { params });
};

export const createHotCategoryApi = async (body: HotCategoryModels) => {
  return HTTP_ADMIN_SERVICE.post('/hot-category/create', body);
};

export const updateHotCategoryApi = async (body: HotCategoryModels) => {
  return HTTP_ADMIN_SERVICE.put('/hot-category/update', body);
};

export const deleteHotCategoryApi = async (id: string | number) => {
  return HTTP_ADMIN_SERVICE.delete(`/hot-category/delete/${id}`);
};

export const findHotCategoryByIdApi = async (id: number | undefined | null) => {
  return HTTP_ADMIN_SERVICE.get(`/hot-category/find-by-id/${id}`);
};

export const addHotCategoryProductApi = async (body: any, id: number | undefined) => {
  return HTTP_ADMIN_SERVICE.post(`/hot-category/add-product-hot-category/${id}`, body);
};

export const deleteHotCategoryProductApi = async (body: any, id: number | undefined) => {
  return HTTP_ADMIN_SERVICE.post(`/hot-category/delete-product-hot-category/${id}`, body);
};
