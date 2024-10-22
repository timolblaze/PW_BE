import jwt from 'jsonwebtoken'
import { IUser } from '../interfaces'
import { JWT_SECRET_KEY } from '@configs';

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