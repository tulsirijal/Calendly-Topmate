import {prisma} from "../config/db.js";

export async function getBookedSlotsByHostInRange(hostId: number, startDate: Date, endDate: Date){
    return prisma.slot.findMany({
        where:{
            hostId,
            startTime:{
                lte:endDate,
                gte: startDate
            },
            status:"BOOKED"
        }
    })
}

export async function upsertSlots(hostId: number, eventTypeId: number, start: Date, end: Date){
    return prisma.slot.upsert({
        where:{
            eventTypeId_startTime_endTime:{
                eventTypeId: eventTypeId,
                startTime:start,
                endTime:end
            }, 
        },
        create:{
            hostId,
            eventTypeId,
            startTime:start,
            endTime:end,
            status:"AVAILABLE"
        },
        update:{
            status:"AVAILABLE"
        }
    })
}