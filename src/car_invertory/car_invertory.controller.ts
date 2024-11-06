import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { CarInventoryService } from './car_invertory.service';
import { CreateCarInventoryDto } from './dto/create-car_invertory.dto';
import { CarInventory } from './models/car_invertory.model';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Car Inventory')
@Controller('car-inventory')
export class CarInventoryController {
    constructor(private readonly carInventoryService: CarInventoryService) {}

    @UseGuards(AdminGuard)
    @Post()
    @ApiOperation({ summary: 'Create a new car inventory entry' })
    @ApiResponse({ status: 201, description: 'Car inventory successfully created', type: CarInventory })
    @ApiBody({ type: CreateCarInventoryDto })
    async create(@Body() createCarInventoryDto: CreateCarInventoryDto): Promise<CarInventory> {
        return this.carInventoryService.create(createCarInventoryDto);
    }

    @Get()
    @ApiOperation({ summary: 'Retrieve all car inventory records' })
    @ApiResponse({ status: 200, description: 'List of car inventory records', type: [CarInventory] })
    async findAll(): Promise<CarInventory[]> {
        return this.carInventoryService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a car inventory entry by ID' })
    @ApiParam({ name: 'id', type: Number, description: 'Car Inventory ID' })
    @ApiResponse({ status: 200, description: 'Car inventory details', type: CarInventory })
    @ApiResponse({ status: 404, description: 'Car inventory not found' })
    async findOne(@Param('id') id: number): Promise<CarInventory> {
        return this.carInventoryService.findOne(id);
    }

    @UseGuards(AdminGuard)
    @Put(':id')
    @ApiOperation({ summary: 'Update a car inventory entry by ID' })
    @ApiParam({ name: 'id', type: Number, description: 'Car Inventory ID' })
    @ApiBody({ type: CreateCarInventoryDto, description: 'Data to update the car inventory entry' })
    @ApiResponse({ status: 200, description: 'Car inventory successfully updated', type: CarInventory })
    @ApiResponse({ status: 404, description: 'Car inventory not found' })
    async update(
        @Param('id') id: number,
        @Body() updateCarInventoryDto: Partial<CreateCarInventoryDto>,
    ): Promise<CarInventory> {
        return this.carInventoryService.update(id, updateCarInventoryDto);
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a car inventory entry by ID' })
    @ApiParam({ name: 'id', type: Number, description: 'Car Inventory ID' })
    @ApiResponse({ status: 200, description: 'Car inventory successfully deleted' })
    @ApiResponse({ status: 404, description: 'Car inventory not found' })
    async remove(@Param('id') id: number): Promise<void> {
        return this.carInventoryService.remove(id);
    }
}
