import { isValidObjectId } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { logger } from ".";

export const checkMongooseId = (id: string, helpers: any): string => {
  if (!isValidObjectId(id)) {
    logger.error("Invalid Object Id");
    return helpers.error("Invalid Object Id");
  }

  return id;
}

export const generateUniqueId = () => {
  return uuidv4()
}