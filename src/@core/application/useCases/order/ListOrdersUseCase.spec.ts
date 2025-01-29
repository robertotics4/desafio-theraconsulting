import { Test, TestingModule } from '@nestjs/testing';
import { ListOrdersUseCase } from '@core/application';
import {
  IListOrdersUseCase,
  Order,
  OrderMapper,
  OrderStatus,
  Product,
  ProductCategory,
} from '@core/domain';
import { PrismaService } from '@prismaOrm/prisma.service';
import { faker } from '@faker-js/faker/.';

describe('ListOrdersUseCase', () => {
  let sut: IListOrdersUseCase;
  let prisma: PrismaService;
  let prismaServiceStub;
  let orderMapperStub;

  let fakeOrders: Order[];

  beforeAll(() => {
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

    fakeOrders = fakeProducts.map((p) => {
      const orderId = faker.string.uuid();
      const order: Order = {
        id: orderId,
        status: OrderStatus.PENDENTE,
        totalOrder: 20,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };
      order.orderProducts = [
        {
          id: faker.string.uuid(),
          orderId,
          productId: p.id,
          quantity: 1,
          order,
          product: p,
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        },
      ];

      return order;
    });

    prismaServiceStub = {
      order: {
        findMany: jest.fn().mockResolvedValue(fakeOrders),
      },
    };

    orderMapperStub = {
      mapPrismaToDomain: jest.fn().mockReturnValue(fakeOrders),
    };
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ListOrdersUseCase,
        { provide: PrismaService, useValue: prismaServiceStub },
        { provide: OrderMapper, useValue: orderMapperStub },
      ],
    }).compile();

    sut = app.get<IListOrdersUseCase>(ListOrdersUseCase);
    prisma = app.get<PrismaService>(PrismaService);
  });

  it('should call order.findMany with correct params', async () => {
    await sut.execute();

    expect(prisma.order.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.order.findMany).toHaveBeenCalledWith({
      include: {
        orderProducts: {
          include: { product: true },
        },
      },
    });
  });

  it('should list orders', async () => {
    const result = await sut.execute();

    expect(result.length).toBe(fakeOrders.length);
  });
});
