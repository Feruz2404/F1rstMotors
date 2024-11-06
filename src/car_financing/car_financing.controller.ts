import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { CarFinancingService } from './car_financing.service';
import { CreateCarFinancingDto } from './dto/create-car_financing.dto';
import { UpdateCarFinancingDto } from './dto/update-car_financing.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';
import { ClientGuard } from '../guards/client.guard';

@ApiTags('Car Financings')
@Controller('car-financings')
export class CarFinancingController {
  constructor(private readonly carFinancingService: CarFinancingService) {}

  @UseGuards(AdminGuard)
  @UseGuards(ClientGuard)
  @Post()
  @ApiOperation({ summary: 'Create a car financing record' })
  @ApiResponse({ status: 201, description: 'The car financing record has been created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiBody({ type: CreateCarFinancingDto })
  async create(@Body() createCarFinancingDto: CreateCarFinancingDto) {
    return this.carFinancingService.create(createCarFinancingDto);
  }

  @UseGuards(AdminGuard)
  @UseGuards(ClientGuard)
  @Get()
  @ApiOperation({ summary: 'Get all car financing records' })
  @ApiResponse({ status: 200, description: 'Returns all car financing records.' })
  async findAll() {
    return this.carFinancingService.findAll();
  }

  @UseGuards(AdminGuard)
  @UseGuards(ClientGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a car financing record by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the car financing record' })
  @ApiResponse({ status: 200, description: 'Returns the car financing record.' })
  @ApiResponse({ status: 404, description: 'Car financing record not found.' })
  async findOne(@Param('id') id: number) {
    return this.carFinancingService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @UseGuards(ClientGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a car financing record by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the car financing record' })
  @ApiBody({ type: UpdateCarFinancingDto })
  @ApiResponse({ status: 200, description: 'The car financing record has been updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 404, description: 'Car financing record not found.' })
  async update(@Param('id') id: number, @Body() updateCarFinancingDto: UpdateCarFinancingDto) {
    return this.carFinancingService.update(id, updateCarFinancingDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a car financing record by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the car financing record' })
  @ApiResponse({ status: 200, description: 'The car financing record has been deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Car financing record not found.' })
  async remove(@Param('id') id: number) {
    return this.carFinancingService.remove(id);
  }
}
