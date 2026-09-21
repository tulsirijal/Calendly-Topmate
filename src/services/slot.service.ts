import { DateTime } from "luxon";
import { prisma } from "../config/db.js"
import { getAvailabilityByUserId } from "../repositories/availability.repository.js";
import { getAvailabilityExceptionByUserRange } from "../repositories/availability_exceptions.repository.js";
import { findActiveEventByHost } from "../repositories/event_types.repository.js";
import { blockSlots, getBookedSlotsByHostInRange, getFutureSlotsByEventTypeInRange, upsertSlots } from "../repositories/slot.repository.js";
import { applyExceptionsForDate, overlapsWithBookedSlots, splitSlots, TimeWindow, timeWindowForWeekdayLuxonCompatible } from "./slot_generation.service.js";

export interface RegenerateSlotsInput {
    hostId: number
    from?: string
    to?: string
}

export async function regenrateSlots(input: RegenerateSlotsInput) {
    const host = await prisma.user.findUnique({
        where: {
            id: input.hostId
        }
    });

    if (!host) {
        return;
    }

    const from = input.from ? DateTime.fromISO(input.from, { zone: 'utc' }).startOf('day') : DateTime.now().startOf('day').toUTC();
    const to = input.to ? DateTime.fromISO(input.to, { zone: 'utc' }).endOf('day') : from.plus({ days: 30 }).endOf('day').toUTC();

    const [availability, exception, activeEvent, bookedSlot] = await Promise.all([
        getAvailabilityByUserId(host.id),
        getAvailabilityExceptionByUserRange(host.id, from.toJSDate(), to.toJSDate()),
        findActiveEventByHost(host.id),
        getBookedSlotsByHostInRange(host.id, from.toJSDate(), to.toJSDate())
    ]);

    const bookedTimeWindows: TimeWindow[] = bookedSlot.map((slot) => {
        return {
            startTime: DateTime.fromJSDate(slot.startTime, { zone: 'utc' }),
            endTime: DateTime.fromJSDate(slot.endTime, { zone: 'utc' })
        }
    });

    for (const eventType of activeEvent) {
        const generatedCustomeSlodId = new Set<string>();
        for (let cursor = from; cursor <= to; cursor = cursor.plus({ day: 1 })) {
            const dateKey = cursor.toISODate();
            const dayExceptions = exception.filter((ex) => DateTime.fromJSDate(ex.date, { zone: 'utc' }).toISODate() == dateKey)
            const dayExceptionWithTimeZone = dayExceptions.map((ex) => ({
                type: ex.type,
                startTime: ex.startTime,
                endTime: ex.endTime,
                timezone: ex.timezone
            }))
            let timeWindows: TimeWindow[] = []

            // convert it to luxon compatible

            for (const available of availability) {
                timeWindows.push(...timeWindowForWeekdayLuxonCompatible(cursor, available.dayOfWeek, available.startTime, available.endTime, available.timezone))
            }

            timeWindows = applyExceptionsForDate(cursor, timeWindows, dayExceptionWithTimeZone);

            const slots = splitSlots(timeWindows, eventType.durationMinutes, eventType.bufferTimeBeforeMinutes, eventType.bufferTimeAfterMinutes);
            const filteredSlots = slots.filter
                ((slot) => slot.startTime > DateTime.utc() && !overlapsWithBookedSlots(slot, bookedTimeWindows, eventType.bufferTimeBeforeMinutes, eventType.bufferTimeAfterMinutes))

            for (const slot of filteredSlots) {
                const startTime = slot.startTime.toUTC().toJSDate();
                const endTime = slot.endTime.toUTC().toJSDate();

                const customSlotId = `${eventType.id}|${startTime.toISOString()}|${endTime.toISOString()}`
                generatedCustomeSlodId.add(customSlotId);
                await upsertSlots(host.id, eventType.id, startTime, endTime)
            }

        }

        const futureSlots = await getFutureSlotsByEventTypeInRange(eventType.id, from.toJSDate(), to.toJSDate());

        for (const slot of futureSlots) {
            const customSlotId = `${eventType.id}|${slot.startTime.toISOString()}|${slot.endTime.toISOString()}`
            if (!generatedCustomeSlodId.has(customSlotId)) {
                await blockSlots(slot.id)
            }

        }

    }


}