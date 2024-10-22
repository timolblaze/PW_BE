import { Request, Response } from "express";
import { userService } from "@services";
import { IUser } from "@interfaces";
import { sendResponse } from "@utils";

class UserController {
  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = req.user as unknown as IUser;

    const { message, user: data }  = await userService.editUser(id, user, req.body);

    return sendResponse(res, 200, true, message, data);
  }

  async uploadAvatar(req: Request, res: Response) {
    const { id } = req.params
    const { uploads } = req.body;
    const user = req.user as unknown as IUser;

    const { message, user: data }  = await userService.uploadAvatar(id, user, uploads);

    return sendResponse(res, 200, true, message, data);
  }

  async disableUser(req: Request, res: Response) {
    const { id } = req.params
    const user = req.user as unknown as IUser;

    const { message, user: data } = await userService.disableUser(id, user);

    return sendResponse(res, 200, true, message, data);
  }

  async getUser(req: Request, res: Response) {
    const { id } = req.params
    const { message, user: data } = await userService.getUser(id);

    return sendResponse(res, 200, true, message, data);
  }

  // Getting all users
  async getUsers(req: Request, res: Response) {
    const { message, users, currentPage, totalPages } = await userService.getUsers(req.query)

    return sendResponse(res, 200, true, message, {
      users,
      currentPage,
      totalPages,
    });
  }
}

export default new UserController();
