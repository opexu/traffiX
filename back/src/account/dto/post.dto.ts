import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  text?: string;

  @IsString()
  x_author: string;
}
