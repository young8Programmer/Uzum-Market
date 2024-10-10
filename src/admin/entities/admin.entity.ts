
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  userId: number;

  @Column('json')
  permissions: string[];

  @ManyToOne(() => User, user => user.admins)
  @JoinColumn({ name: 'userId' })
  user: User;
}
