import {
  Controller,
  Get,
  Query,
  Post,
  Session,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/post.dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('import')
  async importData() {
    const filePath = join(__dirname, '..', '..', 'user_data.csv');
    await this.accountService.parseAndSaveFromFile(filePath);
    return { message: 'Data imported successfully' };
  }
  //DEPRECATED
  //   @Post('upload')
  //   @UseInterceptors(FileInterceptor('file'))
  //   async uploadImage(@UploadedFile() file: Express.Multer.File) {
  //     return this.accountService.uploadImage(file);
  //   }

  @Post('post/create')
  @UseInterceptors(FileInterceptor('file'))
  async createPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.accountService.createPost(createPostDto, file);
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
