import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Analytics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user: string;

  @Column()
  key: string;

  @Column()
  created_at: Date;

  @Column('jsonb', { nullable: true })
  data?: any;
}
