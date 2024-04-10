import HTTP_ADMIN_SERVICE from '@/configs/axios.config';
import { OrderStatusModels } from '@/model/order-status.model';
import { ParamsModel } from '@/model/page.model';

export const createOrderStatusApi = (body: OrderStatusModels) => {
  return HTTP_ADMIN_SERVICE.post('/order-status/create', body);
};

export const filterOrderStatusApi = (body: OrderStatusModels, params: ParamsModel) => {
  return HTTP_ADMIN_SERVICE.post('/order-status/filter', body, { params });
};

export const getAllOrderStatusApi = () => {
  return HTTP_ADMIN_SERVICE.get('/order-status/get-all');
};
