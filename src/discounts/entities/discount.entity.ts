import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('discounts')
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  discount_percent: number;

  @Column({ type: 'date' })
  valid_until: Date;
}
