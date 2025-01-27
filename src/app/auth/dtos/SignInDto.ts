import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export abstract class SignInDto {
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'johndoe@mail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do usuário', example: '$I7REmr6%#ZQ@q}*' })
  @IsString()
  password: string;
}
