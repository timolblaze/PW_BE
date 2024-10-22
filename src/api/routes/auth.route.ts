import { Router } from 'express';
import { authController } from '@controllers'
import { validate } from '@middlewares'
import { AuthSchemas, AuthFields } from '@validations'

const authRouter = Router()

authRouter.post(
    '/register', 
    [validate(AuthSchemas, AuthFields.Register)], 
    authController.signup
)

authRouter.post(
    '/login', 
    [validate(AuthSchemas, AuthFields.Login)], 
    authController.login
)

export default authRouter