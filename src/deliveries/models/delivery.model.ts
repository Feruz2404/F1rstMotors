import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Order } from '../../orders/models/order.model';
import { Employee } from '../../employees/models/employee.model';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'deliveries' })
export class Delivery extends Model<Delivery> {
    @ApiProperty({ description: 'ID of the employee assigned to the delivery', example: 1 })
    @ForeignKey(() => Employee)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    employee_id: number;
    @BelongsTo(() => Employee)
    employee: Employee;

    @ApiProperty({ description: 'ID of the order associated with the delivery', example: 101 })
    @ForeignKey(() => Order)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    order_id: number;
    @BelongsTo(() => Order)
    order: Order;

    @ApiProperty({ description: 'Delivery status, indicating if the order is delivered', example: false, default: false })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    is_delivered: boolean;

    @ApiProperty({ description: 'Date when the delivery was completed', example: '2024-11-02T12:34:56Z', required: false })
    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    delivery_date: Date;

    @ApiProperty({ description: 'Delivery address', example: '123 Main St, Springfield' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address: string;

    @ApiProperty({ description: 'Optional location data for the delivery', example: '39.9042,116.4074', required: false })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    location?: string;
}
