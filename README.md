<div align="center">

# 👕 Clothing E-Commerce

**Storefront and admin back office for a clothing shop.**
Product and customer management with image uploads to Cloudinary.

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=white)

</div>

## Overview

An early full-stack project (2024) built with the Next.js App Router. It has a public storefront with product search, and an admin area with full CRUD for products and customers. Product images are uploaded to Cloudinary and the data lives in PostgreSQL through Prisma.

For a more complete, production project, see [pixel-point-ecommerce](https://github.com/Kev-Villegas/pixel-point-ecommerce).

## Features

- **Storefront:** product listing, product detail page and server-side search.
- **Product CRUD:** create, edit and delete products from the admin panel, each with an image.
- **Customer CRUD:** manage customers (name, email, phone, address, DNI and CUIL).
- **Image uploads:** files are streamed to Cloudinary, with a unique file name per upload.
- **Validation:** forms use React Hook Form with Zod schemas (name, description and price limits, 3 MB image size, JPEG, PNG and WebP only).
- **Responsive UI:** Tailwind CSS with Radix UI primitives.

## Tech stack

| Layer | Technologies |
| --- | --- |
| **Frontend** | Next.js (App Router), React, TypeScript, Tailwind CSS, Radix UI, React Hook Form, SWR |
| **Backend** | Route Handlers, Server Actions, Prisma ORM, PostgreSQL, Zod |
| **Services** | Cloudinary (image storage) |
| **Tooling** | ESLint, Prettier, Husky, lint-staged |

## Data model

```mermaid
erDiagram
    PRODUCT {
        int id PK
        string name
        string description
        float price
        string imagePath
    }
    CLIENT {
        int id PK
        string firstName
        string lastName
        string email UK
        string phone
        string address
        string dni UK
        string cuil UK
    }
```

## API

| Route | Methods |
| --- | --- |
| `/api/products` | `GET`, `POST` (multipart form with image) |
| `/api/products/[id]` | `PATCH`, `DELETE` |
| `/api/clients` | `GET`, `POST` |
| `/api/clients/[id]` | `PATCH`, `DELETE` |

## Project structure

```text
src/
  app/
    admin/          Admin pages for products and clients, plus their forms
    api/            Route handlers (products, clients)
    products/       Public product list, detail page and search action
  _components/      Shared UI (header, product list, dialogs, ui/ primitives)
  _lib/             Prisma client and helpers
  _utils/           Zod validation schemas
prisma/             schema.prisma, migrations and seed.ts
```

## Run it locally

Requires Node.js 20+ and a PostgreSQL database.

```bash
git clone https://github.com/Kev-Villegas/E-Commerce-Full-Stack.git
cd E-Commerce-Full-Stack
npm install
```

Create a `.env` file:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/clothing_store
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Apply the migrations, load the sample products and start the dev server:

```bash
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

The app runs on [http://localhost:3000](http://localhost:3000).

## Known limitations and next steps

This project predates my current practices, and I would change these things first:

- **The admin area has no authentication.** Anyone who knows the URLs can create, edit or delete data. Next: protect `/admin` and the mutating API routes with NextAuth and role checks.
- **The products API does not validate on the server.** Only the client forms and the customers API use the Zod schemas. Next: run `productSchema` in the route handlers too.
- **No automated tests.** Next: add Playwright end-to-end tests for the CRUD flows and run them in CI.
- **Customer records include national identifiers (DNI and CUIL).** Next: review whether they are needed, and restrict access to them.

## Author

Built by [Kevin Villegas](https://github.com/Kev-Villegas) · [Portfolio](https://www.kevcode.com.ar) · [LinkedIn](https://www.linkedin.com/in/kevin--villegas)
