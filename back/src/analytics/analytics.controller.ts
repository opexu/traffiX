import { Body, Controller, Post } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { SaveAnalyticsDto } from './dto/analytics.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  //DEPRECATED
  //   @Get('/get/:key')
  //   async getAnalyticsByKey(
  //     @Param('key') key: string,
  //     @Query() pagination?: { page: number; limit: number },
  //   ): Promise<{
  //     data: Analytics[];
  //     pagination: {
  //       page: number;
  //       perPage: number;
  //       count: number;
  //       totalPages: number;
  //     };
  //   }> {
  //     return this.analyticsService.getAnalyticsByKey(key, pagination);
  //   }

  @Post('/save')
  async saveAnalytics(@Body() saveAnalytics: SaveAnalyticsDto[]): Promise<{
    success: number;
  }> {
    return this.analyticsService.saveAnalytics(saveAnalytics);
  }
}
