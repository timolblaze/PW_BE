import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import {
  verifyToken,
  sendResponse
} from '@utils';
import { userService } from '@services'
import { IUser } from '@interfaces';

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeaders = req.header('Authorization');
  
  const accessToken = authHeaders &&
    authHeaders.substring(0, 7) === 'Bearer ' ? authHeaders.replace('Bearer ', '') : req.cookies?.accessToken;
  
  if (!accessToken) {
    return sendResponse(res, 403, false, 'Login to continue')
  }

  const decoded = <JwtPayload | string>await verifyToken(accessToken)

  if (decoded === 'expired') {
    return sendResponse(res, 403, false, 'Session expired. Sign in again to continue.')
  }

  if (decoded === 'invalid') {
    return sendResponse(res, 401, false, 'Invalid token.')
  }

  const user = await userService.findOne({ _id: (decoded as JwtPayload)._id });
  if (!user) {
    return sendResponse(res, 404, false, 'User not found')
  }

  req.user = user.toJSON() as unknown as IUser;
  console.log({ authenticatedUser: req.user });

  next();
}