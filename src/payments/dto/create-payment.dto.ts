import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty, IsPositive, IsDateString } from 'class-validator';

export class CreatePaymentDto {
    
    @ApiProperty({ description: 'ID of the associated order', example: 1 })
    @IsInt()
    @IsNotEmpty()
    order_id: number;

    @ApiProperty({ description: 'Payment method used for this payment', example: 'credit_card' })
    @IsString()
    @IsNotEmpty()
    payment_method: string;

    @ApiProperty({ description: 'Amount of the payment', example: 100.50 })
    @IsPositive()
    amount: number;

    @ApiProperty({ description: 'Currency of the payment', example: 'USD' })
    @IsString()
    @IsNotEmpty()
    currency: string;

    @ApiProperty({ description: 'Date of the payment', example: '2024-11-01T10:00:00Z' })
    @IsDateString()
    payment_date: Date;

    @ApiProperty({ description: 'Status of the payment', example: 'completed' })
    @IsString()
    @IsNotEmpty()
    status: string;

    @ApiProperty({ description: 'Transaction ID or reference for the payment', example: 'abc123xyz' })
    @IsString()
    @IsNotEmpty()
    transaction: string;
}
