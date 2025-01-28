import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dtos';
import {
  CancelOrderUseCase,
  CompleteOrderUseCase,
  CreateOrderUseCase,
  ListOrdersUseCase,
} from '@core/application';

@Controller('api/orders')
@ApiTags('orders')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly listOrdersUseCase: ListOrdersUseCase,
    private readonly completeOrderUseCase: CompleteOrderUseCase,
    private readonly cancelOrderUseCase: CancelOrderUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateOrderDto) {
    return await this.createOrderUseCase.execute(dto);
  }

  @Get()
  async list() {
    return await this.listOrdersUseCase.execute();
  }

  @Patch('/conclude/:id')
  async complete(@Param('id') id: string) {
    return await this.completeOrderUseCase.execute(id);
  }

  @Patch('/cancel/:id')
  async cancel(@Param('id') id: string) {
    return await this.cancelOrderUseCase.execute(id);
  }
}
