import { Response } from "express";
interface SuccessResponse<T> {
    success: true;
    data: T;
    message?: string;
}

export function successResponse<T>(res:Response, data: T, message?: string, statusCode = 200) {
    const response: SuccessResponse<T> = {
        success: true,
        data,
    };
    if (message) {
        response.message = message;
    }
    res.status(statusCode).json(response);
}
