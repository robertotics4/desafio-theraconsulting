import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export abstract class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário', example: 'John Doe' })
  @IsString()
  fullName: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'johndoe@mail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do usuário', example: '12345678' })
  @IsString()
  password: string;
}
