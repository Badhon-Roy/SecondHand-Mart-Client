import { z } from "zod"

export const registerValidationSchema = z.object({
    name: z
        .string({ required_error: "Name is requires" })
        .min(2, "First name must be between 2 and 30 characters")
        .max(30, "First name must be between 2 and 30 characters"),
    email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email address"),
    avatar: z.string(),
    password: z
        .string({ required_error: "Password is requires" })
        .min(6, "Password must be at least 6 characters")
        .max(8, "Password maximum 8 characters")
})