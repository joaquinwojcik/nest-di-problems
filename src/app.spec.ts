import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { randomUUID } from 'crypto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('test bbva', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/accounts')
      .set('x-tenant', '9b7c5221-481d-4c8b-9705-aa9577c04fda')
      .set('x-amzn-trace-id', randomUUID())
      .send({ name: 'John' });

    expect(response.status).toBe(201);
    expect(response.body).toBe('Fake bbva account created for John');
  });

  it('test santander', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/accounts')
      .set('x-tenant', 'ab92f370-7a75-43da-96e4-0cb8aee4050c')
      .set('x-amzn-trace-id', randomUUID())
      .send({ name: 'Jim' });

    expect(response.status).toBe(201);
    expect(response.body).toBe('Fake santander account created for Jim');
  });
});
