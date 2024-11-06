import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreatePartnerDto {
    @ApiProperty({
        description: 'The name of the partner',
        example: 'Acme Corp',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Contact person for the partner',
        example: 'John Doe',
    })
    @IsString()
    @IsNotEmpty()
    contact_person: string;

    @ApiProperty({
        description: 'Phone number of the partner',
        example: '+1234567890',
    })
    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @ApiProperty({
        description: 'Email of the partner',
        example: 'contact@acmecorp.com',
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Address of the partner',
        example: '1234 Elm St, Springfield',
    })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({
        description: 'Duration of the agreement in months',
        example: 12,
    })
    @IsNumber()
    agreement_duration: number;

    @ApiProperty({
        description: 'Description of the partner',
        example: 'A leading company in widget manufacturing.',
        required: false,
    })
    @IsString()
    @IsOptional()
    description?: string;
}
