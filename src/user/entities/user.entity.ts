import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column({
    type: 'enum',
    enum: ['user', 'admin', 'store_owner', 'manager'],
  })
  role: string;
}
