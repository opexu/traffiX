import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Connection } from '@solana/web3.js';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);
  private connection: Connection;

  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {
    const rpcUrl = process.env.RPC_URL;
    this.connection = new Connection(rpcUrl, 'confirmed');
  }

  async saveTransaction(transaction: Transaction) {
    return this.transactionRepository.save<Transaction>(transaction);
  }

  async createTransaction(transaction: DeepPartial<Transaction>) {
    return this.transactionRepository.create(transaction);
  }

  async updateTransaction(
    transactionId: number,
    data: DeepPartial<Transaction>,
  ) {
    return this.transactionRepository.update(transactionId, data);
  }
}
