import { PartialType } from '@nestjs/mapped-types';
import { CreateUserOrderDto } from './create-user_order.dto';

export class UpdateUserOrderDto extends PartialType(CreateUserOrderDto) {}
