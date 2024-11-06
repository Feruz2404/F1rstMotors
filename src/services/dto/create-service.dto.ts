import { IsNotEmpty, IsOptional, IsString, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
    @ApiProperty({ description: 'ID of the car associated with the service' })
    @IsNotEmpty()
    car_id: number;

    @ApiProperty({ description: 'Date of the service', type: Date })
    @IsDate()
    @IsNotEmpty()
    service_date: Date;

    @ApiProperty({ description: 'Type of the service performed' })
    @IsString()
    @IsNotEmpty()
    service_type: string;

    @ApiProperty({ description: 'Description of the service', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'Cost of the service' })
    @IsNumber()
    @IsNotEmpty()
    cost: number;

    @ApiProperty({ description: 'ID of the employee who performed the service' })
    @IsNotEmpty()
    employee_id: number;
}
