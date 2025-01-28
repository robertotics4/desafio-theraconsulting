import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { CreateOrderUseCase } from '@core/application';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [CreateOrderUseCase],
})
export class OrderModule {}
