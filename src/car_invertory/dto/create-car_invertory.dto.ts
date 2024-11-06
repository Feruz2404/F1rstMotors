import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCarInventoryDto {
    @ApiProperty({
        description: 'ID of the car',
        example: 1,
    })
    @IsNotEmpty()
    @IsNumber()
    car_id: number;

    @ApiProperty({
        description: 'Quantity of the car in inventory',
        example: 10,
    })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty({
        description: 'Status of the car inventory item',
        example: 'available',
    })
    @IsNotEmpty()
    @IsString()
    status: string;
}
