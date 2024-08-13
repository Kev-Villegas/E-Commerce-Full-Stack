"use client";

import Link from "next/link";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  HomeIcon,
  MenuIcon,
  PackageSearch,
  Store,
  Bitcoin,
  UserRoundSearch,
} from "lucide-react";
import { useState } from "react";
import Search from "./Search";

const Header = () => {
  const [hidden, setHidden] = useState<boolean>(false);

  return (
    <header className="flex justify-between px-5 pt-6">
      <div className="relative h-[30px] w-[100px]">
        <Link href="/">
          <Store />
        </Link>
      </div>
      <div>
        <Search />
      </div>
      <div>
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
            <>
              <div className="flex justify-between pt-6">
                <div className="flex items-center justify-center text-start">
                  <Avatar className="ml-2 items-center">
                    <Bitcoin />
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Cardano Enjoyer</h3>
                    <span className="block text-xs text-muted-foreground">
                      Cardano@example.com
                    </span>
                  </div>
                </div>
              </div>
            </>
            <div className="py-4">
              <Separator />
            </div>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                asChild
              >
                <Link href="/" onClick={() => setHidden(!hidden)}>
                  <HomeIcon size={16} />
                  <span className="block">Home</span>
                </Link>
              </Button>
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  asChild
                >
                  <Link
                    href="/admin/products"
                    onClick={() => setHidden(!hidden)}
                  >
                    <PackageSearch size={18} />
                    <span className="block">Manage Products</span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  asChild
                >
                  <Link
                    href="/admin/clients"
                    onClick={() => setHidden(!hidden)}
                  >
                    <UserRoundSearch size={18} />
                    <span className="block">Manage Clients</span>
                  </Link>
                </Button>
              </>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
