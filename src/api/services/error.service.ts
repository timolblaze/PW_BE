export class AppError extends Error {
    statusCode: number

    constructor(name: string, message: string, statusCode: number) {
        super(message)
        this.name = name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundException extends AppError {
    constructor(message?: string) {
        super("ResourceNotFound", message || 'Resource does not exist.', 404)
    }
}

export class ForbiddenException extends AppError {
    constructor(message?: string) {
        super("OperationNotAllowed", message || 'You are not allowed to perform this action.', 403)
    }
}
export class UnAuthorizedException extends AppError {
    constructor(message?: string) {
        super("UnauthorizedOperation", message || 'You are not authorized to perform this action.', 401)
    }
}

export class BadRequestException extends AppError {
    constructor(message?: string) {
        super("BadRequest", message || "The request could not be understood or was missing required parameters.", 400);
    }
}

export class InternalException extends AppError {
    constructor(message?: string) {
        super("Internal Server Error", "There was a temporary problem completing your request. Please try again.", 500)
    }
}