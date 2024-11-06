import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsNumber,
    IsPositive,
} from 'class-validator';

export class CreateCarDto {
    @ApiProperty({
        description: 'ID of the brand associated with the car',
        example: 1,
    })
    @IsNotEmpty()
    brand_id: number;

    @ApiProperty({
        description: 'Model name of the car',
        example: 'Sedan LX',
    })
    @IsNotEmpty()
    @IsString()
    model: string;

    @ApiProperty({
        description: 'Variant of the car',
        example: 'Sport',
        required: false,
    })
    @IsOptional()
    @IsString()
    variant?: string;

    @ApiProperty({
        description: 'Color of the car',
        example: 'Red',
        required: false,
    })
    @IsOptional()
    @IsString()
    color?: string;

    @ApiProperty({
        description: 'Manufacturing year of the car',
        example: 2022,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    year?: number;

    @ApiProperty({
        description: 'Mileage of the car in kilometers',
        example: 25000,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    milage?: number;

    @ApiProperty({
        description: 'Price of the car in USD',
        example: 30000,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    price?: number;

    @ApiProperty({
        description: 'Availability status of the car',
        example: true,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    is_available?: boolean;

    @ApiProperty({
        description: 'Engine type of the car',
        example: 'V6',
        required: false,
    })
    @IsOptional()
    @IsString()
    engine_type?: string;

    @ApiProperty({
        description: 'URL of the car image',
        example: 'https://example.com/car-image.jpg',
        required: false,
    })
    @IsOptional()
    @IsString()
    image_url?: string;

    @ApiProperty({
        description: 'Transmission type of the car',
        example: 'Automatic',
        required: false,
    })
    @IsOptional()
    @IsString()
    transmission?: string;

    @ApiProperty({
        description: 'Fuel efficiency in miles per gallon',
        example: 25.5,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    fuel_efficiency?: number;

    @ApiProperty({
        description: 'Additional description of the car',
        example: 'A reliable family sedan with great fuel efficiency.',
        required: false,
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        description: 'Indicates if the car is on promotion',
        example: true,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    promotion?: boolean;
}
