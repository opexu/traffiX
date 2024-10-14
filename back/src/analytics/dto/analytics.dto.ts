import { IsJSON, IsOptional, IsString } from 'class-validator';

export class SaveAnalyticsDto {
  @IsString()
  user: string;

  @IsString()
  key: string;

  @IsOptional()
  @IsJSON({ message: 'Invalid analytics JSON Data' })
  data?: any;
}
