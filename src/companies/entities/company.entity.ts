import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
