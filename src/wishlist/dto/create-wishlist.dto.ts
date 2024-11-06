import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWishlistDto {
    @ApiProperty({ description: 'Car ID', example: 1 })
    @IsInt()
    @IsNotEmpty()
    car_id: number;

    @ApiProperty({ description: 'Client ID', example: 2 })
    @IsInt()
    @IsNotEmpty()
    client_id: number;

    @ApiProperty({ description: 'Date when the car was added to wishlist', example: '2024-11-01', required: false })
    added_date?: Date;
}
