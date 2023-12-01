import HTTP_ADMIN_SERVICE from '@/configs/axios.config';
import { ParamsModel } from '@/model/page.model';
import { FilterProductModels } from '@/model/product.model';

export const filterProductApi = (body: FilterProductModels, params: ParamsModel) => {
  return HTTP_ADMIN_SERVICE.post('/product/filter', body, { params });
};
