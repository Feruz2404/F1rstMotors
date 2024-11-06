import { Module } from '@nestjs/common';
import { EmployeeService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from './models/employee.model';

@Module({
  imports: [SequelizeModule.forFeature([Employee])],
  controllers: [EmployeesController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeesModule {}
