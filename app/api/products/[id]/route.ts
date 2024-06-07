import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { productSchema } from "@/app/_utils/validationSchemas";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const validation = productSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const product = await db.product.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const updatedProduct = await db.product.update({
    where: { id: product.id },
    data: {
      name: body.name,
      description: body.description,
      price: body.price,
    },
  });

  return NextResponse.json(updatedProduct, { status: 200 });
}
