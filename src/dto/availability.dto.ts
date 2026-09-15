
import {z} from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
export const createAvailabilitySchema = z.object({
    userId: z.number().int().positive({message: "User ID must be a positive integer"}),
    dayOfWeek: z.number().int().min(0, {message: "Day of week must be between 0 and 6"}).max(6, {message: "Day of week must be between 0 and 6"}),
    startTime: z.string().regex(timeRegex, {message: "Start time must be in HH:mm format"}),
    endTime: z.string().regex(timeRegex, {message: "End time must be in HH:mm format"}),
    isActive: z.boolean().default(true),
    timezone: z.string().default("UTC")
}).refine((data)=> data.startTime < data.endTime, {error:"Start time should be less than end time."});

export const updateAvailabilitySchema = createAvailabilitySchema.partial();

export type UpdateAvailabilityDTO = z.infer<typeof updateAvailabilitySchema>;
export type CreateAvailabilityDTO = z.infer<typeof createAvailabilitySchema>;
