<<<<<<< HEAD
import { CartItem } from 'src/cart_items/entities/cart_item.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Discount } from 'src/discounts/entities/discount.entity';
import { OrderItem } from 'src/order_items/entities/order_item.entity';
import { Review } from 'src/reviews/entities/review.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
=======
import { Category } from "src/categories/entities/category.entity";
import { OrderItem } from "src/order_items/entities/order_item.entity";
import { Review } from "src/reviews/entities/review.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";




>>>>>>> ef4906bce037dab6c35425be78456a0dbd011076

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

<<<<<<< HEAD
  @Column()
  description: string;

  @Column('decimal')
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  stock_quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(() => Discount, (discount) => discount.products)
  discounts: Discount[];
  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

    @OneToMany(() => CartItem, (cartItem) => cartItem.product) 
  cartItems: CartItem[];

=======
    @Column()
    description: string;

    @Column()
    stock_quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Category, category => category.products)
    category: Category;

    @OneToMany(() => OrderItem, orderItem => orderItem.product)
    orderItems: OrderItem[];

    @OneToMany(() => Review, review => review.product)
    reviews: Review[];
 
>>>>>>> ef4906bce037dab6c35425be78456a0dbd011076
}
