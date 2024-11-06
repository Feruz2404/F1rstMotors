import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarInventory } from './models/car_invertory.model';
import { CarInventoryController } from './car_invertory.controller';
import { CarInventoryService } from './car_invertory.service';

@Module({
    imports: [SequelizeModule.forFeature([CarInventory])],
    controllers: [CarInventoryController],
    providers: [CarInventoryService],
})
export class CarInventoryModule {}
