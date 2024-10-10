<<<<<<< HEAD
import { Order } from 'src/order/entities/order.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
=======
import { Order } from "src/order/entities/order.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

>>>>>>> ef4906bce037dab6c35425be78456a0dbd011076

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}
@Entity()
export class OrderStatusHistory {
<<<<<<< HEAD
  @PrimaryGeneratedColumn()
  id: number;
  @OneToMany(() => Order, (order) => order.statusHistory)
  orders: Order[];
  @ManyToOne(() => Order, (order) => order.statusHistory)
  order: Order;
  @Column({
    type: 'enum',
    enum: OrderStatus,
  })
  status: OrderStatus;
  @Column({ type: 'timestamp' })
  changed_at: Date;
=======
    @PrimaryGeneratedColumn()
    id: number;
    @OneToMany(() => Order, order => order.statusHistory)
    orders: Order[];
    @ManyToOne(() => Order, order => order.statusHistory)
    order: Order;
    @Column({
        type: 'enum',
        enum: OrderStatus,
    })
    status: OrderStatus;
    @Column({ type: 'timestamp' })
    changed_at: Date;

>>>>>>> ef4906bce037dab6c35425be78456a0dbd011076
}
