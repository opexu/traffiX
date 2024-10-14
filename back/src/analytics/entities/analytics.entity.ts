import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Analytics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user: string;

  @Column()
  key: string;

  @Column('jsonb', { nullable: true })
  data: any;
}
