import { OrderProduct } from '@core/domain';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export abstract class CreateOrderDto {
  @ApiProperty({
    description: 'Lista de produtos do pedido',
    example: [
      { productId: '123', quantity: 2 },
      { productId: '456', quantity: 1 },
    ],
  })
  @IsArray()
  orderProducts: OrderProduct[];
}
