import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product Name must be at least 3 characters!" })
    .max(255, { message: "Product Name must be at most 255 characters!" }),
  description: z
    .string()
    .min(12, {
      message: "Description must be at least 12 characters!",
    })
    .max(255, {
      message: "Description must be at most 255 characters!",
    }),
  price: z
    .number({ message: "Price must be a number!" })
    .positive({ message: "Price must be a positive number!" })
    .min(6, { message: "The minimum price required to upload a product is 6" })
    .max(999, { message: "The maximum price allowed is 999" }),
});
