import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';
import { Partner } from './models/partner.model';

@Module({
    imports: [SequelizeModule.forFeature([Partner])],
    controllers: [PartnersController],
    providers: [PartnersService],
})
export class PartnersModule {}
