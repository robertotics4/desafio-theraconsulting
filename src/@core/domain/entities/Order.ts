export enum OrderStatus {
  PENDENTE = 'PENDENTE',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO',
}

export class Order {
  id: string;
  totalOrder: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;

  // products: OrderProduct[];

  constructor(data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, data);
  }
}
