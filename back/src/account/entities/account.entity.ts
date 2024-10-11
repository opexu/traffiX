import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  followers_number: number;

  @Column()
  avatar_url: string;

  @Column()
  average_views: number;

  @Column('numeric')
  price: string;
}
