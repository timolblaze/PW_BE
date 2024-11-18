import { Document, Types } from "mongoose";
import { IProduct } from "./product.interface";

export interface IOrderItem extends IProduct {
    subtotal: number;
    quantity: number;
}

export interface IOrderData {
    reference: string;
    user: string | Types.ObjectId | null;
    items: IOrderItem[];
    amount: number;
    // status: string;
    isDeleted: boolean;
}

export interface IOrder extends IOrderData, Document {
    _id: string;
}

export type ICreateOrder = IOrderData;

export interface IUpdateOrder extends Partial<IOrderData> {}