import { Column, Model, Table, DataType, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import { Car } from '../../car/models/car.model';
import { Client } from '../../clients/models/client.model';
import { ApiProperty } from '@nestjs/swagger';
import { Payment } from '../../payments/models/payment.model';
import { Delivery } from '../../deliveries/models/delivery.model';

@Table({ tableName: 'orders' })
export class Order extends Model<Order> {
    @ApiProperty({ description: 'Car ID', example: 1 })
    @ForeignKey(() => Car)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    car_id: number;
    @BelongsTo(() => Car)
    car: Car;

    @ApiProperty({ description: 'Client ID', example: 2 })
    @ForeignKey(() => Client)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    client_id: number;
    @BelongsTo(() => Client)
    client: Client;

    @ApiProperty({ description: 'Date when the order was placed', example: '2024-11-01' })
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    order_date: Date;

    @ApiProperty({ description: 'Shipping address for the order', example: '123 Main St, City, Country' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    shipping_address: string;

    @ApiProperty({ description: 'Payment status of the order', example: false })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    is_paid: boolean;

    @ApiProperty({ description: 'Current status of the order', example: 'Pending' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    status: string;

    @HasMany(() => Payment)
    payments: Payment[];

    @HasMany(() => Delivery)
    deliveries: Delivery[];
}
