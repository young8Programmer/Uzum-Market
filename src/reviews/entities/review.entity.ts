<<<<<<< HEAD
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
=======
import { Product } from "src/products/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
>>>>>>> ef4906bce037dab6c35425be78456a0dbd011076

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
<<<<<<< HEAD
  product_id: number;

  @Column()
  user_id: number;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  review_date: Date;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product;
=======
  rating: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  review_date: Date;

  @ManyToOne(() => User, user => user.reviews, { onDelete: 'CASCADE' })
  user: User; 

  @ManyToOne(() => Product, product => product.reviews, { onDelete: 'CASCADE' })
  product: Product; 
>>>>>>> ef4906bce037dab6c35425be78456a0dbd011076
}
