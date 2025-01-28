import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import {
  CancelOrderUseCase,
  CompleteOrderUseCase,
  CreateOrderUseCase,
  ListOrdersUseCase,
} from '@core/application';
import { OrderMapper } from '@core/domain';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [
    CreateOrderUseCase,
    ListOrdersUseCase,
    CompleteOrderUseCase,
    CancelOrderUseCase,
    OrderMapper,
  ],
})
export class OrderModule {}
