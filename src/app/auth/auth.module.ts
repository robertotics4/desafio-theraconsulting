import { Module } from '@nestjs/common';
import { SignInUseCase } from '@core/application';
import { Encryptor, JWT, UserRepository } from '@core/domain';
import {
  BCryptEncryptor,
  JsonWebToken,
  PrismaUserRepository,
} from '@core/infra';
import { AuthController } from './auth.controller';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    SignInUseCase,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: Encryptor,
      useClass: BCryptEncryptor,
    },
    {
      provide: JWT,
      useClass: JsonWebToken,
    },
  ],
})
export class AuthModule {}
