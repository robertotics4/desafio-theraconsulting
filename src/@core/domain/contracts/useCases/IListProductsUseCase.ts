import { Product } from '../../entities';

export interface IListProductsUseCase {
  execute(): Promise<Product[]>;
}
