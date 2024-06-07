import Link from "next/link";
import Search from "./_components/Search";
import { Button } from "./_components/ui/button";

export default function Home() {
  return (
    <main className="space-y-3 px-5">
      <Search />
      <div>Hello World</div>
      <Button className="px-5">
        <Link href="/admin/products">Manage Products</Link>
      </Button>
    </main>
  );
}
