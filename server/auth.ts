import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
 import { db } from "./db"

 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [],
})