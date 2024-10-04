import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
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
  order_data: Date; 
  @Column({ type: 'date' })
  @IsNotEmpty()
  @IsDateString()
  order_data: Date;
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
    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[];
  @ManyToOne(() => OrderStatusHistory, statusHistory => statusHistory.order)
statusHistory: OrderStatusHistory[];

}
