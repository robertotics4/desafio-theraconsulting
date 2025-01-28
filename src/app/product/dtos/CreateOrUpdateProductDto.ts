import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ProductCategory } from '@core/domain';

export abstract class CreateOrUpdateProductDto {
  @ApiProperty({ description: 'Nome do produto', example: 'Camiseta' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Categoria do produto',
    example: 'ROUPAS',
    enum: ProductCategory,
  })
  @IsEnum(ProductCategory)
  category: ProductCategory;

  @ApiProperty({ description: 'Preço do produto', example: 79.99 })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @ApiPropertyOptional({
    description: 'Descrição do produto',
    example: 'Camiseta de algodão',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Quantidade em estoque do produto',
    example: 10,
  })
  @IsInt()
  @Min(0)
  stockQuantity: number;
}
