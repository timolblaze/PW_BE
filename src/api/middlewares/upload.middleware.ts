import fs from 'fs'
import { NextFunction, Request, Response } from 'express'
import { uploadToCloudinary, multerConfig } from '@configs'
import { IUpload } from '@interfaces';

export default (fileLimit?: number, allowedFileTypes?: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    const upload = multerConfig(fileLimit, allowedFileTypes)

    upload.any()(req, res, async (err: any) => {
        if (err) next(err)
        
        const fileCount = req.files && req.files.length
        const uploads: IUpload[] = []

        if (fileCount > 0) {
            for (const file of req.files) {
                const result = await uploadToCloudinary(file)
                uploads.push({ ...file, ...result })
                fs.unlink(file.path, () => {
                    if (err) throw err;
                    console.log(`${file.path} was deleted`);
                })
            }
        }

        req.body.uploads = uploads
        req.body.fileCount = fileCount
        // console.log(`File${fileCount > 1 ? 's': ''} before uploading to cloud:`, req.files);
        // console.log(`File${fileCount > 1 ? 's': ''} after uploading to cloud:`, req.body.uploads);

        next();
    })
}