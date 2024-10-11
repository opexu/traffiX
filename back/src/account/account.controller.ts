import {
  Controller,
  Get,
  Query,
  Post,
  Session,
  UploadedFile,
  UseInterceptors,
  Body,
  ParseIntPipe,
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
  async importData(): Promise<{ message: string }> {
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
  ): Promise<PostEntity> {
    return this.accountService.createPost(createPostDto, file);
  }

  @Get()
  async getAll(
    @Session() session: Record<string, any>,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('price_order') priceOrder?: "ASC" | "DESC" | undefined,
    @Query('views_order') viewsOrder?: "ASC" | "DESC" | undefined,
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
    if( priceOrder ) order['priceOrder'] = priceOrder;
    if( viewsOrder ) order['viewsOrder'] = viewsOrder;
    return this.accountService.findAll(
      page,
      limit,
      session.id,
      priceOrder || viewsOrder ? order : undefined
    );
  }
}
