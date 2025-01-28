import { IListProductsUseCase, Product, ProductMapper } from '@core/domain';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prismaOrm/prisma.service';

@Injectable()
export class ListProductsUseCase implements IListProductsUseCase {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productMapper: ProductMapper,
  ) {}

  async execute(): Promise<Product[]> {
    const products = await this.prismaService.product.findMany({});
    return products.map((p) => this.productMapper.mapPrismaToDomain(p));
  }
}
