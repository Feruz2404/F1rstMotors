import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employees/models/employee.model';

@Table
export class Branch extends Model<Branch> {
    @ApiProperty({
        description: 'The name of the branch',
        example: 'Main Branch',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @ApiProperty({
        description: 'The email address of the branch',
        example: 'branch@example.com',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email: string;

    @ApiProperty({
        description: 'The address of the branch',
        example: '123 Main St, Cityville',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address: string;

    @ApiProperty({
        description: 'The location of the branch',
        example: 'City Center',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    location: string;

    @ApiProperty({
        description: 'The phone number of the branch',
        example: '+1234567890',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phone_number: string;

    @ApiProperty({
        description: 'The working hours of the branch',
        example: '09:00 AM - 05:00 PM',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    working_time: string;

    @ApiProperty({
        description: 'Indicates if the branch is active',
        example: true,
    })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
    is_active: boolean;

    @HasMany(() => Employee)
    employees: Employee[];
}
