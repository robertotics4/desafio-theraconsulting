import { Module } from '@nestjs/common';
import { SignInUseCase } from '@core/application';
import { Encryptor, JWT } from '@core/domain';
import { BCryptEncryptor, JsonWebToken } from '@core/infra';
import { AuthController } from './auth.controller';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    SignInUseCase,
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
