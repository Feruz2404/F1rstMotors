import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
    @ApiProperty({ description: 'ID of the car added to the cart', example: 1 })
    @IsInt()
    @IsNotEmpty()
    car_id: number;

    @ApiProperty({ description: 'ID of the client adding the car to the cart', example: 1 })
    @IsInt()
    @IsNotEmpty()
    client_id: number;

    @ApiProperty({ description: 'Quantity of the car added', example: 1 })
    @IsInt()
    @Min(1)
    quantity: number;
}
