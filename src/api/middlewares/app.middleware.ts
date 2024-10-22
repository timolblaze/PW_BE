import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import appError from './error.middleware';
import appRoute from '@routes/app.route';

// import { corsConfig, morganConfig } from '../../configs';

export default (app: Application) => {
  app.use(morgan('combined'));
  app.use(cors());
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  appRoute(app);
  app.use(appError);
};