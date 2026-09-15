import {Router} from "express";
import { createUser, findUserById, findUsers, updateUser } from "../controllers/user.controller.js";
import { createUserSchema, updateUserSchema } from "../dto/user.dto.js";
import { validate } from "../middleware/validate.js";
export const userRouter = Router();

userRouter.get("/",findUsers);
userRouter.get("/:id", findUserById);
userRouter.post("/",validate(createUserSchema),createUser);
userRouter.patch("/:id",validate(updateUserSchema),updateUser);
