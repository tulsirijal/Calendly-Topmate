export class ApiError extends Error {
    readonly statusCode: number;
    readonly details?: unknown;

    constructor(statusCode: number, message: string, details?: unknown) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.name = 'ApiError';
        Error.captureStackTrace(this, this.constructor);
    }
}

export const badRequestError = (message: string, details?: unknown) => {
    return new ApiError(400, message, details);
};

export const notFoundError = (message: string, details?: unknown) => {
    return new ApiError(404, message, details);
};

export const internalServerError = (message: string) => {
    return new ApiError(500, message);
};

export const unauthorizedError = (message: string, details?: unknown) => {
    return new ApiError(401, message, details);
};

export const forbiddenError = (message: string, details?: unknown) => {
    return new ApiError(403, message, details);
};

export const conflictError = (message: string, details?: unknown) => {
    return new ApiError(409, message, details);
};