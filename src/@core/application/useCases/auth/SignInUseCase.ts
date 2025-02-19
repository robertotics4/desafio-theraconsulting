import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { Encryptor, JWT, ISignInUseCase, SignInData } from '@core/domain';
import { SignInDto } from '@app/auth/dtos';
import { PrismaService } from '@prismaOrm/prisma.service';

@Injectable()
export class SignInUseCase implements ISignInUseCase {
  private readonly AUTHENTICATION_ERROR_MESSAGE = 'Usuário ou senha inválidos';

  constructor(
    private readonly prismaService: PrismaService,
    private readonly encryptor: Encryptor,
    private readonly jwt: JWT,
  ) {}

  async execute(dto: SignInDto): Promise<SignInData> {
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException(this.AUTHENTICATION_ERROR_MESSAGE);
    }

    const passwordMatch = await this.encryptor.compare(
      dto.password,
      user.passwordHash,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException(this.AUTHENTICATION_ERROR_MESSAGE);
    }

    const tokenExpirationInSeconds = this.jwt.getTokenExpirationInSeconds();
    const token = this.jwt.sign({}, process.env.JWT_HASH_MD5 as string, {
      subject: user.id.toString(),
      expiresIn: tokenExpirationInSeconds,
    });

    return {
      user: { id: user.id, fullName: user.fullName },
      token,
      tokenExpirationInSeconds,
    };
  }
}
