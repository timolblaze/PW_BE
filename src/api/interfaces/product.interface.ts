import { Document, Types } from "mongoose";

// Define product  properties separately from Document
export interface IProductData {
    title: string;
    description: string;
    category: string | Types.ObjectId;
    icon: string;
    price: number;
    viewCount: number;
    isDeleted: boolean;
}

export interface IProduct extends IProductData, Document {
    _id: string;
}

export type ICreateProduct = IProductData;

export interface IUpdateProduct extends Partial<IProductData> {}