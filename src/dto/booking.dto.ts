import {z} from 'zod';

export const createBookingSchema = z.object({
    slotId: z.string(),
    attendeeName: z.string(),
    attendeeEmail: z.email('Invalid Email Address'),
    attendeeNotes: z.string().optional(),

})

export type CreateBookingDTO = z.infer<typeof createBookingSchema>