import { OrderProduct } from './OrderProduct';

export enum OrderStatus {
  PENDENTE = 'PENDENTE',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO',
}

export class Order {
  id: string;
  totalOrder: number;
  status: OrderStatus;
  orderProducts?: OrderProduct[];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, data);
  }
}
