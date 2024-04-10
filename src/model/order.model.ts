import { Color } from 'antd/es/color-picker';
import { OrderStatusModels } from './order-status.model';
import { ProductModels } from './product.model';
import { ShippingMethodModels } from './shipping-method.model';
import { SizeModel } from './size.model';
import { UserAddressModel, UserModel, UserPaymentModel } from './user.model';
import { ColorModels } from './color.model';

export interface OrderModels {
  id?: number;
  userId?: number;
  name?: string;
  address?: string;
  shippingAddress?: string;
  prefix?: string;
  phone?: string;
  city?: string;
  country?: string;
  paymentMethod?: string;
  shippingMethod?: string;
  status?: string;
  total?: number;
  createdAt?: string;
  updatedAt?: string;
  orderDate?: string | null;
  // orderItems: OrderItems[];
}

export interface OrderProductModel {
  id?: number;
  product?: ProductModels;
  quantity?: number;
  totalPrice?: number;
  size?: SizeModel;
  color?: ColorModels;
}

export interface OrderDetailModels {
  id?: number;
  user?: UserModel;
  orderStatus?: OrderStatusModels;
  shippingMethod?: ShippingMethodModels;
  userPayment?: UserPaymentModel;
  userAddress?: UserAddressModel;
  orderDate?: string;
  orderTotal?: number;
  orderProducts?: OrderProductModel[];
}
