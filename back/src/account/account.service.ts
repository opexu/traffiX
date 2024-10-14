import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import { join } from 'path';
import { CreatePostDto } from './dto/post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
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
          account.price = row['price'];
          accounts.push(account);
        })
        .on('end', async () => {
          await this.accountRepository.save(accounts, { reload: true });
          resolve();
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }
  async findAll(
    page: number,
    limit: number,
    sid?: string,
    order?: {
      priceOrder?: 'ASC' | 'DESC' | undefined;
      viewsOrder?: 'ASC' | 'DESC' | undefined;
    },
  ) {
    if (sid && !order) {
      return this.findAllWithRandomization(sid, page, limit);
    }

    const { priceOrder, viewsOrder } = order;
    const sourceStr = 'select * from account a ';
    let selectStr = sourceStr;
    if (priceOrder) {
      selectStr = orderBy(selectStr, 'a.price', priceOrder);
      if (viewsOrder)
        selectStr = addOrderBy(selectStr, 'a.average_views', viewsOrder);
    } else if (viewsOrder) {
      selectStr = orderBy(selectStr, 'a.average_views', viewsOrder);
      if (priceOrder) selectStr = addOrderBy(selectStr, 'a.price', priceOrder);
    }
    const countStr = sourceStr.replace('*', 'count(*)');

    selectStr = addLimit(selectStr, limit);
    selectStr = addOffset(selectStr, (page - 1) * limit);
    function orderBy(
      source: string,
      key: string,
      order: 'ASC' | 'DESC' | undefined,
    ) {
      return source + 'order by ' + key + ' ' + order + ' ';
    }
    function addOrderBy(
      source: string,
      key: string,
      order: 'ASC' | 'DESC' | undefined,
    ) {
      return source + ', ' + key + ' ' + order + ' ';
    }
    function addLimit(source: string, limit: number) {
      return source + 'limit ' + limit + ' ';
    }
    function addOffset(source: string, offset: number) {
      return source + 'offset ' + offset + ' ';
    }

    const [{ count }, result] = await Promise.all([
      this.accountRepository.query(countStr),
      this.accountRepository.query(selectStr),
    ]);

    return {
      data: result,
      pagination: {
        page,
        perPage: limit,
        count,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async findAllWithRandomization(sid: string, page: number, limit: number) {
    const offset = (page - 1) * limit;

    const result: Account[] = await this.accountRepository.query(
      `SELECT * 
       FROM account 
       ORDER BY MOD(CAST('0x' || substring(md5(CAST($1 AS text) || id::text) FOR 8) AS bigint), 1000000000)
       LIMIT $2 OFFSET $3`,
      [sid, limit, offset],
    );

    const total = await this.accountRepository.count();

    return {
      data: result,
      pagination: {
        page,
        perPage: limit,
        count: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async uploadImage(file: Express.Multer.File) {
    try {
      const uploadPath = join(
        __dirname,
        '..',
        '..',
        '..',
        process.env.IMGS_PATH,
      );
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      if (file) {
        const filePath = join(uploadPath, file.filename);
        fs.writeFileSync(filePath, file.buffer);
        return filePath;
      }
      return 'No file';
    } catch (error) {
      console.error('Upload file error:', error);
      throw new InternalServerErrorException('Upload file error');
    }
  }

  async createPost(createPostDto: CreatePostDto, file?: Express.Multer.File) {
    const filePath = await this.uploadImage(file);
    const post = this.postRepository.create({
      text: createPostDto.text ?? '',
      x_author: createPostDto.x_author,
      image_url: filePath,
    });
    return this.postRepository.save(post, { reload: true });
  }

  async addConfig(file: Express.Multer.File) {
    const uploadPath = join(
      __dirname,
      '..',
      '..',
      '..',
      process.env.CONFIG_PATH,
    );
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    const filePath = join(uploadPath, file.originalname);
    if (fs.existsSync(filePath)) {
      fs.rmSync(filePath);
    }
    fs.writeFileSync(filePath, file.buffer);
    return filePath;
  }
}
