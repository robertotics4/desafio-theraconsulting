import { CreateUserDto } from '@app/user/dtos';
import { Encryptor, ICreateUserUseCase, User } from '@core/domain';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prismaOrm/prisma.service';

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  private readonly ENCRYPT_SALTS = 10;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly encryptor: Encryptor,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const userAlreadyExists = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });

    if (userAlreadyExists) {
      throw new BadRequestException('E-mail já cadastrado');
    }

    const encryptedPassword = await this.encryptor.hash(
      dto.password,
      this.ENCRYPT_SALTS,
    );

    delete dto.password;

    const createdUser = await this.prismaService.user.create({
      data: {
        ...dto,
        passwordHash: encryptedPassword,
      },
    });

    delete createdUser.passwordHash;

    return createdUser;
  }
}
