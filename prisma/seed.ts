const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

const products = [
  {
    name: "Classic White T-Shirt",
    description:
      "A timeless white t-shirt made from 100% cotton. Perfect for any casual occasion.",
    price: 19.99,
  },
  {
    name: "Denim Jeans",
    description:
      "Comfortable and stylish denim jeans with a modern fit. Great for everyday wear.",
    price: 49.99,
  },
  {
    name: "Leather Jacket",
    description:
      "A sleek leather jacket that adds a touch of edge to any outfit. Made from genuine leather.",
    price: 129.99,
  },
  {
    name: "Floral Summer Dress",
    description:
      "A beautiful floral dress perfect for the summer season. Light and breezy.",
    price: 39.99,
  },
  {
    name: "Sports Hoodie",
    description:
      "A comfortable hoodie ideal for sports and casual wear. Features a soft inner lining.",
    price: 29.99,
  },
];

async function main() {
  for (const product of products) {
    await prismaClient.product.create({
      data: product,
    });
  }
}

main()
  .then(() => {
    console.log("Database seeding carried out successfully!");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
