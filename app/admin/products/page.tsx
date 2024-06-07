import React from "react";
import { db } from "@/app/_lib/prisma";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Button } from "@/app/_components/ui/button";
import { Pencil } from "lucide-react";

import DeleteDialog from "@/app/_components/DeleteDialog";
import Link from "next/link";
// import DeleteDialog from "@/app/_components/DeleteDialog";

const ProductsPage = async () => {
  const products = await db.product.findMany({});
  return (
    <div className="p-5">
      <div className="mb-4 flex justify-end px-2">
        <Button className="">
          <Link href="/products/new">New Product</Link>
        </Button>
      </div>
      <Table>
        <TableCaption>Fenix Products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>
                <Button className="gap-2">
                  <Link href={`/products/${product.id}/edit`}>
                    <div className="flex items-center">
                      <Pencil size={17} className="mr-2 text-slate-500" />
                      <span>Edit</span>
                    </div>
                  </Link>
                </Button>
              </TableCell>
              <TableCell>
                <DeleteDialog productId={product.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsPage;
