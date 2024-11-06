import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Car } from '../../car/models/car.model';
import { Client } from '../../clients/models/client.model';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'cart' })
export class Cart extends Model<Cart> {
    @ApiProperty({ description: 'ID of the car added to the cart', example: 1 })
    @ForeignKey(() => Car)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    car_id: number;
    @BelongsTo(() => Car)
    car: Car;

    @ApiProperty({ description: 'ID of the client adding the car to the cart', example: 1 })
    @ForeignKey(() => Client)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    client_id: number;
    @BelongsTo(() => Client)
    client: Client;

    @ApiProperty({ description: 'Date when the car was added to the cart', example: '2024-11-02T12:34:56Z' })
    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    added_date: Date;

    @ApiProperty({ description: 'Quantity of the car added', example: 1 })
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 1,
    })
    quantity: number;
}
