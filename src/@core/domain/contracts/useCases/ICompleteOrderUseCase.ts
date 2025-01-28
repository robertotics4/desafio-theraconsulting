import { Order } from '../../entities';

export interface ICompleteOrderUseCase {
  execute(id: string): Promise<Order>;
}
