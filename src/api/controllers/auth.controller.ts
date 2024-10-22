import { Request, Response } from "express";
import { authService } from "@services";
import { MESSAGES } from "@configs";
import { sendResponse } from "@utils";

class AuthenticationController {
  async signup(req: Request, res: Response) {
    const { user, accessToken } = await authService.register(req.body);

    res.cookie("token", accessToken, { httpOnly: true, maxAge: 60000 });

    return sendResponse(res, 201, true, MESSAGES.SIGNUP_SUCCESSFUL, {
      user,
      accessToken
    });
  }

  async login(req: Request, res: Response) {
    const { user, accessToken } = await authService.login(req.body);

    res.cookie("token", accessToken, { httpOnly: true, maxAge: 60000 });

    return sendResponse(res, 200, true, MESSAGES.LOGIN_SUCCESSFUL, {
      user,
      accessToken
    });
  }
}

export default new AuthenticationController();
