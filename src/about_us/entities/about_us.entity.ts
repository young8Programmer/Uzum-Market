import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AboutUs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  mission: string;

  @Column()
  values: string;

  @Column()
  history: string;

  @Column()
  team: string;

  @Column({ type: 'varchar' })
  photo: string;
}
