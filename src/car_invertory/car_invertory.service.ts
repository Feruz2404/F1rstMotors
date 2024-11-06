import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CarInventory } from './models/car_invertory.model';
import { CreateCarInventoryDto } from './dto/create-car_invertory.dto';
import { UpdateCarInvertoryDto } from './dto/update-car_invertory.dto';

@Injectable()
export class CarInventoryService {
    constructor(
        @InjectModel(CarInventory)
        private readonly carInventoryModel: typeof CarInventory,
    ) {}

    async create(createCarInventoryDto: CreateCarInventoryDto): Promise<CarInventory> {
        return this.carInventoryModel.create(createCarInventoryDto);
    }

    async findAll(): Promise<CarInventory[]> {
        return this.carInventoryModel.findAll();
    }

    async findOne(id: number): Promise<CarInventory> {
        const inventory = await this.carInventoryModel.findByPk(id);
        if (!inventory) {
            throw new NotFoundException(`Car inventory with ID ${id} not found`);
        }
        return inventory;
    }

    async update(id: number, updateCarInventoryDto: UpdateCarInvertoryDto): Promise<CarInventory> {
        const [numberOfAffectedRows, [updatedInventory]] = await this.carInventoryModel.update(updateCarInventoryDto, {
            where: { id },
            returning: true,
        });

        if (numberOfAffectedRows === 0) {
            throw new NotFoundException(`Car inventory with ID ${id} not found`);
        }

        return updatedInventory;
    }

    async remove(id: number): Promise<void> {
        const deletedCount = await this.carInventoryModel.destroy({ where: { id } });
        if (deletedCount === 0) {
            throw new NotFoundException(`Car inventory with ID ${id} not found`);
        }
    }
}