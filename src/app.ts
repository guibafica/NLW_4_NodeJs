/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import 'reflect-metadata';
import express from 'express';

import { router } from './routes';

import createConnection from './database';

createConnection();

const app = express();

app.use(express.json());
app.use(router);

export { app };
