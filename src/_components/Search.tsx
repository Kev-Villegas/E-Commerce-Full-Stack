"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchProps {
  placeholder?: string;
}

const Search = ({ placeholder }: SearchProps) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;

    router.push(`/products?search=${search}`);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="w-full">
      <div className="relative">
        <SearchIcon
          className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-200 ${
            isSearchFocused ? "text-primary" : "text-muted-foreground"
          }`}
        />
        <Input
          type="search"
          placeholder={placeholder}
          className="w-full rounded-full border-2 border-zinc-300 py-2 pl-10 pr-4 transition-all duration-200 ease-in-out focus:border-primary"
          value={search}
          onChange={handleChange}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
      </div>
    </form>
  );
};

export default Search;
