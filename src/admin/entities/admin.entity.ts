import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.admins)
  user: User;
  @Column()
  userId: number;

  @Column('json')
  permissions: string[];
}
