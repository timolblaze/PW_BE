import { Application } from 'express';
import { apiVersion } from '@configs'
import { serverController } from '@controllers';
import { authRouter, userRouter, uploadRouter, serverRouter, categoryRouter, productRouter, orderRouter } from '.';

export default (app: Application) => {
  app.use(`${apiVersion}/health`, serverController.checkHealth);
  app.use(`${apiVersion}/auth`, authRouter);
  app.use(`${apiVersion}/users`, userRouter);
  app.use(`${apiVersion}/categories`, categoryRouter);
  app.use(`${apiVersion}/products`, productRouter);
  app.use(`${apiVersion}/orders`, orderRouter);
  app.use(`${apiVersion}/files`, uploadRouter);
  app.use(serverRouter);
};