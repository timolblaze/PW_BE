import { Document } from "mongoose";

// Define category properties separately from Document
export interface ICategoryData {
    title: string;
    description: string;
    icon: string;
    isDeleted: boolean;
}

export interface ICategory extends ICategoryData, Document {
    _id: string;
}

export type ICreateCategory = ICategoryData;

export interface IUpdateCategory extends Partial<ICategoryData> {}