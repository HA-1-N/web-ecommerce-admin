import HTTP_ADMIN_SERVICE from '@/configs/axios.config';
import { ParamsModel } from '@/model/page.model';
import { ShippingMethodModels } from '@/model/shipping-method.model';

export const createShippingMethodApi = (body: ShippingMethodModels) => {
  return HTTP_ADMIN_SERVICE.post('/shipping-method/create', body);
};

export const updateShippingMethodApi = (body: ShippingMethodModels) => {
  return HTTP_ADMIN_SERVICE.post(`/shipping-method/update`, body);
};

export const filterShippingMethodApi = (body: ShippingMethodModels, params: ParamsModel) => {
  return HTTP_ADMIN_SERVICE.post('/shipping-method/filter', body, { params });
};

export const getShippingMethodByIdApi = (id: number | undefined) => {
  return HTTP_ADMIN_SERVICE.get(`/shipping-method/find-by-id/${id}`);
};
