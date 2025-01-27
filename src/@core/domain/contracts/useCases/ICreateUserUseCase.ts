import { CreateUserDto } from 'src/app/user/dtos';
import { User } from '../../entities';

export interface ICreateUserUseCase {
  execute(dto: CreateUserDto): Promise<User>;
}
