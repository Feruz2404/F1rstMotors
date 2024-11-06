import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Partner } from './models/partner.model';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';

@Injectable()
export class PartnersService {
    constructor(
        @InjectModel(Partner)
        private readonly partnerModel: typeof Partner,
    ) {}

    async create(createPartnerDto: CreatePartnerDto): Promise<Partner> {
        return this.partnerModel.create(createPartnerDto);
    }

    async findAll(): Promise<Partner[]> {
        return this.partnerModel.findAll();
    }

    async findOne(id: number): Promise<Partner> {
        const partner = await this.partnerModel.findByPk(id);
        if (!partner) {
            throw new NotFoundException(`Partner with ID ${id} not found`);
        }
        return partner;
    }

    async update(id: number, updatePartnerDto: UpdatePartnerDto): Promise<Partner> {
        const [numberOfAffectedRows, [updatedPartner]] = await this.partnerModel.update(updatePartnerDto, {
            where: { id },
            returning: true,
        });

        if (numberOfAffectedRows === 0) {
            throw new NotFoundException(`Partner with ID ${id} not found`);
        }

        return updatedPartner;
    }

    async remove(id: number): Promise<void> {
        const deletedCount = await this.partnerModel.destroy({ where: { id } });
        if (deletedCount === 0) {
            throw new NotFoundException(`Partner with ID ${id} not found`);
        }
    }
}