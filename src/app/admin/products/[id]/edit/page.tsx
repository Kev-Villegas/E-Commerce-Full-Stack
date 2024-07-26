import { db } from "@/src/_lib/prisma";
import ProductForm from "../../../_components/ProductForm";
import { notFound } from "next/navigation";

interface ProductEditProps {
  params: {
    id: string;
  };
}

const EditProductPage = async ({ params }: ProductEditProps) => {
  const product = await db.product.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!product) {
    return notFound();
  }
  return <ProductForm product={product} />;
};

export default EditProductPage;
