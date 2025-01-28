import { Order } from './Order';
import { Product } from './Product';

export class OrderProduct {
  id: string;
  quantity: number;
  productId: string;
  orderId: string;
  product?: Product;
  order?: Order;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Omit<OrderProduct, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, data);
  }
}
