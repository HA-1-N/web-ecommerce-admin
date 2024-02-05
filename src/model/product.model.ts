import { RcFile } from 'antd/es/upload';
import { BrandModels } from './brand.model';
import { CategoryModels } from './category.model';
import { ColorModels } from './color.model';
import { SizeModel } from './size.model';

export interface ProductModels {
  id?: number;
  name?: string;
  price?: number;
  description?: string;
  image?: string;
  category?: CategoryModels;
  brand?: BrandModels;
  quantity?: number;
  productQuantities: ProductQuantityModels[];
  productImages: ProductImageModels[];
  status?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ProductImageModels {
  id?: number;
  image?: string;
  url?: string;
  originFileObj?: RcFile;
}

export interface FilterProductModels {
  name?: string | null;
  status?: number | null;
  categoryId?: number | null;
  brandId?: number | null;
  sizeId?: number[] | null;
  colorId?: number[] | null;
  minPrice?: number | null;
  maxPrice?: number | null;
}

export interface CreateProductModels {
  name?: string;
  price?: any;
  description?: string;
  image?: string[] | any;
  categoryId?: any;
  brandId?: any;
  quantity?: any;
  status?: any;
}

export interface UpdateProductModels extends CreateProductModels {
  id?: number;
  productDeleteImageIds?: number[];
}

export interface ProductIdNameModels {
  id?: number;
  name?: string;
}

// Product Quantity
export interface CreateProductQuantityModels {
  id?: number;
  quantity?: number;
  productId?: number;
  sizeId?: number;
  colorId?: number;
  status?: number;
}

export interface ProductQuantityModels {
  id?: number;
  quantity: number;
  product?: ProductIdNameModels;
  size?: SizeModel;
  color?: ColorModels;
  status?: number;
  created_at?: string;
  updated_at?: string;
}

export interface FilterProductQuantityModels {
  productId?: number | null;
  sizeId?: number | null;
  colorId?: number | null;
  status?: number | null;
}
