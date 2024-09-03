"use server"
import { OnboardingSchema } from "@/types/onboarding-schema"
import { actionClient } from "@/lib/safe-action"
import { db } from "../db"
import { revalidatePath } from "next/cache"
import { auth } from "../auth"
import { redirect } from "next/navigation"

export const Onboarding = actionClient.schema(OnboardingSchema).action(
  async ({parsedInput: {image, location}}) => {
    const user = await auth()

    if (!user) {
      redirect("/login")
    }

    if (!image.trim()){
      return {error: "Must upload an image"}
    }

    await db.user.update({
      where: {
        email: user.user?.email as string
      },
      data: {
        image: image,
        location: location
      }
    })
     revalidatePath("/onboarding") 
  })