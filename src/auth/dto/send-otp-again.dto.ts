import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SendOtpAgainDto {
  @ApiProperty({
    example: 'client@gmail.com',
    description: 'client email',
  })
  @IsEmail()
  email: string;
}
