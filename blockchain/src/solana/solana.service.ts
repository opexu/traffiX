import { Injectable, Logger } from '@nestjs/common';
import {
  Connection,
  PublicKey,
  Keypair,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import { SolanaTransactionParser } from './solana.parser';
import { CronService } from 'src/cron/cron.service';

@Injectable()
export class SolanaService {
  private readonly logger = new Logger(SolanaService.name);
  private connection: Connection;
  private wallet: Keypair;

  constructor(
    private readonly solanaTransactionParser: SolanaTransactionParser,
    private readonly cronService: CronService,
  ) {
    const rpcUrl = process.env.RPC_URL;
    this.connection = new Connection(rpcUrl, 'confirmed');

    const secretKey = Uint8Array.from(
      process.env.WALLET_PRIVATEKEY.split(', ').map((i) => parseInt(i)),
    );
    // Uint8Array.from([
    //   92, 73, 16, 220, 79, 147, 34, 90, 62, 154, 187, 195, 95, 56, 78, 221, 217,
    //   115, 65, 145, 103, 59, 5, 136, 117, 46, 83, 103, 230, 84, 154, 183, 230,
    //   213, 15, 229, 39, 206, 64, 148, 232, 237, 140, 226, 207, 184, 4, 123, 25,
    //   6, 169, 246, 167, 242, 194, 222, 211, 191, 252, 104, 154, 128, 78, 200,
    // ]);
    this.wallet = Keypair.fromSecretKey(secretKey);

    this.trackIncomingTransactions();
  }

  async trackIncomingTransactions() {
    const publicKey = this.wallet.publicKey;

    this.connection.onAccountChange(publicKey, async (accountInfo) => {
      const balance = accountInfo.lamports / LAMPORTS_PER_SOL;
      this.logger.log(`New balance detected: ${balance} SOL`);

      const latestSignature =
        await this.getLatestTransactionSignature(publicKey);
      if (latestSignature) {
        const parsedTransaction =
          await this.solanaTransactionParser.parseTransaction(
            latestSignature,
            publicKey,
          );

        if (parsedTransaction) {
          //   const { from, amount } = parsedTransaction;

          //   this.logger.log(
          //     `Transaction parsed: From ${from}, Amount: ${BigInt(amount) / BigInt(LAMPORTS_PER_SOL)} SOL`,
          //   );

          await this.cronService.scheduleRefund(parsedTransaction, this.wallet);
        }
      }
    });
  }

  async getLatestTransactionSignature(
    publicKey: PublicKey,
  ): Promise<string | null> {
    const transactions =
      await this.connection.getSignaturesForAddress(publicKey);
    if (transactions.length > 0) {
      return transactions[0].signature;
    }
    return null;
  }
}
