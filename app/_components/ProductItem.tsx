import React from "react";
import { cn } from "../_lib/utils";
import { Product } from "@prisma/client";
import { Button } from "../_components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

interface ProductItemProps {
  product: Product;
  className?: string;
}

const ProductItem = ({ product, className }: ProductItemProps) => {
  return (
    <Card className={cn("border-[1px] border-stone-400", className)}>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="h-[90px]">
        <p>{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <h3 className="text-base font-medium">${product.price}</h3>
        <Button>
          <Link href={`/products/${product.id}`}>View Product</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
