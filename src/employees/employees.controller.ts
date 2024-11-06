import { Body, Controller, Delete, Get, Param, Post, Patch, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeeService) {}

    @UseGuards(AdminGuard)
    @Post()
    @ApiOperation({ summary: 'Create a new employee' })
    @ApiResponse({ status: 201, description: 'The employee has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    async create(@Body() createEmployeeDto: CreateEmployeeDto) {
        return this.employeesService.create(createEmployeeDto);
    }

    @UseGuards(AdminGuard)
    @Get()
    @ApiOperation({ summary: 'Retrieve all employees' })
    @ApiResponse({ status: 200, description: 'A list of employees has been successfully retrieved.' })
    @ApiResponse({ status: 404, description: 'Employees not found.' })
    async findAll() {
        return this.employeesService.findAll();
    }

    @UseGuards(AdminGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a specific employee by ID' })
    @ApiResponse({ status: 200, description: 'The employee has been successfully retrieved.' })
    @ApiResponse({ status: 404, description: 'Employee not found.' })
    async findOne(@Param('id') id: string) {
        return this.employeesService.findOne(+id);
    }

    @UseGuards(AdminGuard)
    @Patch(':id')
    @ApiOperation({ summary: 'Update a specific employee by ID' })
    @ApiResponse({ status: 200, description: 'The employee has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Employee not found.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
        return this.employeesService.update(+id, updateEmployeeDto);
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a specific employee by ID' })
    @ApiResponse({ status: 204, description: 'The employee has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Employee not found.' })
    async remove(@Param('id') id: string) {
        return this.employeesService.remove(+id);
    }
}
