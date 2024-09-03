"use server"
import { actionClient } from "@/lib/safe-action"
import { revalidatePath } from "next/cache"
import { db } from "../db"
import { DeleteOrderSchema, OrderSchema } from "@/types/orders-schema"

export const addOrder = actionClient
  .schema(OrderSchema)
  .action(
    async ({ parsedInput: {customerName, address,orderNumber, totalAmount, } }) => {

      const existingOrder = await db.orders.findFirst({
        where: {orderNumber}
      })

      if (existingOrder) {
        return {error: `Order Number ${orderNumber} is already taken`}
      }
      await db.orders.create({
        data: {
          customerName:customerName,
          address: address,
          orderNumber: orderNumber,
          totalAmount: totalAmount,
        }})
    revalidatePath("/", "layout")
    return {success: `Order Number ${orderNumber} has been created`}
  })

  export const deleteOrder = actionClient
  .schema(DeleteOrderSchema)
  .action(
    async ({ parsedInput: { id} }) => {
      await db.orders.delete({
        where: {id: id}
        })
    revalidatePath("/", "layout")
    return
  })