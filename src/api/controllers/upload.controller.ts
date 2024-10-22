import { Request, Response } from "express";
import { sendResponse } from "@utils";

class UploadController {
    async uploadFile(req: Request, res: Response) {
        const { fileCount, uploads } = req.body
        
        // req.body.uploads = uploads.map(({ filename, size, encoding, resource_type, secure_url }) => {
        //     return { filename, size, encoding, resource_type, secure_url } 
        // })

        return sendResponse(res, 200, true, `File${fileCount > 1 ? 's' : ''} uploaded successfully`, uploads)
    } 
}

export default new UploadController();