import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { badRequestError } from "../utils/api-error.js";
export function validate(schema: z.ZodType) {
    return (req: Request, _res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            throw badRequestError("Validation failed", result.error.issues);
        }
        req.body = result.data;
        next();
    };
}