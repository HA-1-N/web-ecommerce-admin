import HTTP_ADMIN_SERVICE from '@/configs/axios.config';
import { ParamsModel } from '@/model/page.model';

export const createBannerApi = (data: FormData) => {
  return HTTP_ADMIN_SERVICE.post('/banners/create', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      type: 'formData',
    },
  });
};

export const updateBannerApi = (data: FormData) => {
  return HTTP_ADMIN_SERVICE.post('/banners/update', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      type: 'formData',
    },
  });
};

export const getAllBannerApi = (params: ParamsModel) => {
  return HTTP_ADMIN_SERVICE.get('/banners/get-all', { params });
};

export const getBannerByIdApi = (id: number) => {
  return HTTP_ADMIN_SERVICE.get(`/banners/get-by-id/${id}`);
};

export const deleteBannerApi = (id: number) => {
  return HTTP_ADMIN_SERVICE.post(`/banners/delete/${id}`);
};
