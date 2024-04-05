import { ProductModels } from './product.model';

export interface HotCategoryModels {
  id?: number | null;
  name?: string | null;
}

export interface HotCategoryProductModels extends HotCategoryModels {
  products: ProductModels;
}
