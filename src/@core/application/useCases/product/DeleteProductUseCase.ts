import { IDeleteProductUseCase } from '@core/domain';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prismaOrm/prisma.service';

@Injectable()
export class DeleteProductUseCase implements IDeleteProductUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string): Promise<void> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`O produto de id ${id} não foi encontrado`);
    }

    await this.prismaService.product.delete({ where: { id } });
  }
}
