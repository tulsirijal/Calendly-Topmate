import { prisma } from "../config/db.js";
import { DbClient, getDbClient } from "../config/transaction-db.js";

export interface BookingUpdate{
    slotId: string,
    hostId: number,
    eventTypeId: number,
    attendeeName: string,
    attendeeEmail: string,
    attendeeNotes?: string
}

export async function createBooking(data:BookingUpdate, db?: DbClient){
    const client = getDbClient(db);
   return  await client.booking.create({
        data:{
            ...data,
            status:"CONFIRMED"
        },
        include:{
            slot: true
        }
    })
}

export async function getAllBookingsForHost(hostId: number){
    return await prisma.booking.findMany({
        where:{
            hostId
        },
        include:{
            slot:true
        }
    })
}