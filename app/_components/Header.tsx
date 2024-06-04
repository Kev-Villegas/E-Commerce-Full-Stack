"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { MenuIcon, Store } from "lucide-react";

const Header = () => {
  return (
    <header className="flex justify-between px-5 pt-6">
      <Link href="/">
        <div className="relative h-[30px] w-[100px]">
          <Store />
        </div>
      </Link>
      <nav>
        <Button
          size="icon"
          variant="outline"
          className="border-none bg-transparent"
        >
          <MenuIcon />
        </Button>
      </nav>
    </header>
  );
};

export default Header;
