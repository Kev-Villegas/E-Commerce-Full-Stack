import path from "path";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/src/_lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
      const uniqueFileName = `${uuidv4()}${Date.now()}${Math.random()
        .toString(36)
        .substring(2, 15)}${extension}`;

      const imageResponse = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "fenix-app-images",
                filename_override: uniqueFileName,
                unique_filename: true,
                public_id: uniqueFileName,
              },
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(new Error("Image upload failed"));
                }
              },
            )
            .end(buffer);
        },
      );

      // !Delete the old image if it exists on Cloudinary
      if (imagePath) {
        const publicId = imagePath.split("/").slice(-1)[0].split(".")[0]; // Extract public ID
        await cloudinary.uploader
          .destroy(`fenix-app-images/${publicId}`)
          .catch((err) =>
            console.error("Failed to delete old image on Cloudinary:", err),
          );
      }

      imagePath = `${imageResponse.secure_url}`;
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
