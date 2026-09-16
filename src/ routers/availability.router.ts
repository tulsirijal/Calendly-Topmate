import { Router } from "express";
import {
    getAllAvailabilities,
    makeAvailabilities,
    removeAvailability,
    updateAvailability
} from "../controllers/availability.controller.js";
import { createAvailabilitySchema, updateAvailabilitySchema } from "../dto/availability.dto.js";
import { validate } from "../middleware/validate.js";
import { auth } from "../middleware/mock-auth.js";

export const availabilityRouter = Router();

availabilityRouter.use(auth);

availabilityRouter.get("/", getAllAvailabilities);
availabilityRouter.post("/", validate(createAvailabilitySchema), makeAvailabilities);
availabilityRouter.patch("/:id", validate(updateAvailabilitySchema), updateAvailability);
availabilityRouter.delete("/:id", removeAvailability);