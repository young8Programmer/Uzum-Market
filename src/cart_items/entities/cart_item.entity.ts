import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column()
  quantity: number;

  @Column()
  user_id: number;
}
