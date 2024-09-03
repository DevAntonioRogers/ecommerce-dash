import {z} from "zod"

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long"
  }),
  name: z.string().min(2, {message: "Plese add a name with at least 4 characters"})
})