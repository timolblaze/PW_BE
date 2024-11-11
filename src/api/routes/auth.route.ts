import { Router } from 'express';
import { authController } from '@controllers'
import { authenticate, validate } from '@middlewares'
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

authRouter.post(
    '/logout', 
    authController.logout
)

export default authRouter