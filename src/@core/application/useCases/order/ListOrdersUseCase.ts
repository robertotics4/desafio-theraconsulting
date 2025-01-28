import { IListOrdersUseCase, Order, OrderStatus } from '@core/domain';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prismaOrm/prisma.service';

@Injectable()
export class ListOrdersUseCase implements IListOrdersUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(): Promise<Order[]> {
    const orders = await this.prismaService.order.findMany({
      include: {
        orderProducts: {
          include: { product: true },
        },
      },
    });

    return orders.map((o) => ({
      ...o,
      totalOrder: o.totalOrder.toNumber(),
      status: o.status as OrderStatus,
    })) as any;
  }
}
