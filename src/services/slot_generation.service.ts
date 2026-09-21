import { DateTime, Interval } from "luxon"

export interface TimeWindow {
    startTime: DateTime,
    endTime: DateTime
}

export interface Exception {
    type: string
    startTime: string | null
    endTime: string | null
    timezone: string
}

export function parseTimeOnDate(date: DateTime, time: string, timezone: string) {
    const givenTime = time.split(":");
    const hours = parseInt(givenTime[0]);
    const minutes = parseInt(givenTime[1]);
    return date.setZone(timezone).set({ hour: hours, minute: minutes, second: 0, millisecond: 0 })
}

export function mergeTimeIntervals(timeWindows: TimeWindow[]) {
    if (timeWindows.length === 0) {
        return [];
    }
    // [{startTime:9:00, endTime: 12:00}, {startTime:11:00, endTime:14:00}, {15:00, 17:00}, {17:00, 19:00}]
    const sortedIntervals = [...timeWindows].sort((a, b) => a.startTime.toMillis() - b.startTime.toMillis());
    const merged = [sortedIntervals[0]];

    for (let i = 1; i < sortedIntervals.length; i++) {
        const current = sortedIntervals[i];
        const last = merged[merged.length - 1];

        if (current.startTime <= last.endTime) {
            last.endTime = last.endTime > current.endTime ? last.endTime : current.endTime;
        } else {
            merged.push(current);
        }
    }
    return merged;
}

export function splitSlots(timeWindows: TimeWindow[], durationMinutes: number, bufferBeforeMinutes: number, bufferAfterMinutes: number) {
    const slots: TimeWindow[] = [];
    const totalMinutes = durationMinutes + bufferBeforeMinutes + bufferAfterMinutes;

    for (const timeWindow of timeWindows) {
        let cursor = timeWindow.startTime;
        while (cursor.plus({ minutes: totalMinutes }) <= timeWindow.endTime) {
            const slotStart = cursor.plus({ minutes: bufferBeforeMinutes });
            const slotEnd = slotStart.plus({ minutes: durationMinutes });

            slots.push({ startTime: slotStart, endTime: slotEnd });
            cursor = cursor.plus({ minutes: durationMinutes });
        }
    }

    return slots;

}

export function subtractTimeWindows(timeWindows: TimeWindow[], blockTime: TimeWindow) {
    const results: TimeWindow[] = [];
    const blockInterval = Interval.fromDateTimes(blockTime.startTime, blockTime.endTime);
    for (const timeWindow of timeWindows) {
        const currentInterval = Interval.fromDateTimes(timeWindow.startTime, timeWindow.endTime);

        if (!currentInterval.overlaps(blockInterval)) {
            results.push(timeWindow)
            return results;
        }

        if (blockTime.startTime > timeWindow.startTime) {
            results.push({ startTime: timeWindow.startTime, endTime: blockTime.startTime });
        }

        if (blockTime.endTime < timeWindow.endTime) {
            results.push({ startTime: blockTime.endTime, endTime: timeWindow.endTime });
        }
    }

    return results;
}

export function overlapsWithBookedSlots(slot: TimeWindow, bookedSlots: TimeWindow[], bufferBeforeMinutes: number, bufferAfterMinutes: number) {
    const bufferBeforeStart = slot.startTime.minus({ minutes: bufferBeforeMinutes });
    const bufferAfterStart = slot.endTime.plus({ minutes: bufferAfterMinutes });

    return bookedSlots.some((b) => {
        const interval = Interval.fromDateTimes(bufferBeforeStart, bufferAfterStart);
        const bookedInterval = Interval.fromDateTimes(b.startTime, b.endTime);
        return bookedInterval.overlaps(interval);
    })
}


export function applyExceptionsForDate(date: DateTime, baseWindows: TimeWindow[], exceptions: Exception[]) {
    let timeWindows = [...baseWindows];
    for (const exception of exceptions) {
        if (exception.type == "BLOCK_FULL_DAY") {
            return [];
        }

        if (exception.type == "BLOCK_PARTIAL_DAY" && exception.startTime && exception.endTime) {
            const block = { 
                startTime: parseTimeOnDate(date, exception.startTime, exception.timezone), 
                endTime: parseTimeOnDate(date, exception.endTime, exception.timezone) 
            }
            timeWindows = subtractTimeWindows(timeWindows, block);
        }

        if(exception.type=="ADD_AVAILABLE_WINDOW" && exception.startTime && exception.endTime){
            timeWindows.push({
                startTime:parseTimeOnDate(date,exception.startTime,exception.timezone),
                endTime:parseTimeOnDate(date,exception.endTime,exception.timezone)
            })
        }
    }

    return mergeTimeIntervals(timeWindows);
}

export function timeWindowForWeekdayLuxonCompatible(date: DateTime, weekday:number, startTime:string, endTime: string, timezone: string){
    const localDate = date.setZone(timezone).startOf('day');
    const luxonWeekDay = weekday=== 0 ? 7 : weekday;

    const start = parseTimeOnDate(localDate,startTime,timezone);
    const end = parseTimeOnDate(localDate,endTime, timezone)

    if(!start.isValid || !end.isValid || start >= end){
        return [];
    };

    return [{startTime: start,endTime: end}];
}