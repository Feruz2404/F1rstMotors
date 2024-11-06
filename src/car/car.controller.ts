import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './models/car.model';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('cars')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @UseGuards(AdminGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new car' })
  @ApiResponse({ status: 201, description: 'The car has been successfully created.', type: Car })
  @ApiBody({ type: CreateCarDto })
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cars' })
  @ApiResponse({ status: 200, description: 'Retrieve all cars.', type: [Car] })
  findAll() {
    return this.carService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a car by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID of the car to retrieve' })
  @ApiResponse({ status: 200, description: 'The car has been successfully retrieved.', type: Car })
  @ApiResponse({ status: 404, description: 'Car not found.' })
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a car by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID of the car to update' })
  @ApiResponse({ status: 200, description: 'The car has been successfully updated.', type: Car })
  @ApiResponse({ status: 404, description: 'Car not found.' })
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a car by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID of the car to delete' })
  @ApiResponse({ status: 204, description: 'The car has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Car not found.' })
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }
}
