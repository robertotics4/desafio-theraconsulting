import { Module } from '@nestjs/common';
import { CreateProductUseCase } from '@core/application';
import { ProductController } from './product.controller';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [CreateProductUseCase],
})
export class ProductModule {}
