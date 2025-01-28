import { Module } from '@nestjs/common';
import { CreateProductUseCase } from '@core/application';
import { ProductController } from './product.controller';
import { ListProductsUseCase } from '@core/application/useCases/product/ListProductsUseCase';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [CreateProductUseCase, ListProductsUseCase],
})
export class ProductModule {}
