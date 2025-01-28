import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@app/auth/decorators/public.decorator';
import { CreateProductUseCase } from '@core/application';
import { CreateProductDto } from './dtos';
import { ListProductsUseCase } from '@core/application/useCases/product/ListProductsUseCase';

@Controller('api/products')
@ApiTags('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateProductDto) {
    return await this.createProductUseCase.execute(dto);
  }

  @Get()
  @Public()
  async list() {
    return await this.listProductsUseCase.execute();
  }
}
