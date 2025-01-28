import { ProductOrder } from './ProductOrder';

export enum OrderStatus {
  PENDING = 'PENDENTE',
  CONCLUDED = 'CONCLUÍDO',
  CANCELED = 'CANCELED',
}

export class Order {
  id: string;
  totalOrder: number;
  status: OrderStatus;
  products: ProductOrder[];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, data);
  }
}
