"use server";

import { db } from "@/src/_lib/prisma";

export const searchForProducts = async (search: string) => {
  const products = await db.product.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return products;
};
