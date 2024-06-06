"use client";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";

interface ProductForm {
  name: string;
  description: string;
  price: number;
}

const NewProductPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ProductForm>();

  const onSubmit = async (data: ProductForm) => {
    try {
      await axios.post("/api/products", data);
      toast.success("Product added successfully!");
      router.push("/products");
    } catch (error) {
      console.error("Failed to create product", error);
      toast.error("Failed to add product.");
    }
  };

  return (
    <form className="max-w-xl space-y-5 p-5" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="flex justify-center text-center">Add A New Product</h3>
      <Input
        type="text"
        placeholder="Product Name"
        className="border-[1px] border-zinc-800"
        {...register("name")}
      />
      <Input
        type="text"
        placeholder="Product Description"
        className="border-[1px] border-zinc-800"
        {...register("description")}
      />
      <Input
        type="number"
        step="0.01"
        placeholder="Product Price"
        className="border-[1px] border-zinc-800"
        {...register("price")}
      />
      <Button type="submit">Add Product</Button>
    </form>
  );
};

export default NewProductPage;
