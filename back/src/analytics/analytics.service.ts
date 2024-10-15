import { Injectable } from '@nestjs/common';
import { Analytics } from './entities/analytics.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveAnalyticsDto } from './dto/analytics.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Analytics)
    private analyticsRepository: Repository<Analytics>,
  ) {}

  async saveAnalytics(batchData: SaveAnalyticsDto[]) {
    try {
      const savedData: Analytics[] = [];
      for (const data of batchData) {
        const createData = this.analyticsRepository.create({
          ...data,
          created_at: new Date(data.created_at),
        });
        savedData.push(await this.analyticsRepository.save(createData));
      }
      if (savedData.length === batchData.length) {
        return { success: 1 };
      }
    } catch (e: any) {
      console.log(e.message);
      return { success: 0 };
    }
  }

  //   DEPRECATED

  //   async getAnalyticsByKey(
  //     key: string,
  //     pagination: { page: number; limit: number },
  //   ) {
  //     const { page = 1, limit = 10 } = pagination;
  //     const skip = (page - 1) * limit;
  //     const [result, total] = await this.analyticsRepository.findAndCount({
  //       where: { key },
  //       skip,
  //       take: limit,
  //     });

  //     return {
  //       data: result,
  //       pagination: {
  //         page,
  //         perPage: limit,
  //         count: total,
  //         totalPages: Math.ceil(total / limit),
  //       },
  //     };
  //   }
}
