import { CreateOrderDto } from '@app/order/dtos';
import {
  ICreateOrderUseCase,
  Order,
  OrderProduct,
  OrderStatus,
  ProductCategory,
} from '@core/domain';
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
    return this.prismaService.$transaction(async (tx) => {
      try {
        const validatedProducts: OrderProduct[] = [];

        for await (const orderProduct of orderProducts) {
          const productFound = await tx.product.findUnique({
            where: { id: orderProduct.productId },
          });

          if (!productFound) {
            throw new NotFoundException(
              `O produto de id ${orderProduct.productId} não foi encontrado`,
            );
          }

          if (orderProduct.quantity > productFound.stockQuantity) {
            throw new BadRequestException(
              `O produto '${productFound.name}' não tem estoque suficiente para o seu pedido`,
            );
          }

          validatedProducts.push({
            ...orderProduct,
            product: {
              ...productFound,
              category: productFound.category as ProductCategory,
              price: productFound.price.toNumber(),
            },
          });

          await tx.product.update({
            where: { id: productFound.id },
            data: { stockQuantity: { decrement: orderProduct.quantity } },
          });
        }

        const totalOrder = this.calcTotal(validatedProducts);
        const order = await tx.order.create({
          data: {
            totalOrder,
            status: 'PENDENTE',
            products: {
              create: validatedProducts.map(({ productId, quantity }) => ({
                productId,
                quantity,
              })),
            },
          },
          include: { products: true },
        });

        return {
          ...order,
          totalOrder: order.totalOrder.toNumber(),
          status: order.status as OrderStatus,
        };
      } catch (error) {
        throw error;
      }
    });
  }

  private calcTotal(orderProducts: OrderProduct[]): number {
    return orderProducts.reduce(
      (total, orderProduct) =>
        total + orderProduct.product.price * orderProduct.quantity,
      0,
    );
  }
}
