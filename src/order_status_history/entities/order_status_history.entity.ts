import { Order } from "src/order/entities/order.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

export enum OrderStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

@Entity()
export class OrderStatusHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.statusHistory) 
    order: Order; 

    @Column({
        type: 'enum',
        enum: OrderStatus,
    })
    status: OrderStatus;

    @Column()
    changed_at: Date; 
}
