import { Column, Model, Table, DataType, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import { Car } from '../../car/models/car.model';
import { Client } from '../../clients/models/client.model';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'wishlist' })
export class Wishlist extends Model<Wishlist> {
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

    @ApiProperty({ description: 'Date when the car was added to wishlist', example: '2024-11-01' })
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    added_date: Date;
}
