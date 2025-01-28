import { Module } from '@nestjs/common';
import {
  CreateProductUseCase,
  DeleteProductUseCase,
  ListProductsUseCase,
  UpdateProductUseCase,
} from '@core/application';
import { ProductController } from './product.controller';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    ListProductsUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
})
export class ProductModule {}
