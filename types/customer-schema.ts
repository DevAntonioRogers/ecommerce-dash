import * as z from "zod"


export const CustomersSchema = z.object({
  id: z.string().optional(),
  image: z
    .string(),
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters long",
    }),
  orders: z.coerce.number({
      message: "Orders must be a positive number",
    }),
});


export const DeleteCustomerSchema = z.object({
  id: z.string(),
});


