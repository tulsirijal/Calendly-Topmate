import {prisma} from "../config/db.js";
import { CreateEventTypeDTO, UpdateEventTypeDTO } from "../dto/event_type.dto.js";

export async function getAllEventTypes(){
    const eventTypes = await prisma.eventType.findMany();
    return eventTypes;
}

export async function findEventTypeById(id: number) {
    const eventType = await prisma.eventType.findUnique({
        where: {
            id
        }
    });
    return eventType;
}

export async function findEventTypeByHostId(hostId: number) {
    const eventTypes = await prisma.eventType.findMany({
        where: {
            hostId
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return eventTypes;
}

export async function findActiveEventByHost(hostId: number){
    return prisma.eventType.findMany({
        where:{
            hostId,
            isActive:true
        }
    })
}

export async function createEventType(data: CreateEventTypeDTO & {hostId: number}){
    const eventType = await prisma.eventType.create({
        data
    });
    return eventType;
}

export async function updateEventType(id: number, data: UpdateEventTypeDTO) {
    const eventType = await prisma.eventType.update({
        where: {
            id
        },
        data
    });
    return eventType;
}

export async function deleteEventType(id: number) {
    await prisma.eventType.delete({
        where: {
            id
        }
    });
}

export async function findBySlug(slug: string) {
    const eventType = await prisma.eventType.findUnique({
        where: {
            slug
        }
    });
    return eventType;
}

