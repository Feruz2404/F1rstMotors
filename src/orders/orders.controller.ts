import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrderService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './models/order.model';
import { DriverGuard } from '../guards/driver.guard';
import { UpdateOrderStatusDto } from './dto/update-order_status.dto';
import { AdminGuard } from '../guards/admin.guard';
import { ClientGuard } from '../guards/client.guard';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrderService) {}

  @UseGuards(AdminGuard)
  @UseGuards(ClientGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully.', type: Order })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }
  
  @UseGuards(AdminGuard)
  @UseGuards(ClientGuard)
  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'List of all orders.', type: [Order] })
  async findAll() {
    return this.ordersService.findAll();
  }

  @UseGuards(AdminGuard)
  @UseGuards(ClientGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({ status: 200, description: 'Order found.', type: Order })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiResponse({ status: 200, description: 'Order updated successfully.', type: Order })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiResponse({ status: 200, description: 'Order deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }

  @Patch(':id/status')
    @UseGuards(DriverGuard)
    async updateStatus(@Param('id') id: number, @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
        return this.ordersService.updateStatus(id, updateOrderStatusDto);
    }
}
