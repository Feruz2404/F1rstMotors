import { PartialType } from '@nestjs/swagger';
import { CreateCarInventoryDto } from './create-car_invertory.dto';

export class UpdateCarInvertoryDto extends PartialType(CreateCarInventoryDto) {}
