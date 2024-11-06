import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './models/service.model';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
    constructor(
        @InjectModel(Service)
        private readonly serviceModel: typeof Service,
    ) {}

    async create(createServiceDto: CreateServiceDto): Promise<Service> {
        return this.serviceModel.create(createServiceDto);
    }

    async findAll(): Promise<Service[]> {
        return this.serviceModel.findAll();
    }

    async findOne(id: number): Promise<Service> {
        const service = await this.serviceModel.findByPk(id);
        if (!service) {
            throw new NotFoundException(`Service with ID ${id} not found`);
        }
        return service;
    }

    async update(id: number, updateServiceDto: UpdateServiceDto): Promise<Service> {
        const [numberOfAffectedRows, [updatedService]] = await this.serviceModel.update(updateServiceDto, {
            where: { id },
            returning: true,
        });

        if (numberOfAffectedRows === 0) {
            throw new NotFoundException(`Service with ID ${id} not found`);
        }

        return updatedService;
    }

    async remove(id: number): Promise<void> {
        const deletedCount = await this.serviceModel.destroy({ where: { id } });
        if (deletedCount === 0) {
            throw new NotFoundException(`Service with ID ${id} not found`);
        }
    }
}