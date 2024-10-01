"use client";

import { Product } from "@prisma/client";
import Spinner from "@/src/_components/Spinner";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { searchForProducts } from "../_action/search";
import ProductItem from "@/src/_components/ProductItem";
import NoProductsFound from "@/src/_components/NoProductsFound";

const Products = () => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const searchFor = searchParams.get("search");
      if (!searchFor) {
        setProducts([]);
        setLoading(false);
        return;
      }
      try {
        const foundProducts = await searchForProducts(searchFor);
        setProducts(foundProducts);
      } catch (error) {
        console.error("Failed to fetch products", error);
        setProducts([]);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [searchParams]);

  return (
    <div className="px-5 py-6">
      {loading ? (
        <Spinner />
      ) : products.length === 0 ? (
        <NoProductsFound />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
