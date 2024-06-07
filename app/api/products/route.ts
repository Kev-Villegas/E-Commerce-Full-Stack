import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/_lib/prisma";
import { productSchema } from "@/app/_utils/validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = productSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newProduct = await db.product.create({
    data: { name: body.name, description: body.description, price: body.price },
  });

  return NextResponse.json(newProduct, { status: 201 });
}
