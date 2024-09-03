"use server"

import { revalidatePath } from "next/cache"
import { db } from "../db"
import { sendApprovalEmail, sendDeclineEmail } from "./email"
import { actionClient } from "@/lib/safe-action"
import { TeamSchema } from "@/types/team-schema"

export const approveTeamMember = actionClient.schema(TeamSchema).action(
  async({parsedInput: {email, name}}) => {
    await db.user.update({
      where: {email: email},
      data: {isApproved: true}
    })

    revalidatePath("/", "layout")
    await sendApprovalEmail(email, name)
    return
  }
)

export const declineTeamMember = actionClient
.schema(TeamSchema)
.action(
  async ({ parsedInput: { email, name } }) => {
  await db.user.delete({
    where: {email: email},
  })
  revalidatePath("/", "layout")
  await sendDeclineEmail(name!, email)
  return 
})

export const updateTeamMember = actionClient
.schema(TeamSchema)
.action(
  async ({ parsedInput: { email, isAdmin } }) => {
  await db.user.update({
    where: {email: email},
    data: {isAdmin: isAdmin}
  })
  revalidatePath("/", "layout")
  return 
})


export const deleteTeamMember = actionClient
.schema(TeamSchema)
.action(
  async ({ parsedInput: { email } }) => {
  await db.user.delete({
    where: {email: email},
  })
  revalidatePath("/", "layout")
  return 
})
