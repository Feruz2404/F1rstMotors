import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({ description: 'Brand nomi', example: 'Tesla' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Brand haqida maʼlumot', example: 'Electric car manufacturer' })
  @IsOptional()
  @IsString()
  information?: string;

  @ApiPropertyOptional({ description: 'Brand veb-sayti', example: 'https://www.tesla.com' })
  @IsOptional()
  @IsString()
  web_site?: string;

  @ApiProperty({ description: 'Brand faolmi yoki yo\'q', example: true })
  @IsBoolean()
  is_active: boolean;
}
