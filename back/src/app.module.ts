import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SolanaModule } from './solana/solana.module';
import { CronModule } from './cron/cron.module';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    SolanaModule,
    CronModule,
    ConfigModule.forRoot(),
    AccountModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'traffix',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
