import {z} from "zod";

export const createEventTypeSchema = z.object({
    title: z.string().min(1, {message: "Title is required"}).max(100, {message: "Title must be less than 100 characters"}),
    description: z.string().max(500, {message: "Description must be less than 500 characters"}).optional(),
    slug: z.string().min(1, {message: "Slug is required"}).max(100, {message: "Slug must be less than 100 characters"}).optional(),
    durationMinutes: z.number().int().positive({message: "Duration must be a positive integer"}),
    locationType: z.enum(["online", "in-person"], {message: "Location type must be either 'online' or 'in-person'"}),
    locationValue: z.string().max(200, {message: "Location value must be less than 200 characters"}).optional(),
    bufferTimeBeforeMinutes: z.number().int().min(0, {message: "Buffer time before must be a non-negative integer"}).optional(),
    bufferTimeAfterMinutes: z.number().int().min(0, {message: "Buffer time after must be a non-negative integer"}).optional(),
    isActive: z.boolean().optional(),
});
export const updateEventTypeSchema = createEventTypeSchema.partial();

export type CreateEventTypeDTO = z.infer<typeof createEventTypeSchema>;
export type UpdateEventTypeDTO = z.infer<typeof updateEventTypeSchema>;