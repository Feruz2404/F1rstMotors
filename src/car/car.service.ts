import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Car } from './models/car.model';
import { Brand } from '../brands/models/brand.model';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectModel(Car)
    private readonly carModel: typeof Car,
  ) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    return this.carModel.create(createCarDto);
  }

  async findAll(): Promise<Car[]> {
    return this.carModel.findAll({ include: [{ model: Brand }] }); // Barcha mashinalarni Brand bilan oling
  }

  async findOne(id: number): Promise<Car> {
    const car = await this.carModel.findOne({
      where: { id },
      include: [{ model: Brand }], // Brand modelini qo'shing
    });

    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }

    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = await this.findOne(id);
    return car.update(updateCarDto);
  }

  async remove(id: number): Promise<void> {
    const car = await this.findOne(id);
    await car.destroy();
  }
}
