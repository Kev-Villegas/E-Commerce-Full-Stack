import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@prisma/client";
import { Button } from "./ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/_components/ui/card";

interface ProductItemProps {
  product: Product;
  className?: string;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Card className="mx-auto flex h-[280px] w-min min-w-[200px] flex-col bg-zinc-950">
      <CardHeader className="flex flex-1 flex-col">
        <div className="w-full">
          <Image
            src={product.imagePath!}
            alt={product.name}
            quality={90}
            width={185}
            height={100}
            className="mb-2 w-full rounded-b-lg rounded-t-xl"
          />
        </div>
        <CardTitle className="flex px-1 py-1 text-slate-200">
          <span>{product.name}</span>
        </CardTitle>
        <CardDescription className="px-1 text-slate-400">
          <span>{product.description}</span>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between px-1">
        <h3 className="justify-end p-1 text-base font-medium text-slate-300">
          ${product.price}
        </h3>
        <Button className="w-fit" size="sm">
          <Link href={`/products/${product.id}`}>View Product</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
