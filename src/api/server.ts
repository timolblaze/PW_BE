import 'express-async-errors';
import app from './app';
import './wakey';

import { port, startDatabase } from '@configs';
import { logger } from './utils';

app.listen(port, () => {
  startDatabase()
  logger.info(`listening on port ${port}`)
})