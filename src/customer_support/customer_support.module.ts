import { Module } from '@nestjs/common';
import { CustomerSupportService } from './customer_support.service';
import { CustomerSupportController } from './customer_support.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerSupport } from './models/customer_support.model';

@Module({
  imports:[SequelizeModule.forFeature([CustomerSupport])],
  controllers: [CustomerSupportController],
  providers: [CustomerSupportService],
})
export class CustomerSupportModule {}
