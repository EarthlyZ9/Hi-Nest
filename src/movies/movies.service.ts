import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    // @Req() req, @Res() res -> access to underlying express app :not a good practice
    return this.movies;
  }

  getById(id: number): Movie {
    const movie = this.movies.find((m) => m.id == id);
    if (!movie)
      throw new NotFoundException('Movie with the provided id does not exist');
    return movie;
  }

  deleteById(id: number): void {
    this.getById(id);
    this.movies = this.movies.filter((m) => m.id !== +id);
  }

  create(movieData: CreateMovieDto): Movie {
    const newMovie: Movie = CreateMovieDto.toEntity(
      this.movies.length + 1,
      movieData,
    );
    this.movies.push(newMovie);
    return newMovie;
  }

  updateById(id: number, updateData: UpdateMovieDto): Movie {
    const target: Movie = this.getById(id);
    this.deleteById(id);
    if (updateData.hasOwnProperty('title')) target.title = updateData.title;
    if (updateData.hasOwnProperty('year')) target.year = updateData.year;
    if (updateData.hasOwnProperty('genres')) target.genres = updateData.genres;
    this.movies.push(target);
    return target;
  }
}
