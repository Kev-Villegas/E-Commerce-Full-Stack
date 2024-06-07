import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    id: number;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <h1>{product.name}</h1>
    </div>
  );
};

export default ProductPage;
