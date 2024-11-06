import { IsInt, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderStatusDto {
    @ApiProperty({ description: 'status', example: "shipping" })
    @IsString()
    @IsNotEmpty()
    status: string;
}