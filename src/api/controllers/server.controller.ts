import axios from 'axios';
import { Request, Response, NextFunction } from "express";
import { MESSAGES } from "@configs";
import { sendResponse, isHome } from "@utils";

class ServerController {
    checkHealth(req: Request, res: Response) {
        res.sendStatus(200)
    }

    resourceNotFound(req: Request, res: Response) {
        sendResponse(res, 404, false, MESSAGES.PAGE_NOT_FOUND)
    }

    sayWelcome(req: Request, res: Response, next: NextFunction) {
        if (isHome(req)) return sendResponse(res, 200, true, 'Welcome to purpleworld api')
        next()
    }

    redirect = (url: string, res: Response) => res.redirect(301, url)

    redirectToHome = (req: Request, res: Response, next: NextFunction) => {
        if (isHome(req)) this.redirect(`/api/v1`, res)
    }

    ping = async (req: Request, res: Response) => {
        try {
            const response = await axios.get(`${process.env.SERVER_BASE_URL}/health`);
            return sendResponse(res, response.status, true, "Your server is healthy")
        } catch (error) {
            return sendResponse(res, 500, false, "Your server is unhealthy")
        }
    }
}

export default new ServerController()