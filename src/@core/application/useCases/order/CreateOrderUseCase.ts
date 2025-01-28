import { CreateOrderDto } from '@app/order/dtos';
import { ICreateOrderUseCase, Order, OrderStatus } from '@core/domain';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prismaOrm/prisma.service';

@Injectable()
export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ orderProducts }: CreateOrderDto): Promise<Order> {
    const productIds = orderProducts.map((p) => p.productId);

    const productData = await this.prismaService.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, stockQuantity: true, price: true, name: true },
    });

    for (const { productId, quantity } of orderProducts) {
      const product = productData.find((p) => p.id === productId);

      if (!product) {
        throw new NotFoundException(
          `Produto com ID ${productId} não encontrado.`,
        );
      }

      if (product.stockQuantity < quantity) {
        throw new BadRequestException(
          `Estoque insuficiente para o produto "${product.name}". Quantidade disponível: ${product.stockQuantity}.`,
        );
      }
    }

    const totalOrder = orderProducts.reduce(
      (total, { productId, quantity }) => {
        const product = productData.find((p) => p.id === productId)!;
        return total + product.price.toNumber() * quantity;
      },
      0,
    );

    const createdOrder = await this.prismaService.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          totalOrder,
          status: 'PENDENTE',
          products: {
            create: orderProducts.map(({ productId, quantity }) => ({
              productId,
              quantity,
            })),
          },
        },
      });

      for (const { productId, quantity } of orderProducts) {
        await tx.product.update({
          where: { id: productId },
          data: {
            stockQuantity: {
              decrement: quantity,
            },
          },
        });
      }

      return order;
    });

    return {
      ...createdOrder,
      totalOrder: createdOrder.totalOrder.toNumber(),
      status: createdOrder.status as OrderStatus,
    };
  }
}
