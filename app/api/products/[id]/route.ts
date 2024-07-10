import path from "path";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/app/_lib/prisma";
import { writeFile, unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
// import { productSchema } from "@/app/_utils/validationSchemas";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);

    // const validation = productSchema.safeParse({
    //   image,
    //   name,
    //   description,
    //   price,
    // });
    // if (!validation.success)
    //   return NextResponse.json(validation.error.format(), { status: 400 });

    const product = await db.product.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!product)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    let imagePath = product.imagePath;

    if (image && (image as File).arrayBuffer) {
      const imageFile = image as File;
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const originalFileName = imageFile.name;
      const extension = path.extname(originalFileName);
      const uniqueFileName = `${uuidv4()}${Date.now()}${Math.random().toString(36).substring(2, 15)}${extension}`;
      const filePath = path.join(
        process.cwd(),
        "public",
        "upload",
        "products",
        uniqueFileName,
      );
      await writeFile(filePath, buffer);

      // Deleting the old image if it exists
      if (imagePath) {
        const oldImagePath = path.join(process.cwd(), "public", imagePath);
        await unlink(oldImagePath).catch((err) =>
          console.error("Failed to delete old image:", err),
        );
      }

      imagePath = `/upload/products/${uniqueFileName}`;
    }

    const updatedProduct = await db.product.update({
      where: { id: product.id },
      data: {
        name,
        description,
        price,
        imagePath,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Failed to update product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const product = await db.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  await db.product.delete({
    where: { id: product.id },
  });

  return NextResponse.json({});
}
