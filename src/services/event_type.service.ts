import {createEventType, deleteEventType, getAllEventTypes, findEventTypeById, updateEventType, findEventTypeByHostId} from "../repositories/event_types.repository.js";
import {CreateEventTypeDTO, UpdateEventTypeDTO} from "../dto/event_type.dto.js";
import { forbiddenError, notFoundError} from "../utils/api-error.js";
import { findUserById } from "../repositories/user.repository.js";

export async function findAllEventTypes() {
    const eventTypes = await getAllEventTypes();
    return eventTypes;
}

export async function findEventTypeByID(id: number, hostId?: number) {
    const eventType = await findEventTypeById(id);
    if (!eventType) {
        throw notFoundError("Event type not found");
    }
    if (hostId && eventType.hostId !== hostId) {
        throw forbiddenError("You are not authorized to access this event type");
    }
    return eventType;
}

export async function findEventTypePublicByID(id: number, hostId: number) {
    const eventType = await findEventTypeById(id);
    const user = await findUserById(hostId);
    if (!eventType) {
        throw notFoundError("Event type not found");
    }
    if (!user) {
        throw notFoundError("User not found");
    }
    return {
        eventType: {
            id: eventType.id,
            title: eventType.title,
            description: eventType.description,
            durationMinutes: eventType.durationMinutes,
            locationType: eventType.locationType,
        },
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    };
}

export async function findEventTypesByHostID(hostId: number) {
    const eventTypes = await findEventTypeByHostId(hostId);
    if (!eventTypes || eventTypes.length === 0) {
        throw notFoundError("No event types found for this host");
    }
    return eventTypes;
}

export async function updateEventTypeById(id: number, data: UpdateEventTypeDTO) {
    const existingEventType = await findEventTypeById(id);
    if (!existingEventType) {
        throw notFoundError("Event type not found");
    }
    const updatedEventType = await updateEventType(id, data);
    return updatedEventType;
}

export async function createNewEventType(data: CreateEventTypeDTO & { hostId: number }) {
    const newEventType = await createEventType(Number(data.hostId), data);
    return newEventType;
}

export async function deleteEventTypeById(id: number, hostId: number) {
    const existingEventType = await findEventTypeById(id);
    if (!existingEventType) {
        throw notFoundError("Event type not found");
    }
    if (existingEventType.hostId !== hostId) {
        throw forbiddenError("You are not authorized to delete this event type");
    }
    return await deleteEventType(id);
}   