import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from './models/brand.model';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
    constructor(
        @InjectModel(Brand)
        private readonly brandModel: typeof Brand,
    ) {}

    async create(createBrandDto: CreateBrandDto): Promise<Brand> {
        return this.brandModel.create(createBrandDto);
    }

    async findAll(): Promise<Brand[]> {
        return this.brandModel.findAll();
    }

    async findOne(id: number): Promise<Brand> {
        const brand = await this.brandModel.findByPk(id);
        if (!brand) {
            throw new NotFoundException(`Brand with ID ${id} not found`);
        }
        return brand;
    }

    async update(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand> {
        const [numberOfAffectedRows, [updatedBrand]] = await this.brandModel.update(updateBrandDto, {
            where: { id },
            returning: true,
        });

        if (numberOfAffectedRows === 0) {
            throw new NotFoundException(`Brand with ID ${id} not found`);
        }

        return updatedBrand;
    }

    async remove(id: number): Promise<void> {
        const deletedCount = await this.brandModel.destroy({ where: { id } });
        if (deletedCount === 0) {
            throw new NotFoundException(`Brand with ID ${id} not found`);
        }
    }
}