"use client";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchForProducts } from "./_action/search";
import ProductItem from "../_components/ProductItem";

const Products = () => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const searchFor = searchParams.get("search");
      if (!searchFor) return;
      const foundProducts = await searchForProducts(searchFor);
      setProducts(foundProducts);
    };
    fetchProducts();
  }, [searchParams]);

  return (
    <>
      <div className="px-5 py-6">
        <h2 className="mb-6 text-xl font-semibold">Products Found</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
