import { IListProductsUseCase, Product, ProductCategory } from '@core/domain';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prismaOrm/prisma.service';

@Injectable()
export class ListProductsUseCase implements IListProductsUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(): Promise<Product[]> {
    const products = await this.prismaService.product.findMany({});

    return products.map((p) => ({
      ...p,
      category: p.category as ProductCategory,
      price: p.price.toNumber(),
    }));
  }
}
