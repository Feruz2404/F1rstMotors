import { Module } from '@nestjs/common';
import { CarFinancingService } from './car_financing.service';
import { CarFinancingController } from './car_financing.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarFinancing } from './models/car_financing.entity';

@Module({
  imports: [SequelizeModule.forFeature([CarFinancing])],
  controllers: [CarFinancingController],
  providers: [CarFinancingService],
})
export class CarFinancingModule {}
