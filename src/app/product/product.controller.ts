import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateProductUseCase,
  DeleteProductUseCase,
  ListProductsUseCase,
  UpdateProductUseCase,
} from '@core/application';
import { CreateOrUpdateProductDto } from './dtos';

@Controller('api/products')
@ApiTags('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateOrUpdateProductDto) {
    return await this.createProductUseCase.execute(dto);
  }

  @Get()
  async list() {
    return await this.listProductsUseCase.execute();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: CreateOrUpdateProductDto) {
    return await this.updateProductUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return await this.deleteProductUseCase.execute(id);
  }
}
