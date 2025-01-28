import { Product } from '../../entities';
import { CreateOrUpdateProductDto } from '@app/product/dtos';

export interface ICreateProductUseCase {
  execute(dto: CreateOrUpdateProductDto): Promise<Product>;
}
