import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import {
  IsNumber,
  IsDateString,
  IsString,
  IsPositive,
  Min,
  IsNotEmpty,
} from 'class-validator';
import { OrderStatusHistory } from 'src/order_status_history/entities/order_status_history.entity';
import { OrderItem } from 'src/order_items/entities/order_item.entity';
import { UserOrder } from 'src/user_orders/entities/user_order.entity';
import { Payment } from 'src/payments/entities/payment.entity';



@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @Column({ type: 'date' })
  @IsNotEmpty()
  @IsDateString()
  order_date: Date;



  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  @IsString()
  status: string;


  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(0)
  total_amount: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @ManyToOne(() => OrderStatusHistory, (statusHistory) => statusHistory.order)
  statusHistory: OrderStatusHistory[];

  @OneToMany(() => UserOrder, (userOrder) => userOrder.order)
  userOrders: UserOrder[];

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];
}

