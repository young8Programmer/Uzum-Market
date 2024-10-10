import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserOrder } from 'src/user_orders/entities/user_order.entity';
import { Admin } from 'src/admin/entities/admin.entity'; 
import { ShippingAddress } from 'src/shipping_address/entities/shipping_address.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Cart } from 'src/cart/entities/cart.entity';


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

  @OneToMany(() => UserOrder, (userOrder) => userOrder.user)
  userOrders: UserOrder[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Admin, (admin) => admin.user)
  admins: Admin[];

  @OneToMany(() => ShippingAddress, (shippingAddress) => shippingAddress.user)
  shippingAddresses: ShippingAddress[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

}
