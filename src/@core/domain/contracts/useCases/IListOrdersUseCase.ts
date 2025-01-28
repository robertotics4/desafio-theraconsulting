import { Order } from '../../entities';

export interface IListOrdersUseCase {
  execute(): Promise<Order[]>;
}
