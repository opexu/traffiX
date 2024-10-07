import { Controller, Get, Query, Post, Session } from '@nestjs/common';
import { AccountService } from './account.service';
import { join } from 'path';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('import')
  async importData() {
    const filePath = join(__dirname, '..', '..', 'user_data.csv');
    await this.accountService.parseAndSaveFromFile(filePath);
    return { message: 'Data imported successfully' };
  }

  @Get()
  async getAll(
    @Session() session: Record<string, any>,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.accountService.findAll(page, limit, session.id);
  }
}