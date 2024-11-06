import { PartialType } from '@nestjs/swagger';
import { CreateCustomerSupportDto } from './create-customer_support.dto';

export class UpdateCustomerSupportDto extends PartialType(CreateCustomerSupportDto) {}
