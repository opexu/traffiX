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
import { Account } from './entities/account.entity';
import { Post as PostEntity } from './entities/post.entity';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('import')
  async importData(
    @Query('password') password: string,
  ): Promise<{ message: string }> {
    if (password !== process.env.CONFIG_PASSWORD) {
      return { message: 'Wrong Psssword' };
    }
    const filePath = join(
      __dirname,
      '..',
      '..',
      '..',
      process.env.CONFIG_PATH,
      'user_data.csv',
    );
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
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<PostEntity> {
    return this.accountService.createPost(createPostDto, file);
  }

  @Post('config/add')
  @UseInterceptors(FileInterceptor('file'))
  async addConfig(
    @UploadedFile() file: Express.Multer.File,
    @Query('password') password: string,
  ): Promise<string> {
    if (password !== process.env.CONFIG_PASSWORD) {
      return 'Wrong Password';
    }
    return this.accountService.addConfig(file);
  }

  @Get()
  async getAll(
    @Session() session: Record<string, any>,
    @Query() pagination?: { page: number; limit: number },
    @Query('price_order') priceOrder?: 'ASC' | 'DESC' | undefined,
    @Query('views_order') viewsOrder?: 'ASC' | 'DESC' | undefined,
  ): Promise<{
    data: Account[];
    pagination: {
      page: number;
      perPage: number;
      count: number;
      totalPages: number;
    };
  }> {
    const order = {};
    if (priceOrder) order['priceOrder'] = priceOrder;
    if (viewsOrder) order['viewsOrder'] = viewsOrder;
    return this.accountService.findAll(
      pagination,
      session.id,
      priceOrder || viewsOrder ? order : undefined,
    );
  }
}
