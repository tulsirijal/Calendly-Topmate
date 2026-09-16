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