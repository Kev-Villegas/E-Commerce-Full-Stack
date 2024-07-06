"use client";

import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { Product } from "@prisma/client";
import Spinner from "@/app/_components/Spinner";
import { Button } from "@/app/_components/ui/button";
import DeleteDialog from "@/app/_components/DeleteDialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";

const ProductsPage = () => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const {
    data: products,
    error,
    mutate,
  } = useSWR<Product[]>("/api/products", fetcher, {
    revalidateOnFocus: true,
    refreshInterval: 1000,
    revalidateOnReconnect: true,
  });

  if (error) {
    return (
      <div className="p-5">
        <span className="text-lg font-medium text-red-600">
          Failed to load the products
        </span>
      </div>
    );
  }

  if (!products) {
    return <Spinner />;
  }

  const onDeleteProduct = async (id: number) => {
    await axios.delete(`/api/products/${id}`);
    mutate();
  };

  return (
    <div className="p-5">
      <div className="mb-4 flex justify-end px-2">
        <Button>
          <Link href="/admin/products/new">Add New Product</Link>
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell className="w-[125px]">
                <Button className="gap-2">
                  <Link href={`/admin/products/${product.id}/edit`}>
                    <div className="flex items-center">
                      <Pencil size={17} className="mr-2 text-slate-500" />
                      <span>Edit</span>
                    </div>
                  </Link>
                </Button>
              </TableCell>
              <TableCell className="w-[125px]">
                <DeleteDialog
                  itemType="Product"
                  title="Delete Product"
                  deleteButtonLabel="Delete"
                  alertDialogCancelText="Cancel"
                  onClickDeleteItem={() => onDeleteProduct(product.id)}
                  description="Are you sure you want to delete this product?"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsPage;
