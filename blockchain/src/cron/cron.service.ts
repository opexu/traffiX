import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Connection,
  sendAndConfirmTransaction,
  Transaction,
} from '@solana/web3.js';
import {
  StatusType,
  Transaction as TransactionEntity,
} from 'src/transaction/entities/transaction.entity';
import { TransactionService } from 'src/transaction/transaction.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  private connection: Connection;
  private refundTasks: Array<{
    transaction: TransactionEntity;
    wallet: Keypair;
    scheduledAt: Date;
  }> = [];

  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private transactionService: TransactionService,
  ) {
    const rpcUrl = process.env.RPC_URL;
    this.connection = new Connection(rpcUrl, 'confirmed');
  }

  async scheduleRefund(transaction: TransactionEntity, wallet: Keypair) {
    const scheduledAt = new Date();
    this.refundTasks.push({ transaction, wallet, scheduledAt });
    await this.transactionService.updateTransaction(transaction.id, {
      status: StatusType.SCHEDULED,
    });
    // this.logger.log(
    //   `Scheduled refund of ${BigInt(transaction.amount) / BigInt(LAMPORTS_PER_SOL)} SOL to ${transaction.from} in 1 hour.`,
    // );
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async processRefunds() {
    const now = new Date();

    for (const task of this.refundTasks) {
      if (task.transaction.status === StatusType.PROCESSING) {
        continue;
      }
      const diffInMs = now.getTime() - task.scheduledAt.getTime();
      // const diffInHours = diffInMs / (1000 * 60 * 60);
      const diffInMins = diffInMs / (1000 * 60);

      if (diffInMins >= 10) {
        // if (diffInHours >= 1) {
        await this.transactionService.updateTransaction(task.transaction.id, {
          status: StatusType.PROCESSING,
        });
        // this.logger.log(
        //   `Processing refund to ${task.transaction.from} of ${BigInt(task.transaction.amount) / BigInt(LAMPORTS_PER_SOL)} SOL`,
        // );
        await this.sendSolBack(task.transaction, task.wallet);
        this.refundTasks = this.refundTasks.filter((t) => t !== task);
      }
    }
  }

  async sendSolBack(transaction: TransactionEntity, wallet: Keypair) {
    const receiverPubkey = new PublicKey(transaction.from);

    const instruction = SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: receiverPubkey,
      lamports: BigInt(transaction.amount),
    });

    const transactionData = new Transaction().add(instruction);

    await sendAndConfirmTransaction(this.connection, transactionData, [wallet]);
    await this.transactionService.updateTransaction(transaction.id, {
      status: StatusType.REFUNDED,
    });
    // this.logger.log(
    //   `Sent ${BigInt(transaction.amount) / BigInt(LAMPORTS_PER_SOL)} SOL back to ${transaction.from}. Transaction signature: ${signedTransaction}`,
    // );
  }
}
