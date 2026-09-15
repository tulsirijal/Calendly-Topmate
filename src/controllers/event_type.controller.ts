import {Request, Response} from "express";
import { findAllEventTypes,findEventTypesByHostID,findEventTypeByID, updateEventTypeById, createNewEventType, findEventTypePublicByID, deleteEventTypeById } from "../services/event_type.service.js";
import { successResponse } from "../utils/api-response.js";

export const createEventTypes = async (req: Request, res: Response) => {
    const response = await createNewEventType(req.body);
    successResponse(res, response, "Event type created successfully", 201);
}

export const getAllEventTypes = async (req: Request, res: Response) => {
    const response = await findAllEventTypes();
    successResponse(res, response, "Event types retrieved successfully", 200);
}

export const getEventTypeById = async (req: Request, res: Response) => {
    const id = req.params.id
    const response = await findEventTypeByID(Number(id));
    successResponse(res, response, "Event type retrieved successfully", 200);
}

export const getEventTypesByHostId = async (req: Request, res: Response) => {
    const hostId = req.params.hostId
    const response = await findEventTypesByHostID(Number(hostId));
    successResponse(res, response, "Event types retrieved successfully", 200);
}

export const getEventTypePublicById = async (req: Request, res: Response) => {
    const id = req.params.id
    const hostId = req.params.hostId
    const response = await findEventTypePublicByID(Number(id), Number(hostId));
    successResponse(res, response, "Event type retrieved successfully", 200);
}

export const updateEventTypesById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const response = await updateEventTypeById(Number(id), req.body);
    successResponse(res, response, "Event type updated successfully", 200);
}

export const deleteEventTypesById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const hostId = req.body.hostId;
    await deleteEventTypeById(Number(id), Number(hostId));
    successResponse(res, null, "Event type deleted successfully", 200);
}