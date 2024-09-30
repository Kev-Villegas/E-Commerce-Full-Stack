import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import bannerImage from "@/public/bannerImage.webp";

const Banner = () => {
  return (
    <section className="mb-10">
      <div className="relative h-[70vh] overflow-hidden rounded-lg sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] 2xl:h-[90vh] 3xl:h-[100vh]">
        <div className="relative h-full w-full">
          <Image
            src={bannerImage}
            alt="Hero image of latest fashion collection"
            className="h-full w-full object-cover"
            width={1920}
            height={1100}
            priority
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-80" />
        </div>
        <div className="absolute inset-0 flex flex-col items-start justify-center bg-black bg-opacity-50 p-8 sm:p-16">
          <header className="mb-4">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Elevate Your Style
            </h1>
          </header>
          <p className="mb-8 max-w-md text-xl text-white sm:text-2xl">
            Discover our curated collection of premium fashion pieces.
          </p>
          <Button size="lg" asChild>
            <Link href="/new-arrivals" className="flex items-center">
              Explore New Arrivals
              <ShoppingBag className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
