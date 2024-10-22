import { Model } from "mongoose";
import { Category } from "@models";
import GenericService from "./generic.service";
import {
    NotFoundException,
    ForbiddenException,
    UnAuthorizedException,
    InternalException
} from "./error.service";
import { IUpdateCategory, ICategory, IUser, ICreateCategory } from "@interfaces";
import { isAuthorised } from "@utils";

export class CategoryService<T extends ICategory> extends GenericService<T> {
    constructor(model: Model<T>) {
        super(model);
        this.model = model;
    }

    async createCategory(user: IUser, payload: ICreateCategory) {
        if (!isAuthorised(user, "role", "admin")) {
            throw new ForbiddenException(
                `You do not have permission to create a category!`
            );
        }

        const { title } = payload;

        const isExistingCategory = await this.findOne({ title })
        if (isExistingCategory) {
            throw new NotFoundException(`Category already exists!`);
        }

        const category = await this.create(payload)
        if (!category) {
            throw new InternalException();
        }

        return {
            message: `Category created successfully!`,
            category
        };

    }

    async editCategory(_id: string, user: IUser, payload: IUpdateCategory) {
        const { title } = payload;

        const isExistingCategory = await this.findOne({ _id })
        
        if (!isExistingCategory) {
            throw new NotFoundException(`This category does not exist`);
        }

        if (!isAuthorised(user, "role", "admin")) {
            throw new ForbiddenException(
                `You do not have permission to update this category`
            );
        }

        if (isExistingCategory.title === title) {
            throw new ForbiddenException(`Current category name must be different from new name.`);
        }

        if (title) {
            const isConflictingTitle = await this.findOne({ title, _id: { $ne: _id } });
            if (isConflictingTitle) {
                throw new ForbiddenException(`A category with this title already exists.`);
            }
        }

        const updatedCategory = await this.updateOne({ _id }, payload);
        if (!updatedCategory) {
            throw new InternalException();
        }

        return {
            message: `Category updated successfully!`,
            category: updatedCategory.toJSON()
        };
    }

    async disableCategory(_id: string, user: IUser) {
        const existingCategory = await this.findOne({ _id });

        if (!existingCategory) {
            throw new NotFoundException(`This Category does not exist`)
        }

        const isUnAuthorised = !isAuthorised(user, "_id", existingCategory._id.toString()) &&
            !isAuthorised(user, "role", "admin")

        if (isUnAuthorised) {
            throw new UnAuthorizedException(`You do not have permission to delete this category`)
        }

        const disabledCategory = await this.disableOne({ _id });
        if (!disabledCategory) {
            throw new InternalException()
        }

        return {
            message: `Account disabled successfully!`,
            category: disabledCategory.toJSON()
        }
    }

    async getCategory(_id: string) {
        const isExistingCategory = await this.findOne({ _id });

        if (!isExistingCategory) {
            throw new NotFoundException(`Category ${_id} does not exist`)
        }

        return {
            message: `Category fetched successfully!`,
            category: isExistingCategory
        }
    }

    async getCategories(query: any) {
        const { id, title, isDeleted } = query;

        if (id) {
            delete query.id;
            query._id = id;
        }

        if (title) {
            query.title = {
                $regex: (title as string).toLowerCase().trim(),
                $options: "i",
            };
        }

        if (typeof isDeleted === "boolean") {
            query.isDeleted = isDeleted;
        }

        const {
            data: categories,
            currentPage,
            totalPages,
        } = await this.findAll(query);

        if (!categories) {
            throw new InternalException()
        }

        return {
            message: "Categories successfully fetched",
            categories,
            currentPage,
            totalPages
        }
    }
}

export default new CategoryService(Category);