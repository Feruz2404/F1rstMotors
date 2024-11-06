import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { BrandService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Brand } from './models/brand.model';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Brands')
@Controller('brands')
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @UseGuards(AdminGuard)
    @Post('')
    @ApiOperation({ summary: 'Create a new brand' })
    @ApiResponse({ status: 201, description: 'Brand successfully created', type: Brand })
    @ApiBody({ type: CreateBrandDto })
    async create(@Body() createBrandDto: CreateBrandDto): Promise<Brand> {
        return this.brandService.create(createBrandDto);
    }

    @Get('')
    @ApiOperation({ summary: 'Retrieve all brands' })
    @ApiResponse({ status: 200, description: 'List of all brands', type: [Brand] })
    async findAll(): Promise<Brand[]> {
        return this.brandService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a brand by ID' })
    @ApiParam({ name: 'id', type: Number, description: 'Brand ID' })
    @ApiResponse({ status: 200, description: 'Brand details', type: Brand })
    @ApiResponse({ status: 404, description: 'Brand not found' })
    async findOne(@Param('id') id: number): Promise<Brand> {
        return this.brandService.findOne(id);
    }

    @UseGuards(AdminGuard)
    @Patch(':id')
    @ApiOperation({ summary: 'Update a brand by ID' })
    @ApiParam({ name: 'id', type: Number, description: 'Brand ID' })
    @ApiBody({ type: CreateBrandDto, description: 'Data to update brand' })
    @ApiResponse({ status: 200, description: 'Brand successfully updated', type: Brand })
    @ApiResponse({ status: 404, description: 'Brand not found' })
    async update(
        @Param('id') id: number,
        @Body() updateBrandDto: Partial<CreateBrandDto>,
    ): Promise<Brand> {
        return this.brandService.update(id, updateBrandDto);
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a brand by ID' })
    @ApiParam({ name: 'id', type: Number, description: 'Brand ID' })
    @ApiResponse({ status: 200, description: 'Brand successfully deleted' })
    @ApiResponse({ status: 404, description: 'Brand not found' })
    async remove(@Param('id') id: number): Promise<void> {
        return this.brandService.remove(id);
    }
}
