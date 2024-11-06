import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsEmail, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
    @ApiProperty({ description: 'ID of the branch the employee belongs to' })
    @IsNotEmpty()
    branch_id: number;

    @ApiProperty({ description: 'First name of the employee' })
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({ description: 'Last name of the employee' })
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({ description: 'Email of the employee', example: 'employee@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'Phone number of the employee' })
    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @ApiProperty({ description: 'Address of the employee' })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({ description: 'Position of the employee' })
    @IsString()
    @IsNotEmpty()
    position: string;

    @ApiProperty({ description: 'Date the employee was hired' })
    @IsDate()
    @IsNotEmpty()
    hire_date: Date;

    @ApiProperty({ description: 'Whether the employee is active', default: true })
    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}
