import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeliveryService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Delivery } from './models/delivery.model';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('deliveries')
@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveryService) {}

  @UseGuards(AdminGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new delivery record' })
  @ApiResponse({ status: 201, description: 'Delivery created successfully.', type: Delivery })
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveriesService.create(createDeliveryDto);
  }

  @UseGuards(AdminGuard)
  @Get()
  @ApiOperation({ summary: 'Retrieve all deliveries' })
  @ApiResponse({ status: 200, description: 'List of all deliveries.', type: [Delivery] })
  findAll() {
    return this.deliveriesService.findAll();
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a delivery by ID' })
  @ApiResponse({ status: 200, description: 'Delivery record found.', type: Delivery })
  @ApiResponse({ status: 404, description: 'Delivery not found.' })
  findOne(@Param('id') id: string) {
    return this.deliveriesService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing delivery' })
  @ApiResponse({ status: 200, description: 'Delivery updated successfully.', type: Delivery })
  @ApiResponse({ status: 404, description: 'Delivery not found.' })
  update(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
    return this.deliveriesService.update(+id, updateDeliveryDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a delivery by ID' })
  @ApiResponse({ status: 200, description: 'Delivery deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Delivery not found.' })
  remove(@Param('id') id: string) {
    return this.deliveriesService.remove(+id);
  }
}
