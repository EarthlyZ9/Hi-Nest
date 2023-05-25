import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  search(@Query('title') searchingTitle: string) {
    return `Searching for the name: ${searchingTitle}`;
  }

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: number): Movie {
    return this.moviesService.getById(id);
  }

  @Post()
  createMovie(@Body() data: CreateMovieDto) {
    return this.moviesService.create(data);
  }

  @HttpCode(204)
  @Delete('/:id')
  deleteById(@Param('id') id: number) {
    this.moviesService.deleteById(id);
  }

  @Patch('/:id')
  updateById(@Param('id') id: number, @Body() data: UpdateMovieDto) {
    return this.moviesService.updateById(id, data);
  }
}
