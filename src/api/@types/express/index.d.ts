declare namespace Express {
    export interface Request {
        user: {
            _id: string;
            fullName: string;
            avatar: string;
            email: string;
            password: string;
            role: string;
            isDeleted: boolean
        }
        files: {
            fieldname: string;
            originalname: string;
            encoding: string;
            mimetype: string;
            destination: string;
            filename: string;
            path: string;
            size: number;
        }[]
    }
}