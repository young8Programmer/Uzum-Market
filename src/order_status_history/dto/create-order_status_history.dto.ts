import { IsEnum, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { OrderStatus } from '../entities/order_status_history.entity';

export class CreateOrderStatusHistoryDto {
    @IsNotEmpty()
    @IsNumber()
    order_id: number; // Buyurtma identifikatori

    @IsNotEmpty()
    @IsEnum(OrderStatus)
    status: OrderStatus; // Buyurtma holati

    @IsNotEmpty()
    @IsDate()
    changed_at: Date; // O'zgarish sanasi
}
