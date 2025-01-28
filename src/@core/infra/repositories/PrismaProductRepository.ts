import { Injectable } from '@nestjs/common';
import { Product as PrismaProduct } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from '@prismaOrm/prisma.service';
import { Product, ProductCategory, ProductRepository } from '@core/domain';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product> {
    const product = await this.prismaService.product.create({ data });

    return this.map(product);
  }

  async list(): Promise<Product[]> {
    const products = await this.prismaService.product.findMany({});

    return products.map((p) => this.map(p));
  }

  async updateById(id: string, data: Partial<Product>): Promise<Product> {
    const product = await this.prismaService.product.update({
      where: { id },
      data,
    });

    return this.map(product);
  }

  async deleteById(id: string): Promise<boolean> {
    await this.prismaService.product.delete({ where: { id } });

    return true;
  }

  private map(prismaProduct: PrismaProduct): Product {
    return {
      ...prismaProduct,
      price: (prismaProduct.price as Decimal).toNumber(),
      category: prismaProduct.category as ProductCategory,
    };
  }
}
