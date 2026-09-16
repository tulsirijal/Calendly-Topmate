import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;


const baseAvailabilityExceptionSchema = z.object({
    date: z.string().regex(dateRegex, { message: "Date must be in YYYY-MM-DD format" }),
    type: z.enum(["BLOCK_FULL_DAY", "BLOCK_PARTIAL_DAY", "ADD_AVAILABLE_WINDOW"]),
    startTime: z.string().regex(timeRegex, { message: "Start time must be in HH:mm format" }).optional(),
    endTime: z.string().regex(timeRegex, { message: "End time must be in HH:mm format" }).optional(),
    reason: z.string().max(255, { message: "Reason must be at most 255 characters" }).optional(),
    timezone: z.string().default("UTC")
});

export const createAvailabilityExceptionSchema = baseAvailabilityExceptionSchema.superRefine((data, context) => {
    if (data.type === "BLOCK_PARTIAL_DAY" || data.type === "ADD_AVAILABLE_WINDOW") {
        if (!data.startTime) {
            context.addIssue({ path: ["startTime"], code: "custom", message: "Start time should be specified." });
        }
        if (!data.endTime) {
            context.addIssue({ path: ["endTime"], code: "custom", message: "End time should be specified." });
        }
        if (data.startTime && data.endTime && data.startTime >= data.endTime) {
            context.addIssue({ path: ["endTime"], code: "custom", message: "End time must be greater than start time." });
        }
    }
});

export const updateAvailabilityExceptionSchema = baseAvailabilityExceptionSchema.partial().superRefine((data, context) => {
    if (data.startTime && data.endTime && data.startTime >= data.endTime) {
        context.addIssue({ path: ["endTime"], code: "custom", message: "End time must be greater than start time." });
    }
});

export type CreateAvailabilityExceptionDTO = z.infer<typeof createAvailabilityExceptionSchema>;
export type UpdateAvailabilityExceptionDTO = z.infer<typeof updateAvailabilityExceptionSchema>;