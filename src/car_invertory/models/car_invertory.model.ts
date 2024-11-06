import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Car } from '../../car/models/car.model';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'car_inventory' })
export class CarInventory extends Model<CarInventory> {
    @ApiProperty({
        description: 'Unique identifier of the car inventory item',
        example: 1,
    })
    @ForeignKey(() => Car)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    car_id: number;
    @BelongsTo(() => Car)
    car: Car;

    @ApiProperty({
        description: 'Quantity of cars available in inventory',
        example: 10,
    })
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
    })
    quantity: number;

    @ApiProperty({
        description: 'Status of the car inventory item',
        example: 'available',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    status: string;
}
