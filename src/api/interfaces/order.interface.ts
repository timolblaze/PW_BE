import { Document, Types } from "mongoose";

export interface IOrderData {
    reference: string;
    user: string | Types.ObjectId;
    product: string | Types.ObjectId;
    amount: number;
    status: string;
    isDeleted: boolean;
}

export interface IOrder extends IOrderData, Document {
    _id: string;
}

export type ICreateOrder = IOrderData;

export interface IUpdateOrder extends Partial<IOrderData> {}