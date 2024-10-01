"use client";

import Link from "next/link";
import Search from "./Search";
import { Button } from "./ui/button";
import { PackageSearch, Store } from "lucide-react";

export default function Component() {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center px-4 py-8 text-center md:py-12">
      <PackageSearch className="mb-4 h-12 w-12 text-muted-foreground" />
      <h2 className="mb-2 text-2xl font-bold tracking-tight">
        No products found
      </h2>
      <p className="mb-6 text-muted-foreground">
        The search term you entered did not match any products.
      </p>
      <div className="mb-6 flex w-full max-w-sm items-center space-x-2">
        <Search placeholder="Try another search... " />
      </div>
      <Link href="/">
        <Button variant="outline" className="mb-8 bg-gray-300">
          <Store className="mr-2 h-4 w-4" />
          Back to home page
        </Button>
      </Link>
    </div>
  );
}
