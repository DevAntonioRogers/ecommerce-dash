"use server"
import { actionClient } from "@/lib/safe-action"
import { revalidatePath } from "next/cache"
import { db } from "../db"
import { CustomersSchema, DeleteCustomerSchema } from "@/types/customer-schema"


export const addCustomer = actionClient
  .schema(CustomersSchema)
  .action(
    async ({ parsedInput: { name, image, orders } }) => {
      if (!image.trim()) {
        return {error: "Image is required"}
      }
      await db.customers.create({
        data: {
          name:name,
          image: image,
          orders: orders,
        }})
        
    revalidatePath("/", "layout")
    return {success: `Customer ${name} has been created`}
  })

export const deleteCustomer = actionClient
  .schema(DeleteCustomerSchema)
  .action(
    async ({ parsedInput: { id } }) => {
    await db.customers.delete({
      where: {id: id},
    })
    revalidatePath("/", "layout")
    return 
  })

