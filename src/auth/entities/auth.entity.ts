import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ length: 500 })
  refreshToken: string;

  @Column({ length: 500 })
  accessToken: string;
}
