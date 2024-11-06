import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('services')
@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @UseGuards(AdminGuard)
    @Post()
    @ApiResponse({ status: 201, description: 'Service created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    create(@Body() createServiceDto: CreateServiceDto) {
        return this.servicesService.create(createServiceDto);
    }

    @UseGuards(AdminGuard)
    @Get()
    @ApiResponse({ status: 200, description: 'List of all services.' })
    findAll() {
        return this.servicesService.findAll();
    }

    @UseGuards(AdminGuard)
    @Get(':id')
    @ApiResponse({ status: 200, description: 'Service found.' })
    @ApiResponse({ status: 404, description: 'Service not found.' })
    findOne(@Param('id') id: string) {
        return this.servicesService.findOne(+id);
    }

    @UseGuards(AdminGuard)
    @Patch(':id')
    @ApiResponse({ status: 200, description: 'Service updated successfully.' })
    @ApiResponse({ status: 404, description: 'Service not found.' })
    update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
        return this.servicesService.update(+id, updateServiceDto);
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Service deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Service not found.' })
    remove(@Param('id') id: string) {
        return this.servicesService.remove(+id);
    }
}
