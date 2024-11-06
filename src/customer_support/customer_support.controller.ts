import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CustomerSupportService } from './customer_support.service';
import { CreateCustomerSupportDto } from './dto/create-customer_support.dto';
import { UpdateCustomerSupportDto } from './dto/update-customer_support.dto';
import { CustomerSupport } from './models/customer_support.model';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('customer-support')
@Controller('customer-support')
export class CustomerSupportController {
  constructor(private readonly customerSupportService: CustomerSupportService) {}

  @UseGuards(AdminGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new customer support request' })
  @ApiResponse({ status: 201, description: 'Support request created successfully.', type: CustomerSupport })
  async create(@Body() createCustomerSupportDto: CreateCustomerSupportDto) {
      return this.customerSupportService.create(createCustomerSupportDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all customer support requests' })
  @ApiResponse({ status: 200, description: 'List of all support requests.', type: [CustomerSupport] })
  async findAll() {
      return this.customerSupportService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a customer support request by ID' })
  @ApiResponse({ status: 200, description: 'Support request record found.', type: CustomerSupport })
  @ApiResponse({ status: 404, description: 'Support request not found.' })
  async findOne(@Param('id') id: number) {
      return this.customerSupportService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing customer support request' })
  @ApiResponse({ status: 200, description: 'Support request updated successfully.', type: CustomerSupport })
  @ApiResponse({ status: 404, description: 'Support request not found.' })
  async update(@Param('id') id: number, @Body() updateCustomerSupportDto: UpdateCustomerSupportDto) {
      return this.customerSupportService.update(id, updateCustomerSupportDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer support request by ID' })
  @ApiResponse({ status: 200, description: 'Support request deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Support request not found.' })
  async remove(@Param('id') id: number) {
      return this.customerSupportService.remove(id);
  }
}
