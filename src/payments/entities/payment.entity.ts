import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
  IsNumber,
  IsDateString,
  IsString,
  IsPositive,
  IsNotEmpty,
} from 'class-validator';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  @IsNotEmpty()
  @IsNumber()
  order_id: number;

  @Column({ type: 'date' })
  @IsNotEmpty()
  @IsDateString()
  payment_date: Date;

  @Column({ type: 'float' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  @IsString()
  payment_method: string;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  @IsString()
  status: string;
}