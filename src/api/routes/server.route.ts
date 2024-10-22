import { Router } from 'express';
import { serverController } from '@controllers';
import { apiVersion } from '@configs'

const serverRouter = Router()

serverRouter.get('/ping', serverController.ping);

serverRouter.get(
    '/', 
    serverController.redirectToHome
);

serverRouter.get(
    `${apiVersion}`, 
    serverController.sayWelcome
);

serverRouter.get(
    '/health', 
    serverController.checkHealth
);

serverRouter.get(
    `${apiVersion}/health`, 
    serverController.checkHealth
);

serverRouter.use(serverController.resourceNotFound);

export default serverRouter