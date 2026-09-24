import type {slot} from '../../generated/prisma/client.js'
import { prisma } from '../config/db.js';
import { CreateBookingDTO } from '../dto/booking.dto.js';
import { createBooking, getAllBookingsForHost } from '../repositories/booking.repository.js';
import { findSlotById, markSlotBooked } from '../repositories/slot.repository.js';
import { startRegenrateSlotsWorkflows } from '../temporal/client.js';
import { badRequestError, notFoundError } from '../utils/api-error.js'


export async function triggerRegenerateSlots(hostId:number, startTime:Date){
    const from = startTime.toISOString().split('T')[0]

    await startRegenrateSlotsWorkflows({hostId,from:from, to:from});
}

export function validateSlotForBooking(slot: slot | null){
    if(!slot){
        throw notFoundError("slot not found")
    }
    if(slot?.status !== "AVAILABLE"){
        throw badRequestError("Slot not available");
    };

    if(slot?.startTime <= new Date()){
        throw badRequestError("Slot not available");
    }

    return slot;
}

export async function createBookingOptimistic(bookingData: CreateBookingDTO){
    const booking = await prisma.$transaction(async(tx)=>{
        const slot = validateSlotForBooking(await findSlotById(bookingData.slotId, tx));
        const updatedSlot = await markSlotBooked(slot.id, tx);
        if(updatedSlot.count !== 1){
            throw badRequestError("Slot not available")
        }
        return await createBooking({
            hostId:slot.hostId,
            eventTypeId: slot.eventTypeId,
            slotId:slot.id,
            attendeeEmail: bookingData.attendeeEmail,
            attendeeName: bookingData.attendeeName,
            attendeeNotes: bookingData.attendeeNotes
        }, tx)

    });
    await triggerRegenerateSlots(booking.slot.hostId, booking.slot.startTime);
    return booking;
}


export async function getAllBookings(hostId:number){
    return await getAllBookingsForHost(hostId);
}