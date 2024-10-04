import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderStatusHistoryDto } from './create-order_status_history.dto';

export class UpdateOrderStatusHistoryDto extends PartialType(CreateOrderStatusHistoryDto) {}
