import { IsInt, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
    @ApiProperty({ description: 'ID of the client receiving the notification', example: 1 })
    @IsInt()
    @IsNotEmpty()
    client_id: number;

    @ApiProperty({ description: 'Notification message content', example: 'Your order has been shipped' })
    @IsString()
    @IsNotEmpty()
    message: string;

    @ApiProperty({ description: 'Type of notification', example: 'order_status' })
    @IsString()
    @IsNotEmpty()
    notification_type: string;

    @ApiProperty({ description: 'Read status of the notification', example: false, required: false })
    is_read?: boolean;

    @ApiProperty({ description: 'Date the notification was sent', example: '2024-11-02T12:34:56Z', required: false })
    sent_date?: Date;
}
