import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
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
    orderBy?: string,
    priceFrom?: number,
    priceTo?: number,
  ) {
    if (!orderBy && sid) {
      return this.findAllWithRandomization(
        sid,
        page,
        limit,
        priceFrom,
        priceTo,
      );
    }

    const where: any = {};

    let priceFilter = {};
    if (priceFrom !== undefined && priceTo !== undefined) {
      priceFilter = { price: Between(priceFrom, priceTo) };
    } else if (priceFrom !== undefined) {
      priceFilter = { price: MoreThanOrEqual(priceFrom) };
    } else if (priceTo !== undefined) {
      priceFilter = { price: LessThanOrEqual(priceTo) };
    }

    let order: any = { average_views: 'DESC' };
    if (orderBy === 'views_asc') {
      order = { average_views: 'ASC' };
    } else if (orderBy === 'views_desc') {
      order = { average_views: 'DESC' };
    }

    const [result, total] = await this.accountRepository.findAndCount({
      where: { ...where, ...priceFilter },
      skip: (page - 1) * limit,
      take: limit,
      order,
    });

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

  async findAllWithRandomization(
    sid: string,
    page: number,
    limit: number,
    priceFrom?: number,
    priceTo?: number,
  ) {
    const offset = (page - 1) * limit;

    let priceFilter = '';
    if (priceFrom !== undefined) {
      priceFilter += ` AND price >= ${priceFrom}`;
    }
    if (priceTo !== undefined) {
      priceFilter += ` AND price <= ${priceTo}`;
    }

    const result: Account[] = await this.accountRepository.query(
      `SELECT * 
       FROM account 
       WHERE 1=1 ${priceFilter}
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
      const filePath = join(uploadPath, file.originalname);
      fs.writeFileSync(filePath, file.buffer);
      return filePath;
    } catch (error) {
      console.error('Upload file error:', error);
      throw new InternalServerErrorException('Upload file error');
    }
  }

  async createPost(createPostDto: CreatePostDto, file: Express.Multer.File) {
    const filePath = await this.uploadImage(file);
    const post = this.postRepository.create({
      text: createPostDto.text,
      x_author: createPostDto.x_author,
      image_url: filePath,
    });
    return this.postRepository.save(post, { reload: true });
  }
}
