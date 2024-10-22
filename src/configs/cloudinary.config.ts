import { v2 as cloudinary } from "cloudinary";
import { IReqFileUpload } from "@interfaces";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

export default async (file: IReqFileUpload) => {
    return await cloudinary.uploader.upload(file.path);
}

export const uploadFile = async (file: IReqFileUpload) => await cloudinary.uploader.upload(file.path)

export const replaceFile =  async (file: IReqFileUpload, public_id: string) => await cloudinary.uploader.upload(file.path, { public_id: public_id })

export const removeFile = async (public_id?: string) => await cloudinary.uploader.destroy(<string>public_id)