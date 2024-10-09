import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Order } from 'src/order/entities/order.entity';

@Entity('user_orders')
export class UserOrder {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.userOrders)
    user: User;

    @ManyToOne(() => Order, (order) => order.userOrders)
    order: Order;
}

