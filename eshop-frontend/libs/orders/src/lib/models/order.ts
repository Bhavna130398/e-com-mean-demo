import { orderItems } from "./orderItem";

export class Order {
  id?: string;
  orderItems?: orderItems;
  shippingAddress1?: string
  shippingAddress2?: string
  city?: string;
  zip?: string;
  country?: string;
  phone?: string
  status?: string;
  totalprice?: string;
  user?: string;
  dataOrdered?: string
}