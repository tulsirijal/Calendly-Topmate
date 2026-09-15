
import {z} from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
export const createAvailabilityExceptionSchema = z.object({
    userId: z.number().int().positive({message: "User ID must be a positive integer"}),
    date: z.string().regex(dateRegex, {message: "Date must be in YYYY-MM-DD format"}),
    type: z.enum(["BLOCK_FULL_DAY", "BLOCK_PARTIAL_DAY", "ADD_AVAILABLE_WINDOW"]),
    startTime: z.string().regex(timeRegex, {message: "Start time must be in HH:mm format"}).optional(),
    endTime: z.string().regex(timeRegex, {message: "End time must be in HH:mm format"}).optional(),
    reason: z.string().max(255, {message: "Reason must be at most 255 characters"}).optional(),
    timezone: z.string().default("UTC")
}).refine((data)=>{
    if (!data.startTime || !data.endTime) {
        return true;
    }
    const [startHour, startMinute] = data.startTime?.split(":").map(Number)
    const [endHour, endMinute] = data.endTime?.split(":").map(Number)

    const startTotalMinutes = startHour * 60 + startMinute
    const endTotalMinutes = endHour * 60 + endMinute

    return startTotalMinutes < endTotalMinutes;

},
 {
    "path":["startTime"],
    "message": "Start time should be before the end time"
 }
);

export const updateAvailabilityExceptionSchema = createAvailabilityExceptionSchema.partial();

export type CreateAvailabilityExceptionDTO = z.infer<typeof createAvailabilityExceptionSchema>;
export type UpdateAvailabilityExceptionDTO = z.infer<typeof updateAvailabilityExceptionSchema>;