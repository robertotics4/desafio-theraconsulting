import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dtos';
import { CreateOrderUseCase, ListOrdersUseCase } from '@core/application';

@Controller('api/orders')
@ApiTags('orders')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly listOrdersUseCase: ListOrdersUseCase,
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
}
