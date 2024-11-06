import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from './models/notification.model'; // Notification modelini import qilish
import { CreateNotificationDto } from './dto/create-notification.dto'; // Create DTO ni import qilish
import { UpdateNotificationDto } from './dto/update-notification.dto'; // Update DTO ni import qilish

@Injectable()
export class NotificationService {
    constructor(
        @InjectModel(Notification)
        private readonly notificationModel: typeof Notification,
    ) {}

    async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
        return this.notificationModel.create({ ...createNotificationDto });
    }

    async findAll(): Promise<Notification[]> {
        return this.notificationModel.findAll();
    }

    async findOne(id: number): Promise<Notification> {
        const notification = await this.notificationModel.findByPk(id);
        if (!notification) {
            throw new NotFoundException(`Notification with ID ${id} not found`);
        }
        return notification;
    }

  	async update(id: number, updateNotificationDto: UpdateNotificationDto): Promise<Notification> {
      	const [numberOfAffectedRows, [updatedNotification]] = await this.notificationModel.update(updateNotificationDto, {
          	where: { id },
          	returning: true,
      	});

      	if (numberOfAffectedRows === 0) {
          	throw new NotFoundException(`Notification with ID ${id} not found`);
      	}

      	return updatedNotification;
  	}

  	async remove(id: number): Promise<void> {
      	const deletedCount = await this.notificationModel.destroy({ where: { id } });
      	if (deletedCount === 0) {
          	throw new NotFoundException(`Notification with ID ${id} not found`);
      	}
  	}
}