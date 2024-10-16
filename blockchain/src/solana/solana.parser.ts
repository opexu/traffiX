import { Injectable, Logger } from '@nestjs/common';
import {
  Connection,
  ParsedInstruction,
  ParsedTransactionWithMeta,
  PublicKey,
} from '@solana/web3.js';
import { TransactionService } from 'src/transaction/transaction.service';

@Injectable()
export class SolanaTransactionParser {
  private readonly logger = new Logger(SolanaTransactionParser.name);
  private connection: Connection;

  constructor(private readonly transactionService: TransactionService) {
    const rpcUrl = process.env.RPC_URL;
    this.connection = new Connection(rpcUrl, 'confirmed');
  }

  async parseTransaction(signature: string, publicKey: PublicKey) {
    const parsedTransaction: ParsedTransactionWithMeta =
      await this.connection.getParsedTransaction(signature);

    if (!parsedTransaction) {
      this.logger.error(`Transaction not found: ${signature}`);
      return null;
    }

    const instructions = parsedTransaction.transaction.message.instructions;
    const err = parsedTransaction.meta.err;

    if (err) {
      this.logger.warn(err);
      return null;
    }
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
          // Save transaction to db
          const transactionToSave =
            await this.transactionService.createTransaction({
              blockTime: parsedTransaction.blockTime,
              recentBlockhash:
                parsedTransaction.transaction.message.recentBlockhash,
              type: parsedInstruction.type,
              fee: parsedTransaction.meta.fee,
              from,
              to,
              amount,
            });
          const tx =
            await this.transactionService.saveTransaction(transactionToSave);
          //-------------------------
          return tx;
        }
      }
    }
    return null;
  }
}
// {
//     blockTime: 1728486085,
//     meta: {
//       computeUnitsConsumed: 450,
//       err: null,
//       fee: 15000,
//       innerInstructions: [],
//       loadedAddresses: { readonly: [], writable: [] },
//       logMessages: [
//         'Program ComputeBudget111111111111111111111111111111 invoke [1]',
//         'Program ComputeBudget111111111111111111111111111111 success',
//         'Program ComputeBudget111111111111111111111111111111 invoke [1]',
//         'Program ComputeBudget111111111111111111111111111111 success',
//         'Program 11111111111111111111111111111111 invoke [1]',
//         'Program 11111111111111111111111111111111 success'
//       ],
//       postBalances: [ 2996145000, 2880320540, 1, 1 ],
//       postTokenBalances: [],
//       preBalances: [ 2996260000, 2880220540, 1, 1 ],
//       preTokenBalances: [],
//       rewards: [],
//       status: { Ok: null }
//     },
//     slot: 331731172,
//     transaction: {
//       message: Message {
//         header: [Object],
//         accountKeys: [Array],
//         recentBlockhash: 'B8WY48c88WMTaotGz6fWd9eJoEDUCZQoHzv4z14LUQoJ',
//         instructions: [Array],
//         indexToProgramIds: [Map]
//       },
//       signatures: [
//         '5WkikZbBD1N3THji9MvmBQKWYJZK3mQidFZGJmB8GxHfYqJSDCi9UAv6KXW4BrqNWEnwWTXaVKwJzvvPBwEvhp6P'
//       ]
//     }
//   }
//   {
//     parsed: {
//       info: {
//         destination: 'GY5CpB1L1BtCW9KANRKyb3jUnN9YguhinkTeCcxv5QEB',
//         lamports: 100000,
//         source: '2C9SshBRHbmfLtMMGfRmcfeQojrMYfjeDYfdV5KdkXrN'
//       },
//       type: 'transfer'
//     },
//     program: 'system',
//     programId: PublicKey [PublicKey(11111111111111111111111111111111)] {
//       _bn: <BN: 0>
//     },
//     stackHeight: null
//   }
