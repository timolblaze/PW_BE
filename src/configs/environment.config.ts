// environmental variables
export const apiVersion = process.env.API_VERSION!;
export const mongoUri = process.env.MONGODB_URI!
export const dbName = process.env.DB_NAME!
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN!
export const JWT_EMAIL_VERIFICATION_EXPIRES_IN = process.env.JWT_EMAIL_VERIFICATION_EXPIRES_IN!
export const port = parseFloat(process.env.PORT!) || 8080
export const serverUrl = process.env.SERVER_URL!
export const pingTime = parseFloat(process.env.TIME_TO_PING!)
export const rounds = parseFloat(process.env.ROUNDS!)

// middleware configurations
export const morganConfig = `:date[iso] :method :url :status :response-time ms :remote-addr :http-version :referrer :user-agent`;
export const corsConfig = {
        origin: '*',
        exposedHeaders: ['Authorization', 'Access-Token']
};