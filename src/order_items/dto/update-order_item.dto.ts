import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderItemDto } from './create-order_item.dto';

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
