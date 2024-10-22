import { Request, Response } from "express";
import { orderService } from "@services";
import { IUser } from "@interfaces";
import { sendResponse } from "@utils";

class OrderController {
    async createOrder(req: Request, res: Response) {
        const user = req.user as unknown as IUser;

        const { message, order: data } = await orderService.createOrder(user, req.body);

        return sendResponse(res, 200, true, message, data);
    }

    async updateOrder(req: Request, res: Response) {
        const { id } = req.params;
        const user = req.user as unknown as IUser;

        const { message, order: data } = await orderService.editOrder(id, user, req.body);

        return sendResponse(res, 200, true, message, data);
    }

    async disableOrder(req: Request, res: Response) {
        const { id } = req.params
        const user = req.user as unknown as IUser;

        const { message, order: data } = await orderService.disableOrder(id, user);

        return sendResponse(res, 200, true, message, data);
    }

    async getOrder(req: Request, res: Response) {
        const { id } = req.params
        const user = req.user as unknown as IUser;

        const { message, order: data } = await orderService.getOrder(id, user);

        return sendResponse(res, 200, true, message, data);
    }

    async getOrders(req: Request, res: Response) {
        const user = req.user as unknown as IUser;

        const { message, orders, currentPage, totalPages } = await orderService.getOrders(user, req.query)

        return sendResponse(res, 200, true, message, {
            orders,
            currentPage,
            totalPages,
        });
    }

    async getRef(req: Request, res: Response) {
        const { message, reference } = await orderService.generateReference()

        return sendResponse(res, 200, true, message, { reference });
    }
}

export default new OrderController();
