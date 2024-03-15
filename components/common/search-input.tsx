"use client";
import qs from "query-string";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";
import { useState, ChangeEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";

export const SearchInput = () => {
  const { push } = useRouter();
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounceCallback(setSearch, 500);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedValue(e.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          search: search,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    push(url);
  }, [debouncedValue, push]);

  return (
    <div className="w-full relative">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder="Search boards 🧐"
        className="w-full max-w-[516px] pl-9"
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
};
