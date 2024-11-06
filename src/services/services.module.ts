import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from '../employees/models/employee.model';
import { Service } from './models/service.model';

@Module({
  imports: [SequelizeModule.forFeature([Service,Employee])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
