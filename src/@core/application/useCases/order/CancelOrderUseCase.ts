import { ICancelOrderUseCase, Order } from '@core/domain';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@prismaOrm/prisma.service';

@Injectable()
export class CancelOrderUseCase implements ICancelOrderUseCase {
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
        `O pedido deve estar 'PENDENTE' para ser cancelado. Status atual: '${orderFound.status}'`,
      );
    }

    return (await this.prismaService.order.update({
      where: { id },
      data: { status: 'CANCELADO' },
    })) as any;
  }
}
