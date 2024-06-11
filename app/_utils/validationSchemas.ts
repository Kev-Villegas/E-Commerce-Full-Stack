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

export const clientSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First Name must be at least 3 characters!" })
    .max(255, { message: "First Name must be at most 255 characters!" }),
  lastName: z
    .string()
    .min(3, { message: "Last Name must be at least 3 characters!" })
    .max(255, { message: "Last Name must be at most 255 characters!" }),
  email: z
    .string()
    .email({ message: "Email must be a valid email address!" })
    .min(3, { message: "Email must be at least 3 characters!" })
    .max(255, { message: "Email must be at most 255 characters!" }),
  phone: z.string().min(6, { message: "Phone must be at least 6 characters!" }),
  address: z
    .string()
    .min(4, { message: "Address must be at least 4 characters!" })
    .max(255, { message: "Address must be at most 255 characters!" }),
  dni: z.number({ message: "DNI must be a number!" }).positive({
    message: "DNI must be a positive number!",
  }),
  cuil: z.number({ message: "CUIL must be a number!" }).positive({
    message: "CUIL must be a positive number!",
  }),
});
