import { Request, Response } from "express";
import { createBookingOptimistic, getAllBookings } from "../services/booking.service.js";
import { successResponse } from "../utils/api-response.js";

export async function creatBookings(req: Request, res: Response) {
    await createBookingOptimistic(req.body);
    successResponse(res, "Successfully created booking");
}

export async function getBookings(req: Request, res: Response) {
    const response = await getAllBookings(req.userId);
    successResponse(res, response, "successfully retrieved bookings")
}