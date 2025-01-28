import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { CreateOrderUseCase, ListOrdersUseCase } from '@core/application';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [CreateOrderUseCase, ListOrdersUseCase],
})
export class OrderModule {}
