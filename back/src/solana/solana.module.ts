import { Module } from '@nestjs/common';
import { SolanaService } from './solana.service';
import { SolanaController } from './solana.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from 'src/cron/cron.module';
import { SolanaTransactionParser } from './solana.parser';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [ScheduleModule.forRoot(), CronModule, TransactionModule],
  providers: [SolanaService, SolanaTransactionParser],
  controllers: [SolanaController],
})
export class SolanaModule {}
