import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';

import { errorHandler } from './middlewares/errorHandler.js';
import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import { env } from './utils/env.js';

import router from './routers/index.js';

export const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  app.use(logger);

  app.use(router);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const port = Number(env('PORT', 3000));

  app.listen(port, () => console.log('Server running on 3000 PORT'))
}