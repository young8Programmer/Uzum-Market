import { Product } from "src/products/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  review_date: Date;

  @ManyToOne(() => User, user => user.reviews, { onDelete: 'CASCADE' })
  user: User; 

  @ManyToOne(() => Product, product => product.reviews, { onDelete: 'CASCADE' })
  product: Product; 
}
