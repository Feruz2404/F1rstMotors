import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model'; // Order modelini import qilish
import { CreateOrderDto } from './dto/create-order.dto'; // Create DTO ni import qilish
import { UpdateOrderDto } from './dto/update-order.dto'; // Update DTO ni import qilish
import { UpdateOrderStatusDto } from './dto/update-order_status.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order)
        private readonly orderModel: typeof Order,
    ) {}

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        return this.orderModel.create(createOrderDto);
    }

    async findAll(): Promise<Order[]> {
        return this.orderModel.findAll();
    }

    async findOne(id: number): Promise<Order> {
        const order = await this.orderModel.findByPk(id);
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }

  	async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
      	const [numberOfAffectedRows, [updatedOrder]] = await this.orderModel.update(updateOrderDto, {
          	where: { id },
          	returning: true,
      	});

      	if (numberOfAffectedRows === 0) {
          	throw new NotFoundException(`Order with ID ${id} not found`);
      	}

      	return updatedOrder;
  	}

  	async remove(id: number): Promise<void> {
      	const deletedCount = await this.orderModel.destroy({ where: { id } });
      	if (deletedCount === 0) {
          	throw new NotFoundException(`Order with ID ${id} not found`);
      	}
  	}

    async updateStatus(id: number, updateOrderStatusDto: UpdateOrderStatusDto): Promise<Order> {
        const order = await this.findOne(id);
        order.status = updateOrderStatusDto.status;
        await order.save();
        return order;
    }
}