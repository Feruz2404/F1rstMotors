import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './models/car.model';

@Module({
  imports: [SequelizeModule.forFeature([Car])],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
