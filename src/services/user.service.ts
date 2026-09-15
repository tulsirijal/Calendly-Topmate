import { findUserByEmail, findUserById, getAll, updateUser } from "../repositories/user.repository.js";
import { createOneUser } from "../repositories/user.repository.js";
import { CreateUserDTO, UpdateUserDTO } from "../dto/user.dto.js";
import { conflictError } from "../utils/api-error.js";
export async function findAllUsers() {
    const users = await getAll();
    return users;
}

export async function findUserByID(id: number) {
    const user = await findUserById(id);
    return user;
}

export async function updateUserbyId(id: number, data: UpdateUserDTO) {
    const existingUser = await findUserById(id);
    if (!existingUser) {
        throw conflictError("User not found");
    }
    if (data.email) {
        const userWithEmail = await findUserByEmail(data.email);
        if (userWithEmail && userWithEmail.id !== id) {
            throw conflictError("User with this email already exists");
        }
    }
    const user = await updateUser(id, data);
    return user;
}

export async function createUser(data: CreateUserDTO){
    const existingUser = await findUserByEmail(data.email);
    if (existingUser) {
        throw conflictError("User with this email already exists");
    }
    return await createOneUser(data);
}