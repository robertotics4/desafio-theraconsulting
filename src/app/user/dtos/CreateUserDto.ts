import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsString } from 'class-validator';

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

  @ApiPropertyOptional({
    description: 'URL do avatar do usuário',
    example: 'https://innostudio.de/fileuploader/images/default-avatar.png',
  })
  @IsString()
  avatarUrl?: string;

  @ApiProperty({ description: 'Senha do usuário', example: '12345678' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Telefone do usuário', example: '5598988888888' })
  @IsMobilePhone()
  phone: string;
}
