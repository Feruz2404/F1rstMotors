import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../orders/models/order.model';

@Table({ tableName: 'payments' })
export class Payment extends Model<Payment> {
    
    @ApiProperty({ description: 'ID of the associated order', example: 1 })
    @ForeignKey(() => Order)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    order_id: number;
    @BelongsTo(() => Order)
    order: Order;

    @ApiProperty({ description: 'Payment method used for this payment', example: 'credit_card' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    payment_method: string;

    @ApiProperty({ description: 'Amount of the payment', example: 100.50 })
    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    amount: number;

    @ApiProperty({ description: 'Currency of the payment', example: 'USD' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    currency: string;

    @ApiProperty({ description: 'Date of the payment', example: '2024-11-01T10:00:00Z' })
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    payment_date: Date;

    @ApiProperty({ description: 'Status of the payment', example: 'completed' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    status: string;

    @ApiProperty({ description: 'Transaction ID or reference for the payment', example: 'abc123xyz' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    transaction: string;
}
