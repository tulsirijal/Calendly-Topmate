import { Request, Response } from "express";
import { findAllUsers, findUserByID, updateUserbyId, createUser as userCreate } from "../services/user.service.js";
import { successResponse } from "../utils/api-response.js";
export async function findUsers(_req: Request, res: Response) {
    const response = await findAllUsers();
    successResponse(res, response, "Users fetched successfully");
}

export async function findUserById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await findUserByID(Number(id));
    successResponse(res, response, "User fetched successfully");
}


export async function createUser(req: Request, res: Response) {
    const { name, email } = req.body;
    const user = await userCreate({ name, email });
    successResponse(res, user, "User created successfully", 201);
}

export async function updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await updateUserbyId(Number(id), { name, email });
    successResponse(res, user, "User updated successfully");
}