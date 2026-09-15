import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/api-error.js';
export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
    if(err instanceof ApiError) {
        const body: Record<string, unknown> = {
            success: false,
            message: err.message,
        }
        if(err.details) {
            body.details = err.details;
        }
        res.status(err.statusCode).json(body);
        return;
    }
    const body: Record<string, unknown> = {
        success: false,
        message: 'Internal Server Error',
    }
    if(process.env.NODE_ENV === 'development') {
        body.details = err.stack;
    }
    res.status(500).json(body);
}