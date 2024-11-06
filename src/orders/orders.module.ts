import { Module } from '@nestjs/common';
import { OrderService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { DriverGuard } from '../guards/driver.guard';
import { EmployeesModule } from '../employees/employees.module';

@Module({
  imports: [SequelizeModule.forFeature([Order]), EmployeesModule],
  controllers: [OrdersController],
  providers: [OrderService, DriverGuard],
})
export class OrdersModule {}
