import { IsInt, IsString, IsNotEmpty, IsBoolean, IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerSupportDto {
    @ApiProperty({ description: 'ID of the client submitting the support request', example: 1 })
    @IsInt()
    @IsNotEmpty()
    client_id: number;

    @ApiProperty({ description: 'Subject of the support request', example: 'Login Issues' })
    @IsString()
    @IsNotEmpty()
    subject: string;

    @ApiProperty({ description: 'Description of the support request', example: 'Unable to login with my credentials' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'Status of the support request', example: 'open', default: 'open' })
    @IsString()
    @IsNotEmpty()
    status: string;

    @ApiProperty({ description: 'Date when the issue was resolved', required: false, example: '2024-11-02T12:34:56Z' })
    @IsDate()
    @IsOptional()
    resolved_date?: Date;

    @ApiProperty({ description: 'ID of the employee handling the support request', required: false, example: 3 })
    @IsInt()
    @IsOptional()
    employee_id?: number;
}
