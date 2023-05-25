import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Movie } from '../entities/movie.entity';
import { plainToClass } from 'class-transformer';

export class CreateMovieDto {
  // check this out: https://github.com/typestack/class-validator
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsString({ each: true })
  @IsOptional()
  readonly genres: string[];

  static toEntity(id: number, dto: CreateMovieDto) {
    const entity: Movie = plainToClass(Movie, dto);
    entity.id = id;
    return entity;
  }
}
