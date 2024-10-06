import { Injectable, Logger } from '@nestjs/common';
import {
  Connection,
  ParsedInstruction,
  ParsedTransactionWithMeta,
  PublicKey,
} from '@solana/web3.js';

@Injectable()
export class SolanaTransactionParser {
  private readonly logger = new Logger(SolanaTransactionParser.name);
  private connection: Connection;

  constructor() {
    const rpcUrl = 'https://api.devnet.solana.com';
    this.connection = new Connection(rpcUrl, 'confirmed');
  }

  async parseTransaction(signature: string, publicKey: PublicKey) {
    const transaction: ParsedTransactionWithMeta =
      await this.connection.getParsedTransaction(signature);

    if (!transaction) {
      this.logger.error(`Transaction not found: ${signature}`);
      return null;
    }

    const instructions = transaction.transaction.message.instructions;

    for (const instruction of instructions) {
      if (instruction['parsed']) {
        const parsedInstruction = (instruction as ParsedInstruction).parsed;
        if (
          parsedInstruction.type === 'transfer' &&
          parsedInstruction.info.destination == publicKey.toBase58()
        ) {
          const amount = parsedInstruction.info.lamports;
          const from = parsedInstruction.info.source;
          const to = parsedInstruction.info.destination;
          return { from, to, amount };
        }
      }
    }
    return null;
  }
}
