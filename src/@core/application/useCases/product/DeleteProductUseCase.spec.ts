import { Test, TestingModule } from '@nestjs/testing';
import { DeleteProductUseCase } from '@core/application';
import { IDeleteProductUseCase, Product, ProductCategory } from '@core/domain';
import { PrismaService } from '@prismaOrm/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker/.';

describe('DeleteProductUseCase', () => {
  let sut: IDeleteProductUseCase;
  let prisma: PrismaService;
  let prismaServiceStub;

  let fakeId: 'any_uuid';
  let fakeProduct: Product;

  beforeAll(() => {
    fakeProduct = {
      id: faker.string.uuid(),
      category: ProductCategory.OUTROS,
      price: faker.number.float({ min: 0, fractionDigits: 2 }),
      name: 'Product 1',
      stockQuantity: faker.number.int({ min: 0 }),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };

    prismaServiceStub = {
      product: {
        findUnique: jest.fn().mockResolvedValue(fakeProduct),
        delete: jest.fn().mockResolvedValue(fakeProduct),
      },
    };
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteProductUseCase,
        { provide: PrismaService, useValue: prismaServiceStub },
      ],
    }).compile();

    sut = app.get<IDeleteProductUseCase>(DeleteProductUseCase);
    prisma = app.get<PrismaService>(PrismaService);
  });

  it('should call product.findUnique with correct params', async () => {
    await sut.execute(fakeId);

    expect(prisma.product.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.product.findUnique).toHaveBeenCalledWith({
      where: { id: fakeId },
    });
  });

  it('should call product.delete with correct params', async () => {
    await sut.execute(fakeId);

    expect(prisma.product.delete).toHaveBeenCalledTimes(1);
    expect(prisma.product.delete).toHaveBeenCalledWith({
      where: { id: fakeId },
    });
  });

  it('should throw if product not exists', async () => {
    prismaServiceStub.product.findUnique.mockReturnValueOnce(null);

    const promise = sut.execute(fakeId);

    expect(promise).rejects.toBeInstanceOf(NotFoundException);
  });
});
