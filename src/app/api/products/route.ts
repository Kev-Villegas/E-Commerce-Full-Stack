/*eslint-disable no-unused-vars*/
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/src/_lib/prisma";
import { writeFile } from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const price = parseFloat(data.get("price") as string);
    const image = data.get("image");

    if (!image || typeof image === "string") {
      return NextResponse.json(
        { error: "No image received or image is not valid." },
        { status: 400 },
      );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const originalFileName = image.name;
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
    const newProduct = await db.product.create({
      data: {
        name: data.get("name") as string,
        description: data.get("description") as string,
        price: price,
        imagePath: `${imageResponse.secure_url}`,
      },
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Failed to create product :(", error);
    return NextResponse.json(
      { error: "Failed to create product :(" },
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
