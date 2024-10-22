import { Request, Response } from "express";
import { productService } from "@services";
import { IUser } from "@interfaces";
import { sendResponse } from "@utils";

class ProductController {
    async createProduct(req: Request, res: Response) {
        const user = req.user as unknown as IUser;

        const { message, product: data } = await productService.createProduct(user, req.body);

        return sendResponse(res, 200, true, message, data);
    }

    async updateProduct(req: Request, res: Response) {
        const { id } = req.params;
        const user = req.user as unknown as IUser;

        const { message, product: data } = await productService.editProduct(id, user, req.body);

        return sendResponse(res, 200, true, message, data);
    }

    async disableProduct(req: Request, res: Response) {
        const { id } = req.params
        const user = req.user as unknown as IUser;

        const { message, product: data } = await productService.disableProduct(id, user);

        return sendResponse(res, 200, true, message, data);
    }

    async getProduct(req: Request, res: Response) {
        const { id } = req.params
        const { message, product: data } = await productService.getProduct(id);

        return sendResponse(res, 200, true, message, data);
    }

    // Getting many products
    async getCategories(req: Request, res: Response) {
        const { message, products, currentPage, totalPages } = await productService.getProducts(req.query)

        return sendResponse(res, 200, true, message, {
            products,
            currentPage,
            totalPages,
        });
    }
}

export default new ProductController();
