import { User } from '@eshop-frontend/users';
import { OrderItems } from './orderItem';

export class Order {
  id?: string;
  orderItems?: OrderItems[];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: number;
  totalprice?: string;
  user?: any;
  dateOrdered?: string;
}
