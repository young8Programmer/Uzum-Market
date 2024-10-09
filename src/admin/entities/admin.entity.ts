import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity'; // User entitetini import qilish

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.admins)
  user: User;

  @Column('json')
  permissions: string[];
}
