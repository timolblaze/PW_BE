import { Model } from "mongoose";
import { Order } from "@models";
import GenericService from "./generic.service";
import productService from "./product.service";
import {
    NotFoundException,
    ForbiddenException,
    UnAuthorizedException,
    InternalException
} from "./error.service";
import { IUpdateOrder, IOrder, IUser, ICreateOrder, IOrderItem } from "@interfaces";
import { isAuthorised, generateUniqueId, decodeUser } from "@utils";

export class OrderService<T extends IOrder> extends GenericService<T> {
    constructor(model: Model<T>) {
        super(model);
        this.model = model;
    }

    async generateReference() {
        const reference = generateUniqueId()
        
        return {
            message: `Reference generated successfully!`,
            reference
        };
    }

    async createOrder(payload: ICreateOrder, accessToken: string | undefined) {
        const { items, amount } = payload

        for(const item of items) {
            const isExistingProduct = await productService.findOne({ _id: (item as IOrderItem)._id })
            if (!isExistingProduct) {
                throw new NotFoundException(`${(item as IOrderItem).title} does not exist!`);
            }
        }

        payload.items = items.map(item => (item as IOrderItem)._id)
        let userId: string | null = null

        if(accessToken) {
            userId = (await decodeUser(accessToken))._id
        } 
        payload.user = userId

        const total = items.reduce((previousValue, item) => {
            return previousValue + (item as IOrderItem).subtotal
        }, 0)

        if(amount !== total) {
            throw new ForbiddenException("The payable amount must be the same with the payment amount.")
        }

        const order = await this.create(payload)
        if (!order) {
            throw new InternalException();
        }

        return {
            message: `Order created successfully!`,
            order
        };
    }

    async editOrder(_id: string, user: IUser, payload: IUpdateOrder) {
        const isExistingOrder = await this.findOne({ _id })

        if (!isExistingOrder) {
            throw new NotFoundException(`Order does not exist`);
        }

        if (!isAuthorised(user, "role", "admin")) {
            throw new ForbiddenException(
                `You do not have permission to update this order`
            );
        }

        const updatedOrder = await this.updateOne({ _id }, payload);
        if (!updatedOrder) {
            throw new InternalException();
        }

        return {
            message: `Order updated successfully!`,
            order: updatedOrder.toJSON()
        };
    }

    async disableOrder(_id: string, user: IUser) {
        const existingOrder = await this.findOne({ _id });

        if (!existingOrder) {
            throw new NotFoundException(`Order does not exist.`)
        }

        const isUnAuthorised = !isAuthorised(user, "_id", existingOrder._id.toString()) &&
            !isAuthorised(user, "role", "admin")

        if (isUnAuthorised) {
            throw new UnAuthorizedException(`You do not have permission to delete this order`)
        }

        const disabledOrder = await this.disableOne({ _id });
        if (!disabledOrder) {
            throw new InternalException()
        }

        return {
            message: `Order disabled successfully!`,
            order: disabledOrder.toJSON()
        }
    }

    async getOrder(_id: string, user: IUser) {
        const isExistingOrder = await this.findOne({ _id });

        if (!isExistingOrder) {
            throw new NotFoundException(`Order does not exist.`)
        }

        const isUnAuthorised = !isAuthorised(user, "_id", isExistingOrder._id.toString()) &&
            !isAuthorised(user, "role", "admin")

        if (isUnAuthorised) {
            throw new UnAuthorizedException(`You do not have permission to see this order`)
        }

        return {
            message: `Order fetched successfully!`,
            order: isExistingOrder
        }
    }

    async getOrders(user: IUser, query: any) {
        const { id, reference, isDeleted, sortBy, order } = query;

        if (id) {
            delete query.id;
            query._id = id;
        }

        if (reference) {
            query.reference = {
                $regex: (reference as string).toLowerCase().trim(),
                $options: "i",
            };
        }

        if (typeof isDeleted === "boolean") {
            query.isDeleted = isDeleted;
        }

        let sort: { [key: string]: number } | null = {};
        const orderValue = order === 'asc' ? 1 : -1;

        if (sortBy === "latest") {
            sort.createdAt = orderValue;
            delete query.sortBy;
        }
        
        const finalQuery = await this.addUserToQuery(user, query)
        const {
            data: orders,
            currentPage,
            totalPages,
        } = await this.findAll({ ...finalQuery, sort });

        if (!orders) {
            throw new InternalException()
        }

        return {
            message: "Orders successfully fetched!",
            // orders: this.filterOrders(user, orders as IOrder[]),
            orders,
            currentPage,
            totalPages
        }
    }

    // filterOrders(user: IUser, orders: IOrder[]) {
    //     if(user.role === "admin") {
    //         return orders
    //     } 
        
    //     return orders.filter(order => order.user &&  user._id.toString() === (order.user as unknown as IUser)?._id.toString())
    // }

    async addUserToQuery(user: IUser, query: any) {
        if(user.role === "admin") {
            return query
        } 

        query.user = user._id.toString()
        return query
    }
}

export default new OrderService(Order);