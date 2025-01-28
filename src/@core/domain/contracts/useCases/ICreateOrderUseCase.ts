import { CreateOrderDto } from '@app/order/dtos';
import { Order } from '../../entities';

export interface ICreateOrderUseCase {
  execute(dto: CreateOrderDto): Promise<Order>;
}
