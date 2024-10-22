import { Model } from "mongoose";
import { Product } from "@models";
import GenericService from "./generic.service";
import {
    NotFoundException,
    ForbiddenException,
    UnAuthorizedException,
    InternalException
} from "./error.service";
import { IUpdateProduct, IProduct, IUser, ICreateProduct } from "@interfaces";
import { isAuthorised } from "@utils";
import categoryService from "./category.service";

export class ProductService<T extends IProduct> extends GenericService<T> {
    constructor(model: Model<T>) {
        super(model);
        this.model = model;
    }

    async createProduct(user: IUser, payload: ICreateProduct) {
        if (!isAuthorised(user, "role", "admin")) {
            throw new ForbiddenException(
                `You do not have permission to create a category!`
            );
        }

        const { category } = payload;

        const isExistingCategory = await categoryService.findOne({ _id: category })
        if (!isExistingCategory) {
            throw new NotFoundException(`Category does not exist!`);
        }

        payload.category = isExistingCategory._id

        const product = await this.create(payload)
        if (!product) {
            throw new InternalException();
        }

        return {
            message: `Product created successfully!`,
            product
        };

    }

    async editProduct(_id: string, user: IUser, payload: IUpdateProduct) {
        const { title } = payload
        const isExistingProduct = await this.findOne({ _id })

        if (!isExistingProduct) {
            throw new NotFoundException(`Product does not exist`);
        }

        if (!isAuthorised(user, "role", "admin")) {
            throw new ForbiddenException(
                `You do not have permission to update this product`
            );
        }

        if (title && isExistingProduct.title === title) {
            throw new ForbiddenException(`Current category name must be different from new name.`);
        }

        const updatedProduct = await this.updateOne({ _id }, payload);
        if (!updatedProduct) {
            throw new InternalException();
        }

        return {
            message: `Product updated successfully!`,
            product: updatedProduct.toJSON()
        };
    }

    async disableProduct(_id: string, user: IUser) {
        const existingProduct = await this.findOne({ _id });

        if (!existingProduct) {
            throw new NotFoundException(`Product does not exist.`)
        }

        const isUnAuthorised = !isAuthorised(user, "_id", existingProduct._id.toString()) &&
            !isAuthorised(user, "role", "admin")

        if (isUnAuthorised) {
            throw new UnAuthorizedException(`You do not have permission to delete this product`)
        }

        const disabledProduct = await this.disableOne({ _id });
        if (!disabledProduct) {
            throw new InternalException()
        }

        return {
            message: `Account disabled successfully!`,
            product: disabledProduct.toJSON()
        }
    }

    async getProduct(_id: string) {
        const isExistingProduct = await this.findOne({ _id });

        if (!isExistingProduct) {
            throw new NotFoundException(`Product does not exist.`)
        }

        await this.incrementViewCount(_id);

        return {
            message: `Product fetched successfully!`,
            product: isExistingProduct
        }
    }

    async getProducts(query: any) {
        const { id, title, isDeleted, sortBy, order } = query;

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

        let sort: { [key: string]: number } | null = {};
        const orderValue = order === 'asc' ? 1 : -1;

        if (sortBy === "popular") {
            sort.viewCount = orderValue;
            delete query.sortBy;
        } else if (sortBy === "new") {
            sort.createdAt = orderValue;
            delete query.sortBy;
        }
        
        const {
            data: products,
            currentPage,
            totalPages,
        } = await this.findAll({ ...query, sort });

        if (!products) {
            throw new InternalException()
        }

        // (products as IProduct[]).forEach(async (product) => await this.incrementViewCount(product._id))

        return {
            message: "Products successfully fetched!",
            products,
            currentPage,
            totalPages
        }
    }

    async incrementViewCount(_id: string) {
        const product = await this.model.findByIdAndUpdate(
            _id,
            { $inc: { viewCount: 1 } },
            { new: true }
        );

        if (!product) {
            throw new NotFoundException(`Product does not exist.`);
        }

        return product;
    }

}

export default new ProductService(Product);