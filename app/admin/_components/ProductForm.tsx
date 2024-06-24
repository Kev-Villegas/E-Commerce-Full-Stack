"use client";

import { z } from "zod";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Product } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Spinner from "@/app/_components/Spinner";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/app/_utils/validationSchemas";
import { Label } from "@/app/_components/ui/label";

type ProductFormData = z.infer<typeof productSchema>;

const ProductForm = ({ product }: { product?: Product }) => {
  const [isSubmitting, setSubmitting] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (product) {
        await axios.patch("/api/products/" + product.id, data);
        toast.success("Product edited successfully!");
      } else {
        await axios.post("/api/products", data);
        toast.success("Product created successfully!");
      }
      router.push("/admin/products");
    } catch (error) {
      setSubmitting(false);
      console.error("Failed to create product", error);
      toast.error("Failed to add product.");
    }
  });

  return (
    <form className="max-w-xl p-5" onSubmit={onSubmit}>
      <h3 className="flex justify-center text-center font-medium">
        Add A New Product
      </h3>
      <Label className="text-base">Product Name</Label>
      <Input
        type="text"
        defaultValue={product?.name}
        placeholder="Product Name"
        className="mb-5 mt-[2px] border-[1px] border-zinc-800"
        {...register("name")}
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      <Label className="text-base">Product Description</Label>
      <Input
        type="text"
        placeholder="Product Description"
        defaultValue={product?.description!}
        className="mb-5 mt-[2px] border-[1px] border-zinc-800"
        {...register("description")}
      />
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}
      <Label className="text-base">Product Price</Label>
      <Input
        type="number"
        step="0.01"
        placeholder="Product Price"
        defaultValue={product?.price}
        className="mb-3 mt-[2px] border-[1px] border-zinc-800"
        {...register("price", { valueAsNumber: true })}
      />
      {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      <Button disabled={isSubmitting} type="submit" className="gap-2">
        {product ? "Update Product" : "Add Product"}{" "}
        {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};

export default ProductForm;