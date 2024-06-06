import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/app/_lib/prisma";

const createProductSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Product Name must be at least 4 characters!" })
    .max(255),
  description: z
    .string()
    .min(6, { message: "Product Description must be at least 6 characters!" })
    .max(255)
    .optional(),
  price: z
    .number()
    .min(2, { message: "The minimum price required to upload a product is 2" })
    .max(255),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createProductSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newProduct = await db.product.create({
    data: {
      name: body.name,
      description: body.description,
      price: body.price,
    },
  });

  return NextResponse.json(newProduct, { status: 201 });
}
