import Router from "express";
import { getAllEventTypes, getEventTypeById, getEventTypesByHostId } from "../controllers/event_type.controller.js";

export const eventTypePublicRouter = Router();

eventTypePublicRouter.get("/", getAllEventTypes);
eventTypePublicRouter.get("/:id", getEventTypeById);
eventTypePublicRouter.get("/host/:hostId", getEventTypesByHostId);
