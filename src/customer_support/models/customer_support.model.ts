import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Client } from '../../clients/models/client.model';
import { Employee } from '../../employees/models/employee.model';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'customer_support' })
export class CustomerSupport extends Model<CustomerSupport> {
    @ApiProperty({ description: 'ID of the client who submitted the support request', example: 1 })
    @ForeignKey(() => Client)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    client_id: number;
    @BelongsTo(() => Client)
    client: Client;

    @ApiProperty({ description: 'Subject of the support request', example: 'Login Issues' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    subject: string;

    @ApiProperty({ description: 'Detailed description of the issue', example: 'Unable to login with my credentials' })
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    description: string;

    @ApiProperty({ description: 'Status of the support request', example: 'open', default: 'open' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'open',
    })
    status: string;

    @ApiProperty({ description: 'Date when the issue was resolved', example: '2024-11-02T12:34:56Z', required: false })
    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    resolved_date?: Date;

    @ApiProperty({ description: 'ID of the employee handling the request', required: false, example: 3 })
    @ForeignKey(() => Employee)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    employee_id: number;
    @BelongsTo(() => Employee)
    employee: Employee;
}
