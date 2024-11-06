import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentService) {}

    @ApiOperation({ summary: 'Create a new payment' })
    @ApiResponse({ status: 201, description: 'Payment created successfully.' })
    @Post()
    async create(@Body() createPaymentDto: CreatePaymentDto) {
        return this.paymentsService.create(createPaymentDto);
    }

    @ApiOperation({ summary: 'Get all payments' })
    @ApiResponse({ status: 200, description: 'Retrieved all payments successfully.' })
    @Get()
    async findAll() {
        return this.paymentsService.findAll();
    }

    @ApiOperation({ summary: 'Get a payment by ID' })
    @ApiResponse({ status: 200, description: 'Retrieved payment successfully.' })
    @ApiResponse({ status: 404, description: 'Payment not found.' })
    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.paymentsService.findOne(id);
    }

    @ApiOperation({ summary: 'Update a payment by ID' })
    @ApiResponse({ status: 200, description: 'Payment updated successfully.' })
    @ApiResponse({ status: 404, description: 'Payment not found.' })
    @Patch(':id')
    async update(@Param('id') id: number, @Body() updatePaymentDto: UpdatePaymentDto) {
        return this.paymentsService.update(id, updatePaymentDto);
    }

    @ApiOperation({ summary: 'Delete a payment by ID' })
    @ApiResponse({ status: 200, description: 'Payment deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Payment not found.' })
    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.paymentsService.remove(id);
    }
}
