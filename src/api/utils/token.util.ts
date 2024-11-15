import jwt, { JwtPayload } from 'jsonwebtoken'
import { IUser } from '../interfaces'
import { JWT_SECRET_KEY } from '@configs';
import { NotFoundException, UnAuthorizedException, userService } from '@services';
import { Request } from 'express';
import { BadRequestException } from '@services/error.service';

export const generateToken = async (payload: Partial<IUser>, expiresIn: string) => {
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn })
}

export const verifyToken = async (token: string) => {
    const decoded = <jwt.JwtPayload>jwt.decode(token);
    if (!decoded) return 'invalid'
    if (new Date(<number>decoded?.exp * 1000) <= new Date()) return 'expired'

    try {
        return jwt.verify(token, JWT_SECRET_KEY)
    } catch (e) {
        return 'invalid'
    }
}

export const decodeUser = async (accessToken: string) => {
    const decoded = <JwtPayload | string>await verifyToken(accessToken)

    if (decoded === 'expired') {
        throw new UnAuthorizedException('Session expired. Sign in again to continue.')
    }

    if (decoded === 'invalid') {
        throw new UnAuthorizedException('Invalid token.')
    }

    const user = await userService.findOne({ _id: (decoded as JwtPayload)._id });
    if (!user) {
        throw new NotFoundException('User not found')
    }

    return user;
}

export const extractHeader = (req: Request, headerName: string) => {
    const authHeader = req.header(headerName);

    if(headerName === "Authorization") {
        return authHeader?.substring(0, 7) === 'Bearer ' ? authHeader?.replace('Bearer ', '') : "";
    }

    return authHeader;
}

export const extractCookie = (req: Request, cookieName: string) => {
    const cookie = req.cookies?.[cookieName] || null;

    return cookie;
}