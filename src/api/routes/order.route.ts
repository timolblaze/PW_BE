import { Router } from "express";
import { orderController } from "@controllers";
import { validate, authenticate } from "@middlewares";
import { OrderSchemas, OrderFields } from '@validations'

const orderRouter = Router();

orderRouter.post(
    "/new",
    [
        validate(OrderSchemas, OrderFields.CreateOrder)
    ],
    orderController.createOrder
);

orderRouter.get(
    "/ref",
    orderController.getRef
);

orderRouter.get(
    "/",
    [
        authenticate,
        validate(OrderSchemas, OrderFields.GetAllOrders)
    ],
    orderController.getOrders
);

orderRouter.get(
    "/:id",
    [
        authenticate,
        validate(OrderSchemas, OrderFields.GetOneOrder)
    ],
    orderController.getOrder
);

orderRouter.patch(
    "/:id",
    [
        authenticate,
        validate(OrderSchemas, OrderFields.UpdateOneOrder)
    ],
    orderController.updateOrder
);

orderRouter.delete(
    "/:id",
    [
        authenticate,
        validate(OrderSchemas, OrderFields.DeleteOneOrder)
    ],
    orderController.disableOrder
);

export default orderRouter;