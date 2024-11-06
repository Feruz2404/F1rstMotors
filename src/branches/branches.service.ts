import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Branch } from './models/branch.model';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchesService {
    constructor(@InjectModel(Branch) private readonly branchModel: typeof Branch) {}

    async create(createBranchDto: CreateBranchDto): Promise<Branch> {
        const newBranch = await this.branchModel.create(createBranchDto);
        return newBranch;
    }

    async findAll(): Promise<Branch[]> {
        return this.branchModel.findAll();
    }

    async findOne(id: number): Promise<Branch> {
        const branch = await this.branchModel.findByPk(id);
        if (!branch) {
            throw new NotFoundException(`Branch with ID ${id} not found`);
        }
        return branch;
    }

    async update(id: number, updateBranchDto: UpdateBranchDto): Promise<Branch> {
        const [numberOfAffectedRows, [updatedBranch]] = await this.branchModel.update(updateBranchDto, {
            where: { id },
            returning: true,
        });

        if (numberOfAffectedRows === 0) {
            throw new NotFoundException(`Branch with ID ${id} not found`);
        }

        return updatedBranch;
    }

    async remove(id: number): Promise<void> {
        const deletedCount = await this.branchModel.destroy({ where: { id } });
        if (deletedCount === 0) {
            throw new NotFoundException(`Branch with ID ${id} not found`);
        }
    }
}