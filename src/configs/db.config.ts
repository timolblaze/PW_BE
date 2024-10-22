import mongoose from 'mongoose';
import { logger } from '@utils'
import { mongoUri, dbName } from './environment.config'

export default (function database() {
  const startdb = async () => {
    try {
      mongoose.set('strictQuery', false);
      await mongoose.connect(mongoUri, { dbName })
      logger.info('Successfully connected to zha database...');
    } catch (err) {
      logger.error('There was an error connecting to zha database:', err);
      logger.info('Reconnecting to database...');
      startdb();
    }
  };

  startdb();
});