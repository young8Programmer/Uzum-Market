
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, PrimaryGeneratedColumn, Unique, OneToMany } from "typeorm";

@Entity()
@Unique(['name'])
export class Category {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

   @OneToMany(() => Product, (product) => product.category) 
  products: Product[];
}
