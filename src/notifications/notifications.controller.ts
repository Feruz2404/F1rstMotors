import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './models/notification.model';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new notification' })
  @ApiResponse({ status: 201, description: 'Notification created successfully.', type: Notification })
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiResponse({ status: 200, description: 'List of all notifications.', type: [Notification] })
  async findAll() {
    return this.notificationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific notification by ID' })
  @ApiResponse({ status: 200, description: 'Notification found.', type: Notification })
  @ApiResponse({ status: 404, description: 'Notification not found.' })
  async findOne(@Param('id') id: number) {
    return this.notificationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a notification by ID' })
  @ApiResponse({ status: 200, description: 'Notification updated successfully.', type: Notification })
  @ApiResponse({ status: 404, description: 'Notification not found.' })
  async update(@Param('id') id: number, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification by ID' })
  @ApiResponse({ status: 200, description: 'Notification deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Notification not found.' })
  async remove(@Param('id') id: number) {
    return this.notificationService.remove(id);
  }
}
