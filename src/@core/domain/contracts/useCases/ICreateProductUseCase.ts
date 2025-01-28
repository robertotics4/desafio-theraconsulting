import { Product } from '../../entities';
import { CreateProductDto } from '@app/product/dtos';

export interface ICreateProductUseCase {
  execute(dto: CreateProductDto): Promise<Product>;
}
