import { Order } from '@core/domain';

export abstract class OrderRepository {
  abstract create(
    data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order>;
  abstract list(): Promise<Order[]>;
}
