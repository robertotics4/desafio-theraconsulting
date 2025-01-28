import { CreateOrUpdateProductDto } from '@app/product/dtos';
import { Product } from '../../entities';

export interface IUpdateProductUseCase {
  execute(id: string, dto: CreateOrUpdateProductDto): Promise<Product>;
}
