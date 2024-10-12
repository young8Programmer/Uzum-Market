import { IsNotEmpty, IsNumber } from 'class-validator';
import { CartItem } from 'src/cart_items/entities/cart_item.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,

  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ManyToOne(() => User, user => user.carts)
  user: User;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items: CartItem[];
}
