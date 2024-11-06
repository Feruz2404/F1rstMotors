import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class Partner extends Model<Partner> {
    @ApiProperty({
        description: 'The name of the partner',
        example: 'Acme Corp',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @ApiProperty({
        description: 'The contact person for the partner',
        example: 'John Doe',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    contact_person: string;

    @ApiProperty({
        description: 'The phone number of the partner',
        example: '+1234567890',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phone_number: string;

    @ApiProperty({
        description: 'The email address of the partner',
        example: 'contact@acmecorp.com',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email: string;

    @ApiProperty({
        description: 'The address of the partner',
        example: '1234 Elm St, Springfield',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address: string;

    @ApiProperty({
        description: 'The duration of the agreement in months',
        example: 12,
    })
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    agreement_duration: number;

    @ApiProperty({
        description: 'A description of the partner',
        example: 'A leading company in widget manufacturing.',
        required: false,
    })
    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description: string;
}
