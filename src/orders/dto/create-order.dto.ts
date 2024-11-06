import { IsInt, IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo } from 'sequelize-typescript';
import { Car } from '../../car/models/car.model';

export class CreateOrderDto {
    @ApiProperty({ description: 'Car ID', example: 1 })
    @IsInt()
    @IsNotEmpty()
    car_id: number;
    @BelongsTo(() => Car)
    car: Car;

    @ApiProperty({ description: 'Client ID', example: 2 })
    @IsInt()
    @IsNotEmpty()
    client_id: number;

    @ApiProperty({ description: 'Shipping address for the order', example: '123 Main St, City, Country' })
    @IsString()
    @IsNotEmpty()
    shipping_address: string;

    @ApiProperty({ description: 'Whether the order is paid', example: false, required: false })
    @IsBoolean()
    is_paid?: boolean;

    @ApiProperty({ description: 'Status of the order', example: 'Pending' })
    @IsString()
    @IsNotEmpty()
    status: string;

    @ApiProperty({ description: 'Order date', example: '2024-11-01', required: false })
    order_date?: Date;
}
