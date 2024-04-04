import HTTP_ADMIN_SERVICE from '@/configs/axios.config';
import { ParamsModel } from '@/model/page.model';
import { PaymentTypeModels } from '@/model/payment-type.model';

export const createPaymentTypeApi = (data: PaymentTypeModels) => {
  return HTTP_ADMIN_SERVICE.post('/payment-type/create', data);
};

export const filterPaymentTypeApi = (data: PaymentTypeModels, params: ParamsModel) => {
  return HTTP_ADMIN_SERVICE.post('/payment-type/filter', data, { params });
};
