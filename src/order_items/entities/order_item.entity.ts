import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Order, (order) => order.orderItems, { nullable: false })
  order: Order;
  @ManyToOne(() => Product, (product) => product.orderItems, {
    nullable: false,
  })
  product: Product;
  @Column()
  quantity: number;
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
  @Column({ nullable: true })
  color: string;
  @Column({ nullable: true })
  number: number;
}
