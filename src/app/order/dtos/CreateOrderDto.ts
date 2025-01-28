import { OrderProduct } from '@core/domain';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

export abstract class CreateOrderDto {
  @ApiProperty({
    description: 'Lista de produtos do pedido',
    type: [OrderProduct],
    example: [
      { productId: '123', quantity: 2 },
      { productId: '456', quantity: 1 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProduct)
  orderProducts: OrderProduct[];
}
