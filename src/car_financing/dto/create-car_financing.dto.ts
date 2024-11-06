import { IsInt, IsString, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarFinancingDto {
  @ApiProperty({ description: 'ID of the client', example: 1 })
  @IsInt()
  @IsNotEmpty()
  client_id: number;

  @ApiProperty({ description: 'ID of the car', example: 1 })
  @IsInt()
  @IsNotEmpty()
  car_id: number;

  @ApiProperty({ description: 'Type of financing', example: 'lease' })
  @IsString()
  @IsNotEmpty()
  financing_type: string;

  @ApiProperty({ description: 'Financing amount', example: 20000 })
  @IsPositive()
  amount: number;

  @ApiProperty({ description: 'Interest rate', example: 5.5 })
  @IsPositive()
  interest_rate: number;

  @ApiProperty({ description: 'Financing term in months', example: 36 })
  @IsInt()
  term_month: number;
}
