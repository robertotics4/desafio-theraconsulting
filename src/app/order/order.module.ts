import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import {
  CompleteOrderUseCase,
  CreateOrderUseCase,
  ListOrdersUseCase,
} from '@core/application';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [CreateOrderUseCase, ListOrdersUseCase, CompleteOrderUseCase],
})
export class OrderModule {}
