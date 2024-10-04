import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
  IsNumber,
  IsDateString,
  IsString,
  IsPositive,
  Min,
  IsNotEmpty,
} from 'class-validator';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @Column({ type: 'date' })
  @IsNotEmpty()
  @IsDateString()
  order_data: Date;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  @IsString()
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(0)
  total_amount: number;
}
