import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInClientDto {
  @ApiProperty({
    example: 'client',
    description: 'Client unique email',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'qwerty12345',
    description: 'Client password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
