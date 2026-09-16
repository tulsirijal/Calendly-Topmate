import { CreateAvailabilityExceptionDTO, UpdateAvailabilityExceptionDTO } from "../dto/availability_exceptions.dto.js";
import { createAvailabilityException, deleteAvailabilityException, getAvailabilityExceptionById, getAvailabilityExceptionsByUserId, updateAvailabilityException } from "../repositories/availability_exceptions.repository.js";
import { forbiddenError, notFoundError } from "../utils/api-error.js";

export async function listExceptionsByUser(userId: number){
    return await getAvailabilityExceptionsByUserId(userId);
}

export async function listExceptionsById(id: number){
    return await getAvailabilityExceptionById(id);
}

export async function createAvailabiltyExceptions(data: CreateAvailabilityExceptionDTO & {userId: number}){
    return await createAvailabilityException(data);
}

export async function updateAvailabiltyExceptions(id: number, data: UpdateAvailabilityExceptionDTO & {userId: number}){
    const existingExceptions  = await listExceptionsById(id);
    if(!existingExceptions){
        throw notFoundError("This availability exception does not exist");
    }

    if(existingExceptions.userId != data.userId){
        throw forbiddenError("You are not allowed to change this.");
    }

    const updatedException = await updateAvailabilityException(existingExceptions.id, data);
    return updatedException;
}

export async function removeExceptions(id: number, userId: number) {
    const existingExceptions  = await listExceptionsById(id);
    if(!existingExceptions){
        throw notFoundError("This availability exception does not exist");
    }

    if(existingExceptions.userId !=userId){
        throw forbiddenError("You are not allowed to remove this.");
    }

    return await deleteAvailabilityException(id);
}