import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrUpdateProductDto } from '@app/product/dtos';
import { CreateProductUseCase } from '@core/application';
import {
  ICreateProductUseCase,
  ProductCategory,
  ProductMapper,
} from '@core/domain';
import { PrismaService } from '@prismaOrm/prisma.service';

describe('CreateProductUseCase', () => {
  let sut: ICreateProductUseCase;
  let prisma: PrismaService;
  let prismaServiceStub;
  let productMapperStub;

  let dto: CreateOrUpdateProductDto;

  beforeAll(() => {
    dto = {
      name: 'any_name',
      category: ProductCategory.BEBIDAS,
      price: 10.99,
      stockQuantity: 5,
      description: 'any_description',
    };

    prismaServiceStub = {
      product: {
        create: jest.fn().mockResolvedValue({ ...dto, id: 'any_id' }),
      },
    };

    productMapperStub = {
      mapPrismaToDomain: jest.fn().mockReturnValue({ ...dto, id: 'any_id' }),
    };
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductUseCase,
        { provide: PrismaService, useValue: prismaServiceStub },
        { provide: ProductMapper, useValue: productMapperStub },
      ],
    }).compile();

    sut = app.get<ICreateProductUseCase>(CreateProductUseCase);
    prisma = app.get<PrismaService>(PrismaService);
  });

  it('should call product.create with correct params', async () => {
    await sut.execute(dto);

    expect(prisma.product.create).toHaveBeenCalledTimes(1);
    expect(prisma.product.create).toHaveBeenCalledWith({ data: dto });
  });

  it('should create a product', async () => {
    const result = await sut.execute(dto);

    expect(result).toHaveProperty('id');
    expect(result.id).not.toBe(null);
  });
});
