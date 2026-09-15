import { Request, Response } from "express";
import {
    createAvailabiltyExceptions,
    listExceptionsById,
    listExceptionsByUser,
    removeExceptions,
    updateAvailabiltyExceptions
} from "../services/availability_exceptions.repository.js"
import { successResponse } from "../utils/api-response.js";

export const getExceptionsByUser = async (req: Request, res: Response) => {
    const userId = req.body.userId;
    const response = await listExceptionsByUser(Number(userId));
    return successResponse(res, response, "Availability exceptions retrieved successfully");
};

export const getExceptionById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await listExceptionsById(Number(id));
    return successResponse(res, response, "Availability exception retrieved successfully");
};

export const makeAvailabilityException = async (req: Request, res: Response) => {
    const response = await createAvailabiltyExceptions(req.body);
    return successResponse(res, response, "Availability exception created successfully", 201);
};

export const updateAvailabilityExceptionController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await updateAvailabiltyExceptions(Number(id), req.body);
    return successResponse(res, response, "Availability exception updated successfully");
};

export const removeAvailabilityException = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.body;
    const response = await removeExceptions(Number(id), Number(userId));
    return successResponse(res, response, "Availability exception deleted successfully");
};