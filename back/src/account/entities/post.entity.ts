import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  x_author: string;

  @Column()
  text: string;

  @Column()
  image_url: string;
}
