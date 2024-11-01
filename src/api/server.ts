import http from 'http'
import 'express-async-errors';
import './wakey';
import { PORT as port, startDatabase } from '@configs';
import { logger } from './utils';
import app from './app';

const server = http.createServer(app)

server.listen(port, () => {
  logger.info(`Server is listening for new requests on port ${port}...`)
  startDatabase()
})