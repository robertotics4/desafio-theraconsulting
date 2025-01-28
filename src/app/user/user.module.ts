import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from '../../@core/application/useCases/user/CreateUserUseCase';
import { Encryptor } from '@core/domain';
import { BCryptEncryptor } from '@core/infra';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    {
      provide: Encryptor,
      useClass: BCryptEncryptor,
    },
  ],
})
export class UserModule {}
