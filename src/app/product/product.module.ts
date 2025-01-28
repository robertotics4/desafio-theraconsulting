import { Module } from '@nestjs/common';
import {
  CreateProductUseCase,
  DeleteProductUseCase,
  ListProductsUseCase,
  UpdateProductUseCase,
} from '@core/application';
import { ProductController } from './product.controller';
import { ProductMapper } from '@core/domain';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    ListProductsUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    ProductMapper,
  ],
})
export class ProductModule {}
