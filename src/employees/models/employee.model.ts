import { Column, Model, Table, DataType, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import { Branch } from '../../branches/models/branch.model';
import { ApiProperty } from '@nestjs/swagger';
import { Service } from '../../services/models/service.model';
import { Delivery } from '../../deliveries/models/delivery.model';
import { CustomerSupport } from '../../customer_support/models/customer_support.model';

@Table
export class Employee extends Model<Employee> {
    @ApiProperty({ description: 'ID of the branch the employee belongs to' })
    @ForeignKey(() => Branch)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    branch_id: number;
    @BelongsTo(() => Branch)
    branch: Branch;

    @ApiProperty({ description: 'First name of the employee' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    first_name: string;

    @ApiProperty({ description: 'Last name of the employee' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    last_name: string;

    @ApiProperty({ description: 'Email of the employee', example: 'employee@example.com' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email: string;

    @ApiProperty({ description: 'Phone number of the employee' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phone_number: string;

    @ApiProperty({ description: 'Address of the employee' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address: string;

    @ApiProperty({ description: 'Position of the employee' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    position: string;

    @ApiProperty({ description: 'Date the employee was hired' })
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    hire_date: Date;

    @ApiProperty({ description: 'Whether the employee is active', default: true })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
    is_active: boolean;

    @HasMany(() => Service)
    services: Service[];

    @HasMany(() => Delivery)
    deliveries: Delivery[];

    @HasMany(() => CustomerSupport) 
    customer_supports: CustomerSupport[];
}
