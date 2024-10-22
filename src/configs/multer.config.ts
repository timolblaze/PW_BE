import path from "path";
import multer from "multer";
import { IGenericObject } from "@interfaces";
import { ForbiddenException } from "../api/services";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

function checkFileType(file: IGenericObject, cb: any, filetypes: string[] = []) {
    const fileExtension = path.extname(file.originalname).toLowerCase().replace('.', '')
    const mimetype = file.mimetype.split('/')[file.mimetype.split('/')-1]
    const lastFileExtension = filetypes.slice(filetypes.length - 1)
    const allowedFileFormatsToString = filetypes.join(', ')

    const isAllowedExtension = filetypes.includes(fileExtension)
    const isAllowedMimetype = filetypes.includes(mimetype)

    // if (fileExtension !== mimetype)
    //     return cb(new ForbiddenException(`Mimetype '${file.mimetype}' does not match the type of file you uploaded.`))

    // if (filetypes.length === 0 || isAllowedExtension && isAllowedMimetype)
    //     return cb(null, true)

    if (filetypes.length === 0 || isAllowedExtension)
        return cb(null, true)

    const files = filetypes.length > 1

    if (!isAllowedExtension)
        return cb(new ForbiddenException(`${fileExtension.toUpperCase()} files are not allowed! Please upload your ${files ? 'file' : 'files'} in ${allowedFileFormatsToString} ${files ? `or ${lastFileExtension} formats` : 'format'}.`))

    // if (!isAllowedMimetype)
    //     return cb(new ForbiddenException(`Mimetype '${file.mimetype}' does not match the type of file you uploaded.`))
}

export default (files?: number, filetypes?: string[]) => multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb, filetypes);
    },
    limits: {
        files
    }
});