import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Delivery } from './models/delivery.model';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveryService {
    constructor(
        @InjectModel(Delivery)
        private readonly deliveryModel: typeof Delivery,
    ) {}

    async create(createDeliveryDto: CreateDeliveryDto): Promise<Delivery> {
        return this.deliveryModel.create(createDeliveryDto);
    }

    async findAll(): Promise<Delivery[]> {
        return this.deliveryModel.findAll();
    }

    async findOne(id: number): Promise<Delivery> {
        const delivery = await this.deliveryModel.findByPk(id);
        if (!delivery) {
            throw new NotFoundException(`Delivery with ID ${id} not found`);
        }
        return delivery;
    }

  	async update(id: number, updateDeliveryDto: UpdateDeliveryDto): Promise<Delivery> {
      	const [numberOfAffectedRows, [updatedDelivery]] = await this.deliveryModel.update(updateDeliveryDto, {
          	where: { id },
          	returning: true,
      	});

      	if (numberOfAffectedRows === 0) {
          	throw new NotFoundException(`Delivery with ID ${id} not found`);
      	}

      	return updatedDelivery;
  	}

  	async remove(id: number): Promise<void> {
      	const deletedCount = await this.deliveryModel.destroy({ where: { id } });
      	if (deletedCount === 0) {
          	throw new NotFoundException(`Delivery with ID ${id} not found`);
      	}
  	}
}