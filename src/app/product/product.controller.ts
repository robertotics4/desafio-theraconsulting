import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@app/auth/decorators/public.decorator';
import { CreateProductUseCase } from '@core/application';
import { CreateProductDto } from './dtos';

@Controller('api/products')
@ApiTags('products')
export class ProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateProductDto) {
    return await this.createProductUseCase.execute(dto);
  }
}
