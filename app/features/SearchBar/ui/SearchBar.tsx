"use client"
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import { getSearchSuggestionsOptions } from "../queryOptions/getSearchSuggestionsOptions";
import SearchSuggestionsMenu from "./SearchSuggestionsMenu";

interface SearchBarProps {
  className?: string;
}

export default function SearchBar({ className }: SearchBarProps) {
  const pathname = usePathname();

  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState<string | null>(null)
  const [debouncedValue] = useDebounce(query, 400)
  const { data, isPending } = useQuery(getSearchSuggestionsOptions(debouncedValue, debouncedValue !== null))

  useEffect(() => {
    const clearInputField = () => {
      if (inputRef.current !== null) {
        inputRef.current.value = '';
      }
      setQuery(null)
    }

    clearInputField()
  }, [pathname])

  return (
    <div onBlur={(e) => !e.relatedTarget?.matches("a") && setQuery(null)} onKeyDown={(e) => e.code === "Escape" && setQuery(null)} className={`relative ${className} self-center font-inter text-muted-foreground`}>
      <input ref={inputRef} onChange={(e) => setQuery(e.target.value)} type="text" className="border-border border rounded-lg py-2 pl-9.5 bg-surface text-sm
      placeholder:text-white placeholder:opacity-40 focus:border-amber focus:outline-none transition-all" placeholder="Search titles..." />
      <Search className="absolute top-0 bottom-0 left-3 m-auto opacity-55" size={18} />
      {data !== undefined && !isPending && query !== null &&
        <SearchSuggestionsMenu media={data!} query={query} />
      }
    </div>
  );
}