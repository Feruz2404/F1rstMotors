import { IsInt, IsString, IsNotEmpty, IsBoolean, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliveryDto {
    @ApiProperty({ description: 'ID of the employee handling the delivery', example: 1 })
    @IsInt()
    @IsNotEmpty()
    employee_id: number;

    @ApiProperty({ description: 'ID of the order associated with this delivery', example: 101 })
    @IsInt()
    @IsNotEmpty()
    order_id: number;

    @ApiProperty({ description: 'Indicates if the order has been delivered', example: false, default: false })
    @IsBoolean()
    is_delivered: boolean;

    @ApiProperty({ description: 'Date when the delivery was made', example: '2024-11-02T12:34:56Z', required: false })
    @IsDate()
    delivery_date: Date;

    @ApiProperty({ description: 'Address for the delivery', example: '123 Main St, Springfield' })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({ description: 'Optional GPS location for the delivery address', example: '39.9042,116.4074', required: false })
    location?: string;
}
