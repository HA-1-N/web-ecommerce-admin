import HTTP_ADMIN_SERVICE from '@/configs/axios.config';

export const getTotalQuantityOrderProductApi = () => {
  return HTTP_ADMIN_SERVICE.get('/order-product/total-quantity');
};
