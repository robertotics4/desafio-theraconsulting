import { CreateOrderDto } from '@app/order/dtos';
import { ICreateOrderUseCase, Order, OrderMapper } from '@core/domain';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prismaOrm/prisma.service';

@Injectable()
export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly orderMapper: OrderMapper,
  ) {}

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

    const createdOrder = await this.prismaService.order.create({
      data: {
        totalOrder,
        status: 'PENDENTE',
        orderProducts: {
          create: orderProducts.map(({ productId, quantity }) => ({
            productId,
            quantity,
          })),
        },
      },
    });

    return this.orderMapper.mapPrismaToDomain(createdOrder);
  }
}
