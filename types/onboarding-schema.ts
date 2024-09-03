import {z} from "zod"

export const OnboardingSchema = z.object({
  image: z.string(),
  location: z.string().min(2, {
    message: "Location must be more than 1 character"
  })
})