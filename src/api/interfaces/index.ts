import { Request } from 'express'
import { IUser, ICreateUser, IUpdateUser } from "./user.interface";
import { UploadApiResponse } from 'cloudinary';
import { ICategory, ICreateCategory, IUpdateCategory } from './category.interface';
import { ICreateProduct, IProduct, IUpdateProduct } from './product.interface';
import { ICreateOrder, IOrder, IUpdateOrder } from './order.interface';

export interface IGenericObject {
    [key: string]: any
}

export interface CustomRequest extends Request {
    user: IUser;
}

export interface IPaginate {
    currentPage: number;
    totalPages: number
}

export type ICustomValidationFields = (value: any, helpers: any, fieldToCheck: any, valueToCheck: any) => any

export interface IReqFileUpload {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number
}

export type IUpload = IReqFileUpload & UploadApiResponse

export type ICollections = IUser | ICategory | IProduct | IOrder;

export type ICreateCollections = ICreateUser | ICreateCategory | ICreateProduct | ICreateOrder;

export type IUpdateCollections = IUpdateUser | IUpdateCategory | IUpdateProduct | IUpdateOrder;

export * from "./user.interface";
export * from "./category.interface";
export * from "./product.interface";
export * from "./order.interface";