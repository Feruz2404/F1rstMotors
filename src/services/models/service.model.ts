import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Car } from '../../car/models/car.model';
import { Employee } from '../../employees/models/employee.model';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class Service extends Model<Service> {
    @ApiProperty({ description: 'ID of the car associated with the service' })
    @ForeignKey(() => Car)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    car_id: number;
    @BelongsTo(() => Car)
    car: Car;

    @ApiProperty({ description: 'Date of the service', type: Date })
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    service_date: Date;

    @ApiProperty({ description: 'Type of the service performed' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    service_type: string;

    @ApiProperty({ description: 'Description of the service', required: false })
    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description: string;

    @ApiProperty({ description: 'Cost of the service' })
    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    cost: number;

    @ApiProperty({ description: 'ID of the employee who performed the service' })
    @ForeignKey(() => Employee)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    employee_id: number;
    @BelongsTo(() => Employee)
    employee: Employee;
}
