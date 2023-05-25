import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

// install @nestjs/mapped-types
export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  // @IsString
  // readonly title?: string;
  //
  // @IsNumber
  // readonly year?: number;
  //
  // @IsString({ each: true })
  // readonly genre?: string[];
}
