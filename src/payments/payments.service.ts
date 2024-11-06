import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
    constructor(
        @InjectModel(Payment)
        private readonly paymentModel: typeof Payment,
    ) {}

    async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
        return this.paymentModel.create(createPaymentDto);
    }

    async findAll(): Promise<Payment[]> {
        return this.paymentModel.findAll();
    }

    async findOne(id: number): Promise<Payment> {
        const payment = await this.paymentModel.findByPk(id);
        if (!payment) {
            throw new NotFoundException(`Payment with ID ${id} not found`);
        }
        return payment;
    }

  	async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
      	const [numberOfAffectedRows, [updatedPayment]] = await this.paymentModel.update(updatePaymentDto, {
          	where: { id },
          	returning: true,
      	});

      	if (numberOfAffectedRows === 0) {
          	throw new NotFoundException(`Payment with ID ${id} not found`);
      	}

      	return updatedPayment;
  	}

  	async remove(id: number): Promise<void> {
      	const deletedCount = await this.paymentModel.destroy({ where: { id } });
      	if (deletedCount === 0) {
          	throw new NotFoundException(`Payment with ID ${id} not found`);
      	}
  	}
}