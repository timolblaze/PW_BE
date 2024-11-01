// environmental variables
export const NODE_ENV = process.env.NODE_ENV!;
export const API_VERSION = process.env.API_VERSION!;
export const DB_URI = process.env.MONGODB_URI!
export const DB_NAME = process.env.DB_NAME!
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN!
export const JWT_EMAIL_VERIFICATION_EXPIRES_IN = process.env.JWT_EMAIL_VERIFICATION_EXPIRES_IN!
export const PORT = parseFloat(process.env.PORT!) || 8080
export const SERVER_URL = process.env.SERVER_URL!
export const TIME_TO_PING = parseFloat(process.env.TIME_TO_PING!)
export const ROUNDS = parseFloat(process.env.ROUNDS!)

// middleware configurations
export const morganOptions = `:date[iso] :method :url :status :response-time ms :remote-addr :http-version :referrer :user-agent`;
export const corsOptions = {
        origin: '*',
        exposedHeaders: ['Authorization', 'Access-Token']
};