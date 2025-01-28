import { CreateProductDto } from '@app/product/dtos';
import { Product, ProductCategory } from '@core/domain';
import { Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from '@prismaOrm/prisma.service';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(dto: CreateProductDto): Promise<Product> {
    const product = await this.prismaService.product.create({ data: dto });

    return {
      ...product,
      category: product.category as ProductCategory,
      price: (product.price as Decimal).toNumber(),
    };
  }
}
