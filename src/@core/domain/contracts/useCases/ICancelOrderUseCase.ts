import { Order } from '../../entities';

export interface ICancelOrderUseCase {
  execute(id: string): Promise<Order>;
}
