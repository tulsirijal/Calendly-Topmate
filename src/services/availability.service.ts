import { CreateAvailabilityDTO, UpdateAvailabilityDTO } from "../dto/availability.dto.js";
import { createAvailability, deleteAvailability, getAvailabilityById, getAvailabilityByUserId, updateAvailability } from "../repositories/availability.repository.js";
import { forbiddenError, notFoundError } from "../utils/api-error.js";

export async function listAvailabilities(userId: number){
    return await getAvailabilityByUserId(userId);
}

export async function generateAvailabilities(data: CreateAvailabilityDTO & {userId: number}){
    const availabilityRule = await createAvailability(data);
    return availabilityRule;
}

export async function updateAvailabilties(availabilityId:number, data:UpdateAvailabilityDTO & {userId:number}){
    const existingAvailabilies = await getAvailabilityById(availabilityId);
    if(!existingAvailabilies) {
        throw notFoundError('This availabilty does not exist');
    }

    if(existingAvailabilies.userId != data.userId){
        throw forbiddenError("You are not allowed to update this availability.")
    }

    const updatedAvailability = await updateAvailability(existingAvailabilies.id, data)
    return updatedAvailability;
}

export async function removeAvailabilities(availabilityId: number, userId: number){
    const existingAvailabilies = await getAvailabilityById(availabilityId);
    if(!existingAvailabilies) {
        throw notFoundError('This availabilty does not exist');
    }

    if(existingAvailabilies.userId != userId){
        throw forbiddenError("You are not allowed to update this availability.")
    }
    return await deleteAvailability(availabilityId);
}