import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    example: 'Feruz Rustamov',
    description: 'Client full_name',
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: 'admin',
    description: 'Client unique email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'qwerty12345',
    description: 'Client password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'qwerty12345',
    description: 'Client confirm password',
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({
    example: '+998200032406',
    description: 'Client phone number',
  })
  @IsPhoneNumber('UZ')
  phone_number: string;
}
