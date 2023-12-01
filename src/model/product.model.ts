export interface ProductModels {
  id?: number;
  name?: string;
  price?: number;
  description?: string;
  image?: string;
  category?: string;
  quantity?: number;
  status?: boolean;
  created_at?: string;
  updated_at?: string;
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
