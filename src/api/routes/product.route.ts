import { Router } from "express";
import { productController } from "@controllers";
import { validate, authenticate } from "@middlewares";
import { ProductSchemas, ProductFields } from '@validations'

const productRouter = Router();

productRouter.post(
    "/new",
    [
        authenticate,
        validate(ProductSchemas, ProductFields.CreateProduct)
    ],
    productController.createProduct
);

productRouter.get(
    "/",
    [
        authenticate,
        validate(ProductSchemas, ProductFields.GetAllProducts)
    ],
    productController.getCategories
);

productRouter.get(
    "/:id",
    [
        authenticate,
        validate(ProductSchemas, ProductFields.GetOneProduct)
    ],
    productController.getProduct
);

productRouter.patch(
    "/:id",
    [
        authenticate,
        validate(ProductSchemas, ProductFields.UpdateOneProduct)
    ],
    productController.updateProduct
);

productRouter.delete(
    "/:id",
    [
        authenticate,
        validate(ProductSchemas, ProductFields.DeleteOneProduct)
    ],
    productController.disableProduct
);

export default productRouter;