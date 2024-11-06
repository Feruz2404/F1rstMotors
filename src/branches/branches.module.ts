import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { Branch } from './models/branch.model';

@Module({
  imports: [SequelizeModule.forFeature([Branch])],
  controllers: [BranchesController],
  providers: [BranchesService],
  exports: [BranchesService],
})
export class BranchesModule {}