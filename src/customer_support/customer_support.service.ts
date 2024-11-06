import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CustomerSupport } from './models/customer_support.model';
import { CreateCustomerSupportDto } from './dto/create-customer_support.dto';
import { UpdateCustomerSupportDto } from './dto/update-customer_support.dto';

@Injectable()
export class CustomerSupportService {
    constructor(
        @InjectModel(CustomerSupport)
        private readonly customerSupportModel: typeof CustomerSupport,
    ) {}

    async create(createCustomerSupportDto: CreateCustomerSupportDto): Promise<CustomerSupport> {
        return this.customerSupportModel.create(createCustomerSupportDto);
    }

    async findAll(): Promise<CustomerSupport[]> {
        return this.customerSupportModel.findAll();
    }

    async findOne(id: number): Promise<CustomerSupport> {
        const supportRequest = await this.customerSupportModel.findByPk(id);
        if (!supportRequest) {
            throw new NotFoundException(`Customer support request with ID ${id} not found`);
        }
        return supportRequest;
    }

  	async update(id: number, updateCustomerSupportDto: UpdateCustomerSupportDto): Promise<CustomerSupport> {
      	const [numberOfAffectedRows, [updatedRequest]] = await this.customerSupportModel.update(updateCustomerSupportDto, {
          	where: { id },
          	returning: true,
      	});

      	if (numberOfAffectedRows === 0) {
          	throw new NotFoundException(`Customer support request with ID ${id} not found`);
      	}

      	return updatedRequest;
  	}

  	async remove(id: number): Promise<void> {
      	const deletedCount = await this.customerSupportModel.destroy({ where: { id } });
      	if (deletedCount === 0) {
          	throw new NotFoundException(`Customer support request with ID ${id} not found`);
      	}
  	}
}