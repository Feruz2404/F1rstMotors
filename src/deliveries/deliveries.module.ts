import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DeliveryService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller';
import { Delivery } from './models/delivery.model';
import { OrdersModule } from '../orders/orders.module'; // Import OrdersModule

@Module({
  imports: [SequelizeModule.forFeature([Delivery]), OrdersModule], // Import OrdersModule here
  controllers: [DeliveriesController],
  providers: [DeliveryService],
})
export class DeliveriesModule {}
