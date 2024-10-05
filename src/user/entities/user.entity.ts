import { Admin } from 'src/admin/entities/admin.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column({
    type: 'enum',
    enum: ['user', 'admin', 'store_owner', 'manager'],
  })
  role: string;

  @OneToMany(() => Cart, cart => cart.user)
  carts: Cart[];

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

  @OneToMany(() => Admin, admin => admin.user)
  admins: Admin[];
}
