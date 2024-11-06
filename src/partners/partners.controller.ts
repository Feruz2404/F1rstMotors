import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Partner } from './models/partner.model';

@ApiTags('partners')
@Controller('partners')
export class PartnersController {
    constructor(private readonly partnersService: PartnersService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new partner' })
    @ApiResponse({ status: 201, description: 'The partner has been successfully created.', type: Partner })
    @ApiBody({ type: CreatePartnerDto })
    async create(@Body() createPartnerDto: CreatePartnerDto) {
        return this.partnersService.create(createPartnerDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all partners' })
    @ApiResponse({ status: 200, description: 'Retrieve all partners.', type: [Partner] })
    async findAll() {
        return this.partnersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a partner by ID' })
    @ApiParam({ name: 'id', type: 'string', description: 'ID of the partner to retrieve' })
    @ApiResponse({ status: 200, description: 'The partner has been successfully retrieved.', type: Partner })
    @ApiResponse({ status: 404, description: 'Partner not found.' })
    async findOne(@Param('id') id: string) {
        return this.partnersService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a partner by ID' })
    @ApiParam({ name: 'id', type: 'string', description: 'ID of the partner to update' })
    @ApiResponse({ status: 200, description: 'The partner has been successfully updated.', type: Partner })
    @ApiResponse({ status: 404, description: 'Partner not found.' })
    async update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
        return this.partnersService.update(+id, updatePartnerDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a partner by ID' })
    @ApiParam({ name: 'id', type: 'string', description: 'ID of the partner to delete' })
    @ApiResponse({ status: 204, description: 'The partner has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Partner not found.' })
    async remove(@Param('id') id: string) {
        return this.partnersService.remove(+id);
    }
}
