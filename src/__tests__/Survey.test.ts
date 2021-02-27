/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import request from 'supertest';

import { app } from '../app';

import createConnection from '../database';

describe('Surveys', () => {
  beforeAll(async () => {
    const connection = await createConnection();

    await connection.runMigrations();
  });

  it('Should be able to create a new Survey', async () => {
    const response = await request(app).post('/surveys').send({
      title: 'Title example',
      description: 'Description example',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('Should be able to get all Survey', async () => {
    await request(app).post('/surveys').send({
      title: 'Title example2',
      description: 'Description example2',
    });

    const response = await request(app).get('/surveys');

    expect(response.body.length).toBe(2);
  });
});
