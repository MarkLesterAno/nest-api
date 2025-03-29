import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let access_token: string;
  let refresh_token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  // it('/users (POST)', () => {
  //   const respons:any = request(app.getHttpServer())
  //     .post('/users')
  //     .send({
  //       email: 'test@test.com',
  //       username: 'testusers',
  //       password: 'password123',
  //       isActive: true,
  //       roles: []
  //     })
  //     .expect(201)
  //   return respons;
  // });

  // it('/auth/login (POST)', async () => {
  //   const response: any = await request(app.getHttpServer())
  //     .post('/auth/login')
  //     .send({
  //       username: 'testusers',
  //       password: 'password123',
  //     })
  //     .expect(201)
  //   access_token = response.body.access_token;
  //   refresh_token = response.body.refresh_token;
  //   return response;
  // });

  // it('/auth/refresh-token (POST)', async () => {
  //   const response: any = await request(app.getHttpServer())
  //     .post('/auth/refresh-token')
  //     .send({
  //       refresh_token: refresh_token
  //     })
  //     .expect(201)
  //   access_token = response.body.access_token;
  //   return response;
  // });

  // it('/users (GET)', async () => {
  //   const response: any = await request(app.getHttpServer())
  //     .get('/users')
  //     .set('Authorization', `Bearer ${access_token}`)
  //     .expect(200)
  //   return response;
  // });

  // it('/users/:id (GET)', async () => {
  //   const response: any = await request(app.getHttpServer())
  //     .get('/users')
  //     .set('Authorization', `Bearer ${access_token}`)
  //     .query({ id: '67d83af9f8272c19aa0e1983' })
  //     .expect(200)
  //   return response;
  // });

  // // it('/users (POST)', async () => {
  // //   const response: any = await request(app.getHttpServer())
  // //     .post('/users')
  // //     .set('Authorization', `Bearer ${access_token}`)
  // //     .send({
  // //       email: 'test2@test.com',
  // //       username: 'testusers2',
  // //       password: 'password123',
  // //       isActive: true,
  // //       roles: []
  // //     })
  // //     .expect(201)
  // //   return response;
  // // });

  // it('/users/:id (PUT)', async () => {
  //   const response: any = await request(app.getHttpServer())
  //     .put('/users')
  //     .set('Authorization', `Bearer ${access_token}`)
  //     .query({ id: '67d83af9f8272c19aa0e1983' })
  //     .send({
  //       email: 'test2@test.com',
  //       username: 'testusers3',
  //       password: 'password123',
  //       isActive: true,
  //       roles: []
  //     })
  //     .expect(201)
  //   console.log(response)
  //   return response;
  // });

  // it('/users/:id (PATCH)', async () => {
  //   const response = await request(app.getHttpServer())
  //     .put('/users')
  //     .set('Authorization', `Bearer ${access_token}`)
  //     .query({ id: '67d83af9f8272c19aa0e1983' })
  //     .send({
  //       email: 'test2@test.com',
  //       username: 'testusers3',
  //       password: 'password123',
  //       isActive: true,
  //       roles: []
  //     })
  //     .expect(201)
  //   console.log(response)
  //   return response;
  // });
});





