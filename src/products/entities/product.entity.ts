import { OrderItem } from "src/order_items/entities/order_item.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";




@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;
    
    @Column("decimal")
    price: number;
    
    @Column()
    stock_quantity: number;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => OrderItem, orderItem => orderItem.product)
    orderItems: OrderItem[]; 
}
