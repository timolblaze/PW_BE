import { Router } from "express";
import { categoryController } from "@controllers";
import { validate, authenticate } from "@middlewares";
import { CategorySchemas, CategoryFields } from '@validations'

const categoryRouter = Router();

categoryRouter.post(
    "/new",
    [
        authenticate,
        validate(CategorySchemas, CategoryFields.CreateCategory)
    ],
    categoryController.createCategory
);

categoryRouter.get(
    "/",
    [
        // authenticate,
        validate(CategorySchemas, CategoryFields.GetAllCategories)
    ],
    categoryController.getCategories
);

categoryRouter.get(
    "/:id",
    [
        // authenticate,
        validate(CategorySchemas, CategoryFields.GetOneCategory)
    ],
    categoryController.getCategory
);

categoryRouter.patch(
    "/:id",
    [
        authenticate,
        validate(CategorySchemas, CategoryFields.UpdateOneCategory)
    ],
    categoryController.updateCategory
);

// Disabling a category of any type
categoryRouter.delete(
    "/:id",
    [
        authenticate,
        validate(CategorySchemas, CategoryFields.DeleteOneCategory)
    ],
    categoryController.disableCategory
);

export default categoryRouter;