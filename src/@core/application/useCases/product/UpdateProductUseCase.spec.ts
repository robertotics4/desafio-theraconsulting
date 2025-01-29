import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrUpdateProductDto } from '@app/product/dtos';
import { UpdateProductUseCase } from '@core/application';
import {
  IUpdateProductUseCase,
  Product,
  ProductCategory,
  ProductMapper,
} from '@core/domain';
import { PrismaService } from '@prismaOrm/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('UpdateProductUseCase', () => {
  let sut: IUpdateProductUseCase;
  let prisma: PrismaService;
  let prismaServiceStub;
  let productMapperStub;

  let fakeId: 'any_uuid';
  let dto: CreateOrUpdateProductDto;
  let fakeProduct: Product;

  beforeAll(() => {
    dto = {
      name: 'any_name',
      category: ProductCategory.BEBIDAS,
      price: 10.99,
      stockQuantity: 5,
      description: 'updated_description',
    };

    fakeProduct = {
      ...dto,
      description: 'original_description',
      id: fakeId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedProduct: Product = {
      ...fakeProduct,
      description: 'updated_description',
      updatedAt: new Date(),
    };

    prismaServiceStub = {
      product: {
        findUnique: jest.fn().mockResolvedValue(fakeProduct),
        update: jest.fn().mockResolvedValue(updatedProduct),
      },
    };

    productMapperStub = {
      mapPrismaToDomain: jest.fn().mockReturnValue(updatedProduct),
    };
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProductUseCase,
        { provide: PrismaService, useValue: prismaServiceStub },
        { provide: ProductMapper, useValue: productMapperStub },
      ],
    }).compile();

    sut = app.get<IUpdateProductUseCase>(UpdateProductUseCase);
    prisma = app.get<PrismaService>(PrismaService);
  });

  it('should call product.findUnique with correct params', async () => {
    await sut.execute(fakeId, dto);

    expect(prisma.product.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.product.findUnique).toHaveBeenCalledWith({
      where: { id: fakeId },
    });
  });

  it('should call product.update with correct params', async () => {
    await sut.execute(fakeId, dto);

    expect(prisma.product.update).toHaveBeenCalledTimes(1);
    expect(prisma.product.update).toHaveBeenCalledWith({
      where: { id: fakeId },
      data: dto,
    });
  });

  it('should update a product', async () => {
    const result = await sut.execute(fakeId, dto);

    expect(result.description).toBe('updated_description');
    expect(result.updatedAt).not.toEqual(fakeProduct);
  });

  it('should throw if product not exists', async () => {
    prismaServiceStub.product.findUnique.mockReturnValueOnce(null);

    const promise = sut.execute(fakeId, dto);

    expect(promise).rejects.toBeInstanceOf(NotFoundException);
  });
});
