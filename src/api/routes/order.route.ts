import { Router } from "express";
import { orderController } from "@controllers";
import { validate, authenticate } from "@middlewares";
import { OrderSchemas, OrderFields } from '@validations'

const orderRouter = Router();

orderRouter.post(
    "/new",
    [
        authenticate,
        validate(OrderSchemas, OrderFields.CreateOrder)
    ],
    orderController.createOrder
);

orderRouter.get(
    "/ref",
    [
        authenticate,
        // validate(OrderSchemas, OrderFields.CreateOrder)
    ],
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