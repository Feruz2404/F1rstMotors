import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBranchDto {
    @ApiProperty({
        description: 'The name of the branch',
        example: 'Main Branch',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'The email address of the branch',
        example: 'branch@example.com',
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'The address of the branch',
        example: '123 Main St, Cityville',
    })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({
        description: 'The location of the branch',
        example: 'City Center',
    })
    @IsString()
    @IsNotEmpty()
    location: string;

    @ApiProperty({
        description: 'The phone number of the branch',
        example: '+1234567890',
    })
    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @ApiProperty({
        description: 'The working hours of the branch',
        example: '09:00 AM - 05:00 PM',
    })
    @IsString()
    @IsNotEmpty()
    working_time: string;

    @ApiProperty({
        description: 'Indicates if the branch is active',
        example: true,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}
