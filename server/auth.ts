import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
 import { db } from "./db"
 import Credentials from "next-auth/providers/credentials"
 import { LoginSchema } from "@/types/login-schema"
 import bcrypt from "bcrypt"

 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      async authorize(credentials): Promise<any> {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (!validatedFields.success) {
          return null
        }

      if (validatedFields.success) {
        const {email, password} = validatedFields.data

        const user = await db.user.findUnique({
          where: {email}
        })

        if (!user || !user.hashedPassword) return null

        const passwordMatch = await bcrypt.compare(
          password, user.hashedPassword
        )
        if (passwordMatch) return user
      }
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  }
})