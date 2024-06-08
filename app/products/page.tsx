import { Suspense } from "react";
import Products from "./_components/Product";

const ProductsPage = () => {
  return (
    <Suspense>
      <Products />
    </Suspense>
  );
};

export default ProductsPage;
