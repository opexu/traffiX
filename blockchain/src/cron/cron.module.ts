import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [TransactionModule],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}
