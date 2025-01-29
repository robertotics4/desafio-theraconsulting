import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderUseCase } from '@core/application';
import {
  ICreateOrderUseCase,
  Order,
  OrderMapper,
  OrderStatus,
  ProductCategory,
} from '@core/domain';
import { PrismaService } from '@prismaOrm/prisma.service';
import { CreateOrderDto } from '@app/order/dtos';
import { faker } from '@faker-js/faker/.';
import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('CreateOrderUseCase', () => {
  let sut: ICreateOrderUseCase;
  let prisma: PrismaService;
  let prismaServiceStub;
  let orderMapperStub;

  let dto: CreateOrderDto;
  let fakeProducts: Product[];
  let fakeOrder: Order;

  beforeAll(() => {
    dto = {
      orderProducts: [
        {
          productId: faker.string.uuid(),
          quantity: 1,
        },
        {
          productId: faker.string.uuid(),
          quantity: 2,
        },
      ],
    } as CreateOrderDto;

    fakeProducts = dto.orderProducts.map((op) => ({
      id: op.productId,
      category: ProductCategory.OUTROS,
      price: new Decimal(10),
      name: `Product ${op.productId}`,
      stockQuantity: 10,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      description: faker.lorem.lines(1),
    }));

    fakeOrder = {
      id: faker.string.uuid(),
      status: OrderStatus.PENDENTE,
      totalOrder: 30,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };

    prismaServiceStub = {
      product: {
        findMany: jest.fn().mockResolvedValue(fakeProducts),
      },
      order: {
        create: jest.fn().mockResolvedValue(fakeOrder),
      },
    };

    orderMapperStub = {
      mapPrismaToDomain: jest.fn().mockReturnValue(fakeOrder),
    };
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOrderUseCase,
        { provide: PrismaService, useValue: prismaServiceStub },
        { provide: OrderMapper, useValue: orderMapperStub },
      ],
    }).compile();

    sut = app.get<ICreateOrderUseCase>(CreateOrderUseCase);
    prisma = app.get<PrismaService>(PrismaService);
  });

  it('should call product.findMany with correct params', async () => {
    await sut.execute(dto);

    expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where: { id: { in: fakeProducts.map((p) => p.id) } },
      select: { id: true, stockQuantity: true, price: true, name: true },
    });
  });

  it('should call order.create with correct params', async () => {
    await sut.execute(dto);

    expect(prisma.order.create).toHaveBeenCalledTimes(1);
    expect(prisma.order.create).toHaveBeenCalledWith({
      data: {
        totalOrder: fakeOrder.totalOrder,
        status: 'PENDENTE',
        orderProducts: {
          create: dto.orderProducts.map(({ productId, quantity }) => ({
            productId,
            quantity,
          })),
        },
      },
    });
  });

  it('should create a order', async () => {
    const totalOrder = dto.orderProducts.reduce(
      (total, { productId, quantity }) => {
        const product = fakeProducts.find((p) => p.id === productId)!;
        return total + product.price.toNumber() * quantity;
      },
      0,
    );

    const result = await sut.execute(dto);

    expect(result).toHaveProperty('id');
    expect(result.id).not.toBe(null);
    expect(result.status).toBe('PENDENTE');
    expect(result.totalOrder).toBe(totalOrder);
  });

  it('should throw if products not exists', async () => {
    prismaServiceStub.product.findMany.mockReturnValueOnce([]);

    const promise = sut.execute(dto);

    expect(promise).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should throw if stock is insufficient', async () => {
    const dtoWithProductOutOfStock = {
      orderProducts: [
        { productId: dto.orderProducts[0].productId, quantity: 20 },
      ],
    } as CreateOrderDto;

    const promise = sut.execute(dtoWithProductOutOfStock);

    expect(promise).rejects.toBeInstanceOf(BadRequestException);
  });
});
