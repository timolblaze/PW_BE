import mongoose from 'mongoose';
import { logger } from '@utils'
import { DB_URI, DB_NAME as dbName, NODE_ENV } from './environment.config'

const isDevelopment = NODE_ENV === 'development';

export default (function database() {
  const startdb = async () => {
    try {
      logger.info('Connecting to zha database 😁');
      // mongoose.set('autoIndex', isDevelopment);
      // console.log('autoIndex:', mongoose.get('autoIndex'));

      mongoose.set('strictQuery', false);

      await mongoose.connect(DB_URI, { dbName })

      logger.info('Successfully connected to zha database 🎉!');
    } catch (err: any) {
      logger.error(`${err.name}: ${err.message}, and as a result database connection failed 🥲`);
      logger.info('Please wait while we attempt to reconnect 😰');
      setTimeout(startdb, 5000);
    }
  };

  startdb();
});