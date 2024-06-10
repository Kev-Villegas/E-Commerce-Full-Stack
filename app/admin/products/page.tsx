"use client";

import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { Product } from "@prisma/client";
import Search from "@/app/_components/Search";
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

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ProductsPage = () => {
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
    return <div>Failed to load products</div>;
  }

  if (!products) {
    return <Spinner />;
  }

  return (
    <div className="p-5">
      <Search />
      <div className="mb-4 flex justify-end px-2">
        <Button>
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
                <DeleteDialog productId={product.id} mutate={mutate} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsPage;
