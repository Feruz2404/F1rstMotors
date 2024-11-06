import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CarFinancing } from './models/car_financing.entity';
import { CreateCarFinancingDto } from './dto/create-car_financing.dto';
import { UpdateCarFinancingDto } from './dto/update-car_financing.dto';

@Injectable()
export class CarFinancingService {
    constructor(
        @InjectModel(CarFinancing)
        private readonly carFinancingModel: typeof CarFinancing,
    ) {}

    async create(createCarFinancingDto: CreateCarFinancingDto): Promise<CarFinancing> {
        return this.carFinancingModel.create(createCarFinancingDto);
    }

    async findAll(): Promise<CarFinancing[]> {
        return this.carFinancingModel.findAll();
    }

    async findOne(id: number): Promise<CarFinancing> {
        const financing = await this.carFinancingModel.findByPk(id);
        if (!financing) {
            throw new NotFoundException(`Car financing with ID ${id} not found`);
        }
        return financing;
    }

  	async update(id: number, updateCarFinancingDto: UpdateCarFinancingDto): Promise<CarFinancing> {
      	const [numberOfAffectedRows, [updatedFinancing]] = await this.carFinancingModel.update(updateCarFinancingDto, {
          	where: { id },
          	returning: true,
      	});

      	if (numberOfAffectedRows === 0) {
          	throw new NotFoundException(`Car financing with ID ${id} not found`);
      	}

      	return updatedFinancing;
  	}

  	async remove(id: number): Promise<void> {
      	const deletedCount = await this.carFinancingModel.destroy({ where: { id } });
      	if (deletedCount === 0) {
          	throw new NotFoundException(`Car financing with ID ${id} not found`);
      	}
  	}
}