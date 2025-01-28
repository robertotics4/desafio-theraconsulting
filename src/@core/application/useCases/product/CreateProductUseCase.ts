import { CreateOrUpdateProductDto } from '@app/product/dtos';
import { ICreateProductUseCase, Product, ProductMapper } from '@core/domain';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prismaOrm/prisma.service';

@Injectable()
export class CreateProductUseCase implements ICreateProductUseCase {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productMapper: ProductMapper,
  ) {}

  async execute(dto: CreateOrUpdateProductDto): Promise<Product> {
    const product = await this.prismaService.product.create({ data: dto });

    return this.productMapper.mapPrismaToDomain(product);
  }
}
