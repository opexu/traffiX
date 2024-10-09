import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  amount: string;

  @Column('decimal', { default: 0 })
  amount_sol: string;

  @Column()
  blockTime: number;

  @Column()
  recentBlockhash: string;

  @Column()
  type: string;

  @Column()
  fee: number;

  @Column('decimal', { default: 0 })
  fee_sol: number;

  @Column({ default: 'received' })
  status: StatusType;

  @BeforeInsert()
  setSolValues() {
    this.amount_sol = (Number(this.amount) / LAMPORTS_PER_SOL).toString();

    this.fee_sol = this.fee / LAMPORTS_PER_SOL;
  }
}

export enum StatusType {
  RECEIVED = 'received',
  SCHEDULED = 'scheduled',
  PROCESSING = 'processing',
  REFUNDED = 'refunded',
}
