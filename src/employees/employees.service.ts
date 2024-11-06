import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './models/employee.model';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectModel(Employee)
        private readonly employeeModel: typeof Employee,
    ) {}

    async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        return this.employeeModel.create(createEmployeeDto);
    }

    async findAll(): Promise<Employee[]> {
        return this.employeeModel.findAll();
    }

    async findOne(id: number): Promise<Employee> {
        const employee = await this.employeeModel.findByPk(id);
        if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }
        return employee;
    }

    async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
        const [numberOfAffectedRows, [updatedEmployee]] = await this.employeeModel.update(updateEmployeeDto, {
            where: { id },
            returning: true,
        });

        if (numberOfAffectedRows === 0) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }

        return updatedEmployee;
    }

    async remove(id: number): Promise<void> {
        const deletedCount = await this.employeeModel.destroy({ where: { id } });
        if (deletedCount === 0) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }
    }
}