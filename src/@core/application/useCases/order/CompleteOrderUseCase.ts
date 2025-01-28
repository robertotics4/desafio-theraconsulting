import { ICompleteOrderUseCase, Order } from '@core/domain';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@prismaOrm/prisma.service';

@Injectable()
export class CompleteOrderUseCase implements ICompleteOrderUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string): Promise<Order> {
    const orderFound = await this.prismaService.order.findUnique({
      where: { id },
      include: { orderProducts: true },
    });

    if (!orderFound) {
      throw new NotFoundException(`Pedido ${id} não encontrado`);
    }

    if (orderFound.status !== 'PENDENTE') {
      throw new BadRequestException(
        `O pedido deve estar 'PENDENTE' para ser concluído. Status atual: '${orderFound.status}'`,
      );
    }

    const updatedOrder = await this.prismaService.$transaction(async (tx) => {
      for (const { productId, quantity } of orderFound.orderProducts) {
        await tx.product.update({
          where: { id: productId },
          data: {
            stockQuantity: {
              decrement: quantity,
            },
          },
        });
      }

      return await tx.order.update({
        where: { id },
        data: { status: 'CONCLUIDO' },
      });
    });

    return updatedOrder as any;
  }
}
