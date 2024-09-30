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
  CardContent,
} from "@/src/_components/ui/card";
import { Separator } from "./ui/separator";
import { ShoppingCart } from "lucide-react";

interface ProductItemProps {
  product: Product;
  className?: string;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Card className="flex h-full w-full max-w-xs flex-col rounded-xl border border-white/25 bg-zinc-950">
      <CardHeader className="relative h-48 w-full overflow-hidden rounded-t-xl">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.imagePath!}
            alt={product.name}
            quality={90}
            layout="fill"
            objectFit="cover"
            className="mb-2 rounded-b-md"
          />
        </Link>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-[6px]">
        <CardTitle className="break-words text-slate-200">
          <Link
            href={`/products/${product.id}`}
            className="cursor-pointer transition-all duration-300 hover:text-blue-800"
          >
            {product.name}
          </Link>
        </CardTitle>
        <Separator className="mb-1 mt-2" />
        <CardDescription className="line-clamp-3 break-words text-slate-400">
          {product.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between p-2">
        <h3 className="items-start text-base font-medium text-slate-300">
          ${product.price}
        </h3>
        <Button
          className="w-fit bg-slate-300 p-2 hover:bg-zinc-800 hover:text-zinc-100"
          size="icon"
          asChild
        >
          <Link className="text-stone-900" href={`/products/${product.id}`}>
            <ShoppingCart />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
