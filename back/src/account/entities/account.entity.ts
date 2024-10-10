import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {

  // TODO uuid
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  followers_number: number;

  @Column()
  avatar_url: string;

  @Column()
  average_views: number;

  @Column('decimal')
  price: number;
}
