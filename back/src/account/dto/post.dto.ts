import { IsString } from 'class-validator';

export class CreatePostDto {
  // @IsString()
  text?: string;

  @IsString()
  x_author: string;
}
