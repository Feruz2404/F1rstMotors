import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('services')
@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Post()
    @ApiResponse({ status: 201, description: 'Service created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    create(@Body() createServiceDto: CreateServiceDto) {
        return this.servicesService.create(createServiceDto);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'List of all services.' })
    findAll() {
        return this.servicesService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Service found.' })
    @ApiResponse({ status: 404, description: 'Service not found.' })
    findOne(@Param('id') id: string) {
        return this.servicesService.findOne(+id);
    }

    @Patch(':id')
    @ApiResponse({ status: 200, description: 'Service updated successfully.' })
    @ApiResponse({ status: 404, description: 'Service not found.' })
    update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
        return this.servicesService.update(+id, updateServiceDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Service deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Service not found.' })
    remove(@Param('id') id: string) {
        return this.servicesService.remove(+id);
    }
}
