import { Column, Model, Table, DataType, ForeignKey, BelongsToMany, BelongsTo } from 'sequelize-typescript';
import { Client } from '../../clients/models/client.model';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'notifications' })
export class Notification extends Model<Notification> {
    @ApiProperty({ description: 'Client ID associated with the notification', example: 1 })
    @ForeignKey(() => Client)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    client_id: number;
    @BelongsTo(() => Client)
    client: Client;

    @ApiProperty({ description: 'Message of the notification', example: 'Your order has been shipped' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    message: string;

    @ApiProperty({ description: 'Type of notification', example: 'order_status' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    notification_type: string;

    @ApiProperty({ description: 'Indicates if the notification has been read', example: false, default: false })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    is_read: boolean;

    @ApiProperty({ description: 'Date and time when the notification was sent', example: '2024-11-02T12:34:56Z', default: new Date() })
    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    sent_date: Date;
}
