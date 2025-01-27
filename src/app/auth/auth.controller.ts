import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignInUseCase } from '@core/application';
import { SignInDto } from './dtos';
import { Public } from './decorators/public.decorator';

@Controller('api/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post('sign-in')
  @Public()
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() dto: SignInDto) {
    return await this.signInUseCase.execute(dto);
  }
}
