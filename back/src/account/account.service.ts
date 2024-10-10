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
          account.price = parseFloat(row['price']);
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
      pagination: {
        page,
        perPage: limit,
        count: total,
        totalPages: Math.ceil(total / limit),
      }
    };
  }

  async findAllWithRandomization(sid: string, page: number, limit: number) {
    const offset = (page - 1) * limit;
    const [ result, total ] = await Promise.all([
        this.accountRepository.query(
            // ES variant
            //   `SELECT * 
            //    FROM account 
            //    ORDER BY MOD(CAST('0x' || substring(md5(CAST($1 AS text) || id::text) FOR 8) AS bigint), 1000000000)
            //    LIMIT $2 OFFSET $3`,
            //   [sid, limit, offset],
            
            // MT variant
                `select * from account a order by md5( $1 || id::text)
                    limit $2 offset $3;`,
                [sid, limit, offset]
            ),
        this.accountRepository.count()
    ])
    
    return {
      data: result,
      pagination: {
          page,
          perPage: limit,
          count: total,
          totalPages: Math.ceil(total / limit),
      }
    };
  }

  async uploadImage(file: Express.Multer.File) {
    try {
      const uploadPath = join(__dirname, '..', '..', '..', process.env.IMGS_PATH);
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
    const postData = {
      text: createPostDto.text,
      x_author: createPostDto.x_author,
      image_url: filePath,
    };
    return this.postRepository.save(postData, { reload: true });
  }
}
