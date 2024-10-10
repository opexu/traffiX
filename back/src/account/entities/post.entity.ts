import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {

  // TODO uuid
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  x_author: string;

  @Column()
  text: string;

  @Column()
  image_url: string;
}
