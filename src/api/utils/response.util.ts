import { Response } from "express";
import { IGenericObject, IPaginate } from "../interfaces";

export default function sendResponse(
    res: Response,
    status: number,
    success: boolean,
    message : string | IGenericObject,
    data?: string | IGenericObject,
    pagination?: IPaginate
) {
   
    const response = {
        status,
        success,
        message,
        pagination,
        data
    };

    return res.status(status).json(response);
}