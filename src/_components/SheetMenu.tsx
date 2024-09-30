import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Bitcoin,
  HomeIcon,
  PackageSearch,
  UserRoundSearch,
} from "lucide-react";

interface SheetMenuProps {
  toggleHidden: () => void;
}

interface MenuLinkProps {
  href: string;
  icon: React.ReactNode;
  toggleHidden: () => void;
  children: React.ReactNode;
}

const SheetMenu = ({ toggleHidden }: SheetMenuProps) => (
  <>
    <div className="flex justify-between pt-6">
      <div className="flex items-center justify-center text-start">
        <div className="ml-2 items-center">
          <Bitcoin />
        </div>
        <div>
          <h3 className="font-semibold">Cardano Enjoyer</h3>
          <span className="block text-xs text-muted-foreground">
            Cardano@example.com
          </span>
        </div>
      </div>
    </div>
    <div className="py-4">
      <hr />
    </div>
    <div className="space-y-2">
      <MenuLink
        href="/"
        icon={<HomeIcon size={16} />}
        toggleHidden={toggleHidden}
      >
        Home
      </MenuLink>
      <MenuLink
        href="/admin/products"
        icon={<PackageSearch size={18} />}
        toggleHidden={toggleHidden}
      >
        Manage Products
      </MenuLink>
      <MenuLink
        href="/admin/clients"
        icon={<UserRoundSearch size={18} />}
        toggleHidden={toggleHidden}
      >
        Manage Clients
      </MenuLink>
    </div>
  </>
);

const MenuLink = ({ href, icon, toggleHidden, children }: MenuLinkProps) => (
  <Button
    variant="ghost"
    className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
    asChild
  >
    <Link href={href} onClick={toggleHidden}>
      {icon}
      <span className="block">{children}</span>
    </Link>
  </Button>
);

export default SheetMenu;
