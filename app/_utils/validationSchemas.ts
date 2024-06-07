import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Product Name must be at least 4 characters!" })
    .max(255),
  description: z.optional(
    z
      .string()
      .min(4, { message: "Description must be at least 4 characters!" })
      .max(255),
  ),
  price: z
    .number()
    .positive({ message: "Price must be a positive number!" })
    .min(2, { message: "The minimum price required to upload a product is 2" })
    .max(255),
});
