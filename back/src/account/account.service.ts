import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async parseAndSaveFromFile(filePath: string): Promise<void> {
    const accounts: Account[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
          const account = new Account();
          account.name = row['name'];
          account.avatar_url = row['avatar_url'];
          account.followers_number = parseInt(row['followers_number']);
          account.average_views = parseInt(row['average_views']);
          account.price = parseFloat(row['price']);
          accounts.push(account);
        })
        .on('end', async () => {
          await this.accountRepository.save(accounts);
          resolve();
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }
  async findAll(page: number, limit: number, sid?: string) {
    if (sid) {
      return this.findAllWithRandomization(sid, page, limit);
    }
    const [result, total] = await this.accountRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { average_views: 'DESC' },
    });

    return {
      data: result,
      count: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findAllWithRandomization(sid: string, page: number, limit: number) {
    const offset = (page - 1) * limit;
    const total = await this.accountRepository.count();
    const result: Account[] = await this.accountRepository.query(
      `SELECT * 
       FROM account 
       ORDER BY MOD(CAST('0x' || substring(md5(CAST($1 AS text) || id::text) FOR 8) AS bigint), 1000000000)
       LIMIT $2 OFFSET $3`,
      [sid, limit, offset],
    );
    return {
      data: result,
      count: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
