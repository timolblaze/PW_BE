import { Router } from 'express';
import { serverController } from '@controllers';
import { API_VERSION as apiVersion } from '@configs'

const serverRouter = Router()

serverRouter.get('/ping', serverController.ping);

serverRouter.get(
    '/', 
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