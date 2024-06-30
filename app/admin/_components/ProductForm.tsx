/*eslint-disable no-unused-vars*/
"use client";

import axios from "axios";
import Image from "next/image";
import Spinner from "@/app/_components/Spinner";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/app/_components/ui/button";
import { useRouter, useParams } from "next/navigation";

const ProductForm = () => {
  const router = useRouter();
  const params = useParams();
  const form = useRef<HTMLFormElement>(null);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (params.id) {
      axios.get("/api/products/" + params.id).then((res) => {
        setProduct({
          name: res.data.name,
          price: res.data.price,
          description: res.data.description,
        });
      });
    }
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());

    if (file) {
      formData.append("image", file);
    }

    try {
      if (!params.id) {
        await axios.post("/api/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.put("/api/products/" + params.id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      form.current?.reset();
      router.refresh();
      router.push("/admin/products");
    } catch (error) {
      console.error("Failed to create or update product:", error);
    }
  };

  return (
    <div className="flex">
      <form
        className="mb-4 rounded-md bg-white px-8 pb-8 pt-6 shadow-md"
        onSubmit={handleSubmit}
        ref={form}
      >
        <Label>Product Name</Label>
        <Input
          className="mb-5 mt-[2px] border-[1px] border-zinc-800"
          placeholder="Product Name..."
          onChange={handleChange}
          value={product.name}
          name="name"
          type="text"
          autoFocus
        />
        <Label>Product Description</Label>
        <Input
          className="mb-5 mt-[2px] border-[1px] border-zinc-800"
          placeholder="Product Description..."
          value={product.description}
          onChange={handleChange}
          name="description"
          type="text"
        />
        <Label>Product Price</Label>
        <Input
          className="mb-5 mt-[2px] border-[1px] border-zinc-800"
          placeholder="Product Price..."
          onChange={handleChange}
          value={product.price}
          type="number"
          name="price"
          step="0.01"
        />
        <Label>Product Image</Label>
        <Input
          className="mb-5 mt-[2px] border-[1px] border-zinc-800"
          placeholder="Product Description..."
          onChange={handleFileChange}
          name="image"
          type="file"
        />

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
