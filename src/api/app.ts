import express from 'express';
import { mainMiddleware } from './middlewares';

const app = express();

mainMiddleware(app);

export default app;