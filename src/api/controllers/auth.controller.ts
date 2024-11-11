import { Request, Response } from "express";
import { authService } from "@services";
import { MESSAGES } from "@configs";
import { sendResponse } from "@utils";

class AuthenticationController {
  async signup(req: Request, res: Response) {
    const { user, accessToken } = await authService.register(req.body);

    res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 60000 });

    return sendResponse(res, 201, true, MESSAGES.SIGNUP_SUCCESSFUL, {
      user,
      accessToken
    });
  }

  async login(req: Request, res: Response) {
    const { user, accessToken } = await authService.login(req.body);

    res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 60000 });

    return sendResponse(res, 200, true, MESSAGES.LOGIN_SUCCESSFUL, {
      user,
      accessToken
    });
  }

  logout(req: Request, res: Response) {
    const accessToken = req.cookies?.accessToken;
    if(!accessToken) {
      return sendResponse(res, 403, false, MESSAGES.ALREADY_LOGGED_OUT);
    }

    res.clearCookie("accessToken", { httpOnly: true, path: "/" })

    return sendResponse(res, 200, true, MESSAGES.LOGOUT_SUCCESSFUL);
  }
}

export default new AuthenticationController();
