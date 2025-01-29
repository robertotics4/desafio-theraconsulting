import { Test, TestingModule } from '@nestjs/testing';
import { CompleteOrderUseCase } from '@core/application';
import {
  ICompleteOrderUseCase,
  Order,
  OrderMapper,
  OrderStatus,
  Product,
  ProductCategory,
} from '@core/domain';
import { PrismaService } from '@prismaOrm/prisma.service';
import { faker } from '@faker-js/faker/.';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('CompleteOrderUseCase', () => {
  let sut: ICompleteOrderUseCase;
  let prisma: PrismaService;
  let prismaServiceStub;
  let orderMapperStub;

  let fakeId: string;
  let fakeOrder: Order;

  beforeAll(() => {
    fakeId = faker.string.uuid();

    const fakeProducts: Product[] = [
      {
        id: faker.string.uuid(),
        category: ProductCategory.OUTROS,
        price: faker.number.float({ min: 0, fractionDigits: 2 }),
        name: 'Product 1',
        stockQuantity: faker.number.int({ min: 0 }),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
      {
        id: faker.string.uuid(),
        category: ProductCategory.OUTROS,
        price: faker.number.float({ min: 0, fractionDigits: 2 }),
        name: 'Product 2',
        stockQuantity: faker.number.int({ min: 0 }),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    ];

    fakeOrder = {
      id: faker.string.uuid(),
      status: OrderStatus.PENDENTE,
      totalOrder: 30,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };
    fakeOrder.orderProducts = fakeProducts.map((p) => ({
      id: faker.string.uuid(),
      orderId: fakeOrder.id,
      productId: p.id,
      quantity: 1,
      order: fakeOrder,
      product: p,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }));

    const completedOrder: Order = {
      ...fakeOrder,
      status: OrderStatus.CONCLUIDO,
    };

    prismaServiceStub = {
      order: {
        findUnique: jest.fn().mockResolvedValue(fakeOrder),
        update: jest.fn().mockResolvedValue(completedOrder),
      },
      product: {
        update: jest.fn().mockResolvedValue({
          ...fakeProducts[0],
          stockQuantity:
            fakeProducts[0].stockQuantity - fakeOrder.orderProducts[0].quantity,
        }),
      },
      $transaction: jest.fn(async (callback) => callback(prismaServiceStub)),
    };

    orderMapperStub = {
      mapPrismaToDomain: jest.fn().mockReturnValue(completedOrder),
    };
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CompleteOrderUseCase,
        { provide: PrismaService, useValue: prismaServiceStub },
        { provide: OrderMapper, useValue: orderMapperStub },
      ],
    }).compile();

    sut = app.get<ICompleteOrderUseCase>(CompleteOrderUseCase);
    prisma = app.get<PrismaService>(PrismaService);
  });

  it('should call order.findUnique with correct params', async () => {
    await sut.execute(fakeId);

    expect(prisma.order.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.order.findUnique).toHaveBeenCalledWith({
      where: { id: fakeId },
      include: { orderProducts: true },
    });
  });

  it('should call product.update with correct params', async () => {
    await sut.execute(fakeId);

    for (const { productId, quantity } of fakeOrder.orderProducts) {
      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: productId },
        data: {
          stockQuantity: {
            decrement: quantity,
          },
        },
      });
    }

    expect(prisma.product.update).toHaveBeenCalledTimes(
      fakeOrder.orderProducts.length,
    );
  });

  it('should call order.update with correct params', async () => {
    await sut.execute(fakeId);

    expect(prisma.order.update).toHaveBeenCalledTimes(1);
    expect(prisma.order.update).toHaveBeenCalledWith({
      where: { id: fakeId },
      data: { status: 'CONCLUIDO' },
    });
  });

  it('should complete a order', async () => {
    const result = await sut.execute(fakeId);

    expect(result.status).toBe(OrderStatus.CONCLUIDO);
  });

  it('should throw if order not exists', async () => {
    prismaServiceStub.order.findUnique.mockReturnValueOnce(null);

    const promise = sut.execute(fakeId);

    expect(promise).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should throw if order not is PENDENTE', async () => {
    const incorrectOrder: Order = {
      ...fakeOrder,
      status: OrderStatus.CANCELADO,
    };
    prismaServiceStub.order.findUnique.mockReturnValueOnce(incorrectOrder);

    const promise = sut.execute(fakeId);

    expect(promise).rejects.toBeInstanceOf(BadRequestException);
  });
});
