import { Router } from "express";
import {
    getExceptionById,
    getExceptionsByUser,
    makeAvailabilityException,
    removeAvailabilityException,
    updateAvailabilityExceptionController
} from "../controllers/availability_exceptions.controller.js";
import {
    createAvailabilityExceptionSchema,
    updateAvailabilityExceptionSchema
} from "../dto/availability_exceptions.dto.js";
import { auth } from "../middleware/mock-auth.js";
import { validate } from "../middleware/validate.js";

export const availabilityExceptionRouter = Router();
availabilityExceptionRouter.use(auth);

availabilityExceptionRouter.get("/", getExceptionsByUser);
availabilityExceptionRouter.get("/:id", getExceptionById);
availabilityExceptionRouter.post(
    "/",
    validate(createAvailabilityExceptionSchema),
    makeAvailabilityException
);
availabilityExceptionRouter.patch(
    "/:id",
    validate(updateAvailabilityExceptionSchema),
    updateAvailabilityExceptionController
);
availabilityExceptionRouter.delete("/:id", removeAvailabilityException);