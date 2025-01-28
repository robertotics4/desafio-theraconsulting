import { Injectable } from '@nestjs/common';
import { Order as PrismaOrder } from '@prisma/client';
import { Order, OrderStatus } from '../entities';

@Injectable()
export class OrderMapper {
  mapPrismaToDomain(prismaOrder: PrismaOrder): Order {
    return {
      ...prismaOrder,
      totalOrder: prismaOrder.totalOrder.toNumber(),
      status: prismaOrder.status as OrderStatus,
    };
  }
}
