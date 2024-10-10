import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('shipping_addresses')
export class ShippingAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address_line: string;

  @Column({ nullable: true })
  address_line2: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postal_code: number;

  @Column()
  country: string;

   @ManyToOne(() => User, (user) => user.shippingAddresses)
  user: User;


}
