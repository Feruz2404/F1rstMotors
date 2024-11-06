import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';
import { ClientGuard } from '../guards/client.guard';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentService) {}

    @UseGuards(AdminGuard)
    @UseGuards(ClientGuard)
    @ApiOperation({ summary: 'Create a new payment' })
    @ApiResponse({ status: 201, description: 'Payment created successfully.' })
    @Post()
    async create(@Body() createPaymentDto: CreatePaymentDto) {
        return this.paymentsService.create(createPaymentDto);
    }

    @UseGuards(AdminGuard)
    @UseGuards(ClientGuard)
    @ApiOperation({ summary: 'Get all payments' })
    @ApiResponse({ status: 200, description: 'Retrieved all payments successfully.' })
    @Get()
    async findAll() {
        return this.paymentsService.findAll();
    }

    @UseGuards(AdminGuard)
    @UseGuards(ClientGuard)
    @ApiOperation({ summary: 'Get a payment by ID' })
    @ApiResponse({ status: 200, description: 'Retrieved payment successfully.' })
    @ApiResponse({ status: 404, description: 'Payment not found.' })
    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.paymentsService.findOne(id);
    }

    @UseGuards(AdminGuard)
    @ApiOperation({ summary: 'Update a payment by ID' })
    @ApiResponse({ status: 200, description: 'Payment updated successfully.' })
    @ApiResponse({ status: 404, description: 'Payment not found.' })
    @Patch(':id')
    async update(@Param('id') id: number, @Body() updatePaymentDto: UpdatePaymentDto) {
        return this.paymentsService.update(id, updatePaymentDto);
    }

    @UseGuards(AdminGuard)
    @ApiOperation({ summary: 'Delete a payment by ID' })
    @ApiResponse({ status: 200, description: 'Payment deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Payment not found.' })
    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.paymentsService.remove(id);
    }
}
