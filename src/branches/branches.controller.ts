import { Body, Controller, Delete, Get, Param, Post, Patch, UseGuards } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('branches')
@Controller('branches')
export class BranchesController {
    constructor(private readonly branchesService: BranchesService) {}

    @UseGuards(AdminGuard)
    @Post('')
    @ApiOperation({ summary: 'Create a new branch' })
    @ApiResponse({ status: 201, description: 'The branch has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    async create(@Body() createBranchDto: CreateBranchDto) {
        return this.branchesService.create(createBranchDto);
    }

    @Get('')
    @ApiOperation({ summary: 'Retrieve all branches' })
    @ApiResponse({ status: 200, description: 'A list of branches has been successfully retrieved.' })
    @ApiResponse({ status: 404, description: 'Branches not found.' })
    async findAll() {
        return this.branchesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a specific branch by ID' })
    @ApiResponse({ status: 200, description: 'The branch has been successfully retrieved.' })
    @ApiResponse({ status: 404, description: 'Branch not found.' })
    async findOne(@Param('id') id: string) {
        return this.branchesService.findOne(+id);
    }

    @UseGuards(AdminGuard)
    @Patch(':id')
    @ApiOperation({ summary: 'Update a specific branch by ID' })
    @ApiResponse({ status: 200, description: 'The branch has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Branch not found.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    async update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
        return this.branchesService.update(+id, updateBranchDto);
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a specific branch by ID' })
    @ApiResponse({ status: 204, description: 'The branch has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Branch not found.' })
    async remove(@Param('id') id: string) {
        return this.branchesService.remove(+id);
    }
}
