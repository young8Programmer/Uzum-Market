import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  refreshToken: string; // Foydalanuvchi uchun refresh token

  @Column()
  accessToken: string; // Foydalanuvchi uchun access token
}
