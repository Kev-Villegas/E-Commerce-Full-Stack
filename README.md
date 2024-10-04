## Clothing E-Commerce
This is a clothing e-commerce project developed using Next.js, TypeScript, React.js, Prisma ORM, and Tailwind CSS. The application includes full CRUD functionality for managing products and customers. Additionally, Cloudinary is integrated for image upload and management in the cloud.

## Features
- Product CRUD: Allows creating, reading, updating, and deleting products from the admin panel.
- Customer CRUD: Manage customers, including registration, editing, and deletion.
- Image Upload: Product images are stored in Cloudinary.
- Responsive Design: Built with Tailwind CSS to adapt to various screen sizes.

## Technologies
- Next.js: Full-stack React framework.
- TypeScript: Static typing for better code safety.
- Prisma ORM: Simplified database interaction.
- Tailwind CSS: Utility-first CSS framework for rapid design.
- Cloudinary: Cloud service for storing and managing images.

## Installation
1) Clone the repositorie
```bash
git clone https://github.com/yourusername/clothing-ecommerce.git
cd clothing-ecommerce
```
2) Install dependencies:
```bash
npm install
```

3) Set up environment variables in a .env file:

```bash
DATABASE_URL=your_database_url
CLOUDINARY_URL=your_cloudinary_url
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_SECRET=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

3) Run the application:

```bash
npm run dev
```

## Deployment
The project is ready to be deployed on platforms like Vercel.
