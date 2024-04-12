import HTTP_ADMIN_SERVICE from '@/configs/axios.config';
import { ParamsModel } from '@/model/page.model';

export const filterOrderApi = (body: any, params: ParamsModel) => {
  return HTTP_ADMIN_SERVICE.post('/order/filter', body, { params });
};

export const getOrderByIdApi = (id: number) => {
  return HTTP_ADMIN_SERVICE.get(`/order/get-order-by-id/${id}`);
};

export const changeOrderStatusApi = (body: any) => {
  return HTTP_ADMIN_SERVICE.post('/order/change-order-status', body);
};

export const getTotalOrderApi = () => {
  return HTTP_ADMIN_SERVICE.get('/order/total-order');
};

export const getTotalRevenueApi = () => {
  return HTTP_ADMIN_SERVICE.get('/order/total-revenue');
};
