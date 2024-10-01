"use client";

import Link from "next/link";
import Search from "./Search";
import { useState } from "react";
import SheetMenu from "./SheetMenu";
import { Button } from "./ui/button";
import { MenuIcon, Store, ShoppingBag, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Header = () => {
  const [hidden, setHidden] = useState<boolean>(false);

  const toggleHidden = () => {
    setHidden(!hidden);
  };

  return (
    <header className="flex justify-between px-5 pt-6">
      <div className="relative h-[30px] w-[100px]">
        <Link href="/">
          <Store />
        </Link>
      </div>
      <div className="w-full max-w-xl">
        <Search placeholder="Search Products..." />
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/cart">
          <ShoppingBag />
        </Link>
        <Link href="/account">
          <User />
        </Link>
        <Sheet open={hidden} onOpenChange={setHidden}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="border-none bg-transparent"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="rounded-bl-3xl rounded-tl-3xl">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>
            <SheetMenu toggleHidden={toggleHidden} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
