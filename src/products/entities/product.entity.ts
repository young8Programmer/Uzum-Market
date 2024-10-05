import { Category } from "src/categories/entities/category.entity";
import { OrderItem } from "src/order_items/entities/order_item.entity";
import { Review } from "src/reviews/entities/review.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";





@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

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
 
}
