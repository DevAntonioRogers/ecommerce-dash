"use server"

import {Resend} from "resend"

const loginDomain = "http://localhost:3000/login"
const registerDomain = "http://localhost:3000/register"
const resend = new Resend(process.env.RESEND_API_KEY)

export const sendApprovalEmail = async (email: string,  name: string | null | undefined) => {
  const {data, error} = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: "ar919061493@gmail.com",
    subject: "Your Nexa Dashboard Account has been Approved!",
    html: `<p>Hey ${name} your account has been approved! Please login here  <a href=${loginDomain}>Here</a></p>`
  })
  if (error) return console.log(error)
    if (data) return data
}

export const sendDeclineEmail = async (email: string, name: string) => {
  const {data, error} = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: "ar919061493@gmail.com",
    subject: "Your Nexa Dashboard Account has been Declined!",
    html: `<p>Hey ${name} unfortunately your account has been declined! If you think this is a mistake please register again <a href=${registerDomain}>Here</a></p>`
  })
  if (error) return console.log(error)
    if (data) return data
}