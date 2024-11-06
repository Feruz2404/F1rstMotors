import { PartialType } from '@nestjs/swagger';
import { CreateCarFinancingDto } from './create-car_financing.dto';

export class UpdateCarFinancingDto extends PartialType(CreateCarFinancingDto) {}
