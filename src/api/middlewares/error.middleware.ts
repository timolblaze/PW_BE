import { Request, Response, NextFunction } from "express";
import { logger, sendResponse } from "@utils";
import { AppError } from "@services/error.service";

export default (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = {
    name: error.name,
    stack: error.stack,
    details: (error as any).details?.[0]
  }

  const statusCode = error.name === "ValidationError" ? 422 : error?.statusCode || 500

  logger.error({ errorDetails: data });
  
  return sendResponse(res, statusCode, false, error.message, data)
};