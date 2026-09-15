import {prisma} from "../config/db.js";
import { CreateUserDTO, UpdateUserDTO } from "../dto/user.dto.js";

export async function getAll(){
    const users = await prisma.user.findMany();
    return users;
}

export async function findUserById(id: number) {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });
    return user;
}

export async function findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    return user;
}

export async function updateUser(id: number, data: UpdateUserDTO) {
    const user = await prisma.user.update({
        where: {
            id
        },
        data
    });
    return user;
}

export async function createOneUser(data:CreateUserDTO){
    const user = await prisma.user.create({
        data
    });
    return user;
}