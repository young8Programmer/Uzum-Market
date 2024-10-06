import { IsEnum, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { OrderStatus } from '../entities/order_status_history.entity';

export class CreateOrderStatusHistoryDto {
  @IsNotEmpty()
  @IsNumber()
  order_id: number;

  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsNotEmpty()
  @IsDate()
  changed_at: Date;
}
