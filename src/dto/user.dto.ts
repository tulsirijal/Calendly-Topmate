import {z} from "zod";

export const createUserSchema = z.object({
    name: z.string().min(1, {message: "Name is required"}).max(50, {message: "Name must be less than 50 characters"}),
    email: z.email({message: "Invalid email address"})
});

export const updateUserSchema = z.object({
    name: z.string().min(1, {message: "Name is required"}).max(50, {message: "Name must be less than 50 characters"}).optional(),
    email: z.email({message: "Invalid email address"}).optional()
});



export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;