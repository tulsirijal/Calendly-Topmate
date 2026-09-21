import Router from "express";
import { createEventTypes, deleteEventTypesById, updateEventTypesById } from "../controllers/event_type.controller.js";
import { auth } from "../middleware/mock-auth.js";


export const eventTypePrivateRouter = Router();

eventTypePrivateRouter.use(auth);

eventTypePrivateRouter.post("/", createEventTypes);
eventTypePrivateRouter.patch("/:id", updateEventTypesById);
eventTypePrivateRouter.delete("/:id", deleteEventTypesById);
