import { Router } from "express";
import { auth } from "../middleware/mock-auth.js";
import { creatBookings, getBookings } from "../controllers/booking.controller.js";

export const bookingRouter = Router();
bookingRouter.post('/', creatBookings)
bookingRouter.get('/', auth, getBookings);