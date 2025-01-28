import { Injectable } from '@nestjs/common';
import { Order as PrismaOrder } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from '@prismaOrm/prisma.service';
import { Order, OrderRepository, OrderStatus } from '@core/domain';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order> {
    const order = await this.prismaService.order.create({ data });
    return this.map(order);
  }

  async list(): Promise<Order[]> {
    const orders = await this.prismaService.order.findMany({
      include: { products: { include: { product: true } } },
    });

    return orders.map((o) => this.map(o));
  }

  private map(prismaOrder: PrismaOrder): Order {
    return {
      ...prismaOrder,
      totalOrder: (prismaOrder.totalOrder as Decimal).toNumber(),
      status: OrderStatus[prismaOrder.status as keyof typeof OrderStatus],
    };
  }
}
