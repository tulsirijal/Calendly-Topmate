import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;


const baseAvailabilitySchema = z.object({
    dayOfWeek: z.number().int().min(0, { message: "Day of week must be between 0 and 6" }).max(6, { message: "Day of week must be between 0 and 6" }),
    startTime: z.string().regex(timeRegex, { message: "Start time must be in HH:mm format" }),
    endTime: z.string().regex(timeRegex, { message: "End time must be in HH:mm format" }),
    isActive: z.boolean().default(true),
    timezone: z.string().default("UTC")
});


export const createAvailabilitySchema = baseAvailabilitySchema.refine(
    (data) => data.startTime < data.endTime,
    { message: "Start time should be less than end time.", path: ["endTime"] }
);

export const updateAvailabilitySchema = baseAvailabilitySchema.partial().refine(
    (data) => {
        if (data.startTime && data.endTime) {
            return data.startTime < data.endTime;
        }
        return true;
    },
    { message: "Start time should be less than end time.", path: ["endTime"] }
);

export type CreateAvailabilityDTO = z.infer<typeof createAvailabilitySchema>;
export type UpdateAvailabilityDTO = z.infer<typeof updateAvailabilitySchema>;