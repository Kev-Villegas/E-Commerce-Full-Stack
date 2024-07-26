import { z } from "zod";

const imageMaxUploadSize = 1024 * 1024 * 3; // 3mb
const acceptedImageTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product Name must be at least 3 characters!" })
    .max(255, { message: "Product Name must be at most 255 characters!" }),
  description: z
    .string()
    .min(12, { message: "Description must be at least 12 characters!" })
    .max(255, { message: "Description must be at most 255 characters!" }),
  price: z
    .number({ message: "Price must be a number!" })
    .positive({ message: "Price must be a positive number!" })
    .min(6, { message: "The minimum price required to upload a product is 6" })
    .max(999, { message: "The maximum price allowed is 999" }),
  image: z
    .any()
    .refine((files) => files?.length >= 1, { message: "Image is required." })
    .refine(
      (files) => files?.[0]?.size <= imageMaxUploadSize,
      "Max image size is 3MB.",
    )
    .refine(
      (files) => acceptedImageTypes.includes(files?.[0]?.type),
      "Only .jpeg, .jpg, .png and .webp images are allowed.",
    ),
});

export const clientSchema = z.object({
  firstName: z
    .string({
      required_error: "First Name is required!",
      invalid_type_error: "First Name must be a string!",
    })
    .min(3, { message: "First Name must be at least 3 characters!" })
    .max(255, { message: "First Name must be at most 255 characters!" }),
  lastName: z
    .string({
      required_error: "Last Name is required!",
      invalid_type_error: "Last Name must be a string!",
    })
    .min(3, { message: "Last Name must be at least 3 characters!" })
    .max(255, { message: "Last Name must be at most 255 characters!" }),
  email: z
    .string({
      required_error: "Email is required!",
      invalid_type_error: "Email must be a string!",
    })
    .email({ message: "Email must be a valid email address!" })
    .min(3, { message: "Email must be at least 3 characters!" })
    .max(255, { message: "Email must be at most 255 characters!" }),
  phone: z
    .string({
      required_error: "Phone is required!",
    })
    .min(6, { message: "Phone must be at least 6 characters!" })
    .max(15, { message: "Phone must be at most 15 characters!" })
    .refine((value) => /^[+]{1}(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/.test(value), {
      message: "Phone must be a valid phone number!",
    }),
  address: z
    .string({
      required_error: "Address is required!",
      invalid_type_error: "Address must be a string!",
    })
    .min(6, { message: "Address must be at least 6 characters!" })
    .max(255, { message: "Address must be at most 255 characters!" }),
  dni: z
    .number({
      required_error: "DNI is required!",
    })
    .positive({ message: "DNI must be a positive number!" })
    .int({ message: "DNI must be an integer!" })
    .refine(
      (value) => {
        const length = value.toString().length;
        return length >= 7 && length <= 8;
      },
      { message: "DNI must be between 7 and 8 digits!" },
    ),
  cuil: z
    .number({
      required_error: "CUIL is required!",
      invalid_type_error: "CUIL must be a number!",
    })
    .positive({ message: "CUIL must be a positive number!" })
    .int({ message: "CUIL must be an integer!" })
    .refine((value) => value.toString().length === 11, {
      message: "CUIL must be exactly 11 digits!",
    }),
});
