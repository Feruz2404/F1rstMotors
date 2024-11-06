import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Car } from '../../car/models/car.model';
import { Client } from '../../clients/models/client.model';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'car_financing' })
export class CarFinancing extends Model<CarFinancing> {
    
    @ApiProperty({ description: 'ID of the client who is financing the car', example: 1 })
    @ForeignKey(() => Client)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    client_id: number;
    @BelongsTo(() => Client)
    client: Client

    @ApiProperty({ description: 'ID of the car being financed', example: 1 })
    @ForeignKey(() => Car)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    car_id: number;
    @BelongsTo(() => Car)
    car: Car

    @ApiProperty({ description: 'Type of financing, such as lease or loan', example: 'lease' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    financing_type: string;

    @ApiProperty({ description: 'Amount of financing in dollars', example: 20000.00 })
    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    amount: number;

    @ApiProperty({ description: 'Interest rate for the financing', example: 5.5 })
    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    interest_rate: number;

    @ApiProperty({ description: 'Term of the financing in months', example: 36 })
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    term_month: number;
}
