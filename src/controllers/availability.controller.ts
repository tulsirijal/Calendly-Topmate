import { Request, Response } from "express";
import { generateAvailabilities, listAvailabilities, removeAvailabilities, updateAvailabilties } from "../services/availability.service.js";
import { successResponse } from "../utils/api-response.js";

export const getAllAvailabilities = async(req:Request,res:Response)=>{
    const userId = req.body.userId;
    const response = await listAvailabilities(Number(userId));
}

export const makeAvailabilities = async(req: Request, res: Response)=>{
    const response = await generateAvailabilities(req.body);
    return successResponse(res,response, "Availabilites created successfully", 201);
}

export const updateAvailability = async(req:Request, res:Response)=>{
    const {id} = req.params;
    const response = await updateAvailabilties(Number(id),req.body);
    successResponse(res,response, "Availabilities updated successfully");
}

export const removeAvailability = async(req:Request, res:Response)=>{
    const {id} = req.params;
    const {userId} = req.body;
    const response = await removeAvailabilities(Number(id), userId);
    successResponse(res,response, "Availabilities deleted successfully");
}
