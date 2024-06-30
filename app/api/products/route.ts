/*eslint-disable no-unused-vars*/
import path from "path";
import { db } from "@/app/_lib/prisma";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { productSchema } from "@/app/_utils/validationSchemas";

export async function POST(request: any) {
  try {
    const data = await request.formData();
    const image = data.get("image");
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(
      process.cwd(),
      "public",
      "upload",
      "products",
      image.name,
    );
    await writeFile(filePath, buffer);
    const price = parseFloat(data.get("price") as string);
    const newProduct = await db.product.create({
      data: {
        name: data.get("name") as string,
        description: data.get("description") as string,
        price: price,
        imagePath: `/public/upload/products/${image.name}`,
      },
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Failed to create product", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const products = await db.product.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch products", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
