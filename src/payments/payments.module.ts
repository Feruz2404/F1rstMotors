import { Module } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';

@Module({
  imports: [SequelizeModule.forFeature([Payment])],
  controllers: [PaymentsController],
  providers: [PaymentService],
})
export class PaymentsModule {}
