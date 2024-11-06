import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './models/notification.model';
import { AdminGuard } from '../guards/admin.guard';
import { ClientGuard } from '../guards/client.guard';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AdminGuard)
  @UseGuards(ClientGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new notification' })
  @ApiResponse({ status: 201, description: 'Notification created successfully.', type: Notification })
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @UseGuards(AdminGuard)
  @UseGuards(ClientGuard)
  @Get()
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiResponse({ status: 200, description: 'List of all notifications.', type: [Notification] })
  async findAll() {
    return this.notificationService.findAll();
  }

  @UseGuards(AdminGuard)
  @UseGuards(ClientGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific notification by ID' })
  @ApiResponse({ status: 200, description: 'Notification found.', type: Notification })
  @ApiResponse({ status: 404, description: 'Notification not found.' })
  async findOne(@Param('id') id: number) {
    return this.notificationService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a notification by ID' })
  @ApiResponse({ status: 200, description: 'Notification updated successfully.', type: Notification })
  @ApiResponse({ status: 404, description: 'Notification not found.' })
  async update(@Param('id') id: number, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationService.update(id, updateNotificationDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification by ID' })
  @ApiResponse({ status: 200, description: 'Notification deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Notification not found.' })
  async remove(@Param('id') id: number) {
    return this.notificationService.remove(id);
  }
}
