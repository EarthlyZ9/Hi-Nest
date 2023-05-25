import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('MovieController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true, // url param string -> number
      }),
    );
    await app.init();
  });

  describe('/movies', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(HttpStatus.OK)
        .expect([]);
    });

    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'Test', year: 2000, genres: ['action'] })
        .expect(HttpStatus.CREATED);
    });

    it('DELETE 404', () => {
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(HttpStatus.NOT_FOUND);
    });

    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: '', year: 2000, genres: ['action'] })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/movies/:id', () => {
    // it.todo('GET');
    // it.todo('DELETE');
    // it.todo('PATCH');

    it('GET 200', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(HttpStatus.OK);
    });

    it('GET 404', () => {
      return request(app.getHttpServer())
        .get('/movies/999')
        .expect(HttpStatus.NOT_FOUND);
    });

    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Updated title' })
        .expect(HttpStatus.OK);
    });

    it('DELETE 204', () => {
      return request(app.getHttpServer())
        .delete('/movies/1')
        .expect(HttpStatus.NO_CONTENT);
    });
  });
});
