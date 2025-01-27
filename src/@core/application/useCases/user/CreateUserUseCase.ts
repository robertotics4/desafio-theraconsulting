import { CreateUserDto } from '@app/user/dtos';
import {
  Encryptor,
  ICreateUserUseCase,
  User,
  UserRepository,
} from '@core/domain';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  private readonly ENCRYPT_SALTS = 10;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryptor: Encryptor,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const userAlreadyExists = await this.userRepository.findOne({
      email: dto.email,
    });

    if (userAlreadyExists) {
      throw new BadRequestException('E-mail já cadastrado');
    }

    const encryptedPassword = await this.encryptor.hash(
      dto.password,
      this.ENCRYPT_SALTS,
    );

    delete dto.password;

    const createdUser = await this.userRepository.create({
      ...dto,
      passwordHash: encryptedPassword,
    });

    delete createdUser.passwordHash;

    return createdUser;
  }
}
