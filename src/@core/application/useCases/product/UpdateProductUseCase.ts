import { CreateOrUpdateProductDto } from '@app/product/dtos';
import { IUpdateProductUseCase, Product, ProductCategory } from '@core/domain';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prismaOrm/prisma.service';

@Injectable()
export class UpdateProductUseCase implements IUpdateProductUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string, dto: CreateOrUpdateProductDto): Promise<Product> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`O produto de id ${id} não foi encontrado`);
    }

    const updatedProduct = await this.prismaService.product.update({
      where: { id },
      data: dto,
    });

    return {
      ...updatedProduct,
      category: updatedProduct.category as ProductCategory,
      price: updatedProduct.price.toNumber(),
    };
  }
}
