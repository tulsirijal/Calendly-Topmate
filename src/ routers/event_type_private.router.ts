import Router from "express";
import { createEventTypes, deleteEventTypesById, updateEventTypesById } from "../controllers/event_type.controller.js";


export const eventTypePrivateRouter = Router();

eventTypePrivateRouter.post("/", createEventTypes);
eventTypePrivateRouter.patch("/:id", updateEventTypesById);
eventTypePrivateRouter.delete("/:id", deleteEventTypesById);
