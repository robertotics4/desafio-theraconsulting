import { IListOrdersUseCase, Order, OrderMapper } from '@core/domain';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prismaOrm/prisma.service';

@Injectable()
export class ListOrdersUseCase implements IListOrdersUseCase {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly orderMapper: OrderMapper,
  ) {}

  async execute(): Promise<Order[]> {
    const orders = await this.prismaService.order.findMany({
      include: {
        orderProducts: {
          include: { product: true },
        },
      },
    });

    return orders.map((o) => this.orderMapper.mapPrismaToDomain(o));
  }
}
