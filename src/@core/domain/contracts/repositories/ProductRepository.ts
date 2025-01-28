import { Product } from '@core/domain';

export abstract class ProductRepository {
  abstract create(
    data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product>;
  abstract list(): Promise<Product[]>;
  abstract updateById(id: string, data: Partial<Product>): Promise<Product>;
  abstract deleteById(id: string): Promise<boolean>;
}
