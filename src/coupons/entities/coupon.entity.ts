import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  code: number;

  @Column({ type: 'float' })
  discount_percent: number;

  @Column({ type: 'timestamp' })
  valid_until: Date;
}
