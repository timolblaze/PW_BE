import { Request, Response } from "express";
import { categoryService } from "@services";
import { IUser } from "@interfaces";
import { sendResponse } from "@utils";

class CategoryController {
    async createCategory(req: Request, res: Response) {
        const user = req.user as unknown as IUser;

        const { message, category: data } = await categoryService.createCategory(user, req.body);

        return sendResponse(res, 200, true, message, data);
    }

    async updateCategory(req: Request, res: Response) {
        const { id } = req.params;
        const user = req.user as unknown as IUser;

        const { message, category: data } = await categoryService.editCategory(id, user, req.body);

        return sendResponse(res, 200, true, message, data);
    }

    async disableCategory(req: Request, res: Response) {
        const { id } = req.params
        const user = req.user as unknown as IUser;

        const { message, category: data } = await categoryService.disableCategory(id, user);

        return sendResponse(res, 200, true, message, data);
    }

    async getCategory(req: Request, res: Response) {
        const { id } = req.params
        const { message, category: data } = await categoryService.getCategory(id);

        return sendResponse(res, 200, true, message, data);
    }

    // Getting many categories
    async getCategories(req: Request, res: Response) {
        const { message, categories, currentPage, totalPages } = await categoryService.getCategories(req.query)

        return sendResponse(res, 200, true, message, {
            categories,
            currentPage,
            totalPages,
        });
    }
}

export default new CategoryController();
