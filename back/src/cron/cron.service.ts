import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  Connection,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
} from '@solana/web3.js';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  private connection: Connection;
  private refundTasks: Array<{
    from: string;
    amount: number;
    wallet: Keypair;
    scheduledAt: Date;
  }> = [];

  constructor(private schedulerRegistry: SchedulerRegistry) {
    const rpcUrl = 'https://api.devnet.solana.com';
    this.connection = new Connection(rpcUrl, 'confirmed');
  }

  scheduleRefund(from: string, amount: number, wallet: Keypair) {
    const scheduledAt = new Date();
    this.refundTasks.push({ from, amount, wallet, scheduledAt });
    this.logger.log(
      `Scheduled refund of ${amount / LAMPORTS_PER_SOL} SOL to ${from} in 1 hour.`,
    );
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async processRefunds() {
    const now = new Date();

    for (const task of this.refundTasks) {
      const diffInMs = now.getTime() - task.scheduledAt.getTime();
      const diffInHours = diffInMs / (1000 * 60); //* 60);

      if (diffInHours >= 1) {
        this.logger.log(
          `Processing refund to ${task.from} of ${task.amount / LAMPORTS_PER_SOL} SOL`,
        );
        await this.sendSolBack(task.from, task.amount, task.wallet);
        this.refundTasks = this.refundTasks.filter((t) => t !== task);
      }
    }
  }

  async sendSolBack(receiver: string, amount: number, wallet: Keypair) {
    const receiverPubkey = new PublicKey(receiver);

    const instruction = SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: receiverPubkey,
      lamports: amount,
    });

    const transactionData = new Transaction().add(instruction);

    const signedTransaction = await sendAndConfirmTransaction(
      this.connection,
      transactionData,
      [wallet],
    );

    this.logger.log(
      `Sent ${amount / LAMPORTS_PER_SOL} SOL back to ${receiver}. Transaction signature: ${signedTransaction}`,
    );
  }
}
