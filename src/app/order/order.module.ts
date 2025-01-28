import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import {
  CancelOrderUseCase,
  CompleteOrderUseCase,
  CreateOrderUseCase,
  ListOrdersUseCase,
} from '@core/application';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [
    CreateOrderUseCase,
    ListOrdersUseCase,
    CompleteOrderUseCase,
    CancelOrderUseCase,
  ],
})
export class OrderModule {}
