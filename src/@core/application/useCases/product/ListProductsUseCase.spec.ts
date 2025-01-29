import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { ListProductsUseCase } from '@core/application';
import {
  IListProductsUseCase,
  Product,
  ProductCategory,
  ProductMapper,
} from '@core/domain';
import { PrismaService } from '@prismaOrm/prisma.service';

describe('ListProductsUseCase', () => {
  let sut: IListProductsUseCase;
  let prisma: PrismaService;
  let prismaServiceStub;
  let productMapperStub;

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

  beforeAll(() => {
    prismaServiceStub = {
      product: {
        findMany: jest.fn().mockResolvedValue(fakeProducts),
      },
    };

    productMapperStub = {
      mapPrismaToDomain: jest.fn().mockReturnValue(fakeProducts),
    };
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ListProductsUseCase,
        { provide: PrismaService, useValue: prismaServiceStub },
        { provide: ProductMapper, useValue: productMapperStub },
      ],
    }).compile();

    sut = app.get<IListProductsUseCase>(ListProductsUseCase);
    prisma = app.get<PrismaService>(PrismaService);
  });

  it('should call product.findMany with correct params', async () => {
    await sut.execute();

    expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.product.findMany).toHaveBeenCalledWith({});
  });

  it('should list products', async () => {
    const result = await sut.execute();

    expect(result.length).toBe(fakeProducts.length);
  });
});
