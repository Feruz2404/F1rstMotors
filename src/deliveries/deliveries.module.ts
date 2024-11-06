import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DeliveryService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller';
import { Delivery } from './models/delivery.model';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [SequelizeModule.forFeature([Delivery]), OrdersModule],
  controllers: [DeliveriesController],
  providers: [DeliveryService],
})
export class DeliveriesModule {}
