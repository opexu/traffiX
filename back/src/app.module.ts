import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SolanaModule } from './solana/solana.module';
import { CronModule } from './cron/cron.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SolanaModule, CronModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
