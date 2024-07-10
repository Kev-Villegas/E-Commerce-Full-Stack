/*eslint-disable no-unused-vars*/
"use client";

import { z } from "zod";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { Product } from "@prisma/client";
import { useForm } from "react-hook-form";
import Spinner from "@/app/_components/Spinner";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Button } from "@/app/_components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { productSchema } from "@/app/_utils/validationSchemas";

type ProductFormData = z.infer<typeof productSchema>;

const ProductForm = ({ product }: { product?: Product }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const router = useRouter();
  const params = useParams();
  const form = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    if (file) {
      formData.append("image", file);
    }

    try {
      setSubmitting(true);
      if (!params.id) {
        await axios.post("/api/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Product created successfully!");
      } else {
        await axios.patch("/api/products/" + params.id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Product edited successfully!");
      }
      router.refresh();
      router.push("/admin/products");
    } catch (error) {
      setSubmitting(false);
      console.error("Failed to create or update product:", error);
      toast.error("Failed to create or update product.");
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex">
      <form
        className="mb-4 rounded-md bg-white px-8 pb-8 pt-6 shadow-md"
        onSubmit={onSubmit}
        ref={form}
      >
        <Label>Product Name</Label>
        <Input
          className="mb-5 mt-[2px] border-[1px] border-zinc-800"
          defaultValue={product?.name}
          placeholder="Product Name..."
          {...register("name")}
          name="name"
          type="text"
          autoFocus
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <Label>Product Description</Label>
        <Input
          className="mb-5 mt-[2px] border-[1px] border-zinc-800"
          defaultValue={product?.description}
          placeholder="Product Description..."
          {...register("description")}
          name="description"
          type="text"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
        <Label>Product Price</Label>
        <Input
          className="mb-5 mt-[2px] border-[1px] border-zinc-800"
          defaultValue={product?.price}
          placeholder="Product Price..."
          {...register("price", { valueAsNumber: true })}
          type="number"
          name="price"
          step="0.01"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
        <Label>Product Image</Label>
        <Input
          className="mb-5 mt-[2px] border-[1px] border-zinc-800"
          placeholder="Product Image..."
          {...register("image")}
          onChange={handleFileChange}
          name="image"
          accept="image/jpeg, image/jpg, image/png, image/webp"
          type="file"
        />
        {errors.image && typeof errors.image.message === "string" && (
          <p className="text-red-500">{errors.image.message}</p>
        )}
        {file && (
          <Image
            className="mx-auto my-4 w-96 object-contain"
            src={URL.createObjectURL(file)}
            alt=""
            width={200}
            height={200}
          />
        )}
        <Button disabled={isSubmitting} type="submit" className="gap-2">
          {params.id ? "Update Product" : "Create Product"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;
