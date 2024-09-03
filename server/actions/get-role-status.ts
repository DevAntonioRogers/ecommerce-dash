"use server"

import { auth } from "../auth"
import { db } from "../db"

export const getRoleStatus = async () => {
  const session = await auth()

  if (!session || !session.user?.email){
    throw new Error("No session or user email found")
  }


  const user = await db.user.findUnique({
    where: {
      email: session.user.email
    },
    select: {
      isAdmin: true
    }
  })

  return user?.isAdmin
}