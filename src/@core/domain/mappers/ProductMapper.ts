import { Injectable } from '@nestjs/common';
import { Product as PrismaProduct } from '@prisma/client';
import { Product, ProductCategory } from '../entities';

@Injectable()
export class ProductMapper {
  mapPrismaToDomain(prismaProduct: PrismaProduct): Product {
    return {
      ...prismaProduct,
      category: prismaProduct.category as ProductCategory,
      price: prismaProduct.price.toNumber(),
    };
  }
}
