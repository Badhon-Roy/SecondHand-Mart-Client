import { z } from "zod"

export const loginValidationSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email address"),
    password: z
        .string({ required_error: "Password is requires" })
        .min(6, "Password must be at least 6 characters")
        .max(8, "Password maximum 8 characters")
})