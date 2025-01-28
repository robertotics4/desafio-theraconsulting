import { Order } from './Order';
import { Product } from './Product';

export class ProductOrder {
  id: string;
  quantity: number;
  productId: string;
  orderId: string;
  product: Product;
  order: Order;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Omit<ProductOrder, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, data);
  }
}
