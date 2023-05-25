import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    // const newMovie = service.create({
    //   title: 'Test movie',
    //   year: 2023,
    //   genres: ['action'],
    // });

    service = module.get<MoviesService>(MoviesService);
  });

  afterAll(() => {
    // clear database
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Get all movies', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('Get movie by id', () => {
    it('should return a movie', () => {
      const testMovie: Movie = service.create({
        title: 'Test movie',
        year: 2023,
        genres: ['action'],
      });

      const movie = service.getById(1);
      expect(movie.id).toEqual(testMovie.id);
      expect(movie).toBeDefined();
    });

    it('should throw 404 error', () => {
      try {
        service.getById(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with the provided id does not exist');
      }
    });
  });

  describe('Delete movie by id', () => {
    it('should delete a movie', () => {
      service.create({
        title: 'Test movie',
        year: 2023,
        genres: ['action'],
      });

      service.deleteById(1);
      const allMovies = service.getAll();
      expect(allMovies.length).toEqual(0);
    });

    it('should throw 404 error', () => {
      try {
        service.deleteById(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Create a movie', () => {
    it('should create a movie', () => {
      const newMovie = service.create({
        title: 'Test movie',
        year: 2023,
        genres: ['action'],
      });
      const allMovies = service.getAll();
      expect(allMovies.length).toEqual(1);
      const targetMovie = service.getById(1);
      expect(newMovie.id).toEqual(targetMovie.id);
    });

    it('should throw 400 error', () => {
      try {
        service.create({
          title: '',
          year: 2023,
          genres: ['action'],
        });
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('Update movie by id', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test movie',
        year: 2023,
        genres: ['action'],
      });
      service.updateById(1, { title: 'Updated title' });
      const movie = service.getById(1);
      expect(movie.title).toEqual('Updated title');
    });

    it('should throw 404 error', () => {
      try {
        service.updateById(999, { title: 'Updated title' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
