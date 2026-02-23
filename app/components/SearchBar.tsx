"use client";

import { useState, useEffect } from "react";
import { SearchIcon, XIcon, FilterIcon } from "./Icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFilterClick?: () => void;
  showFilter?: boolean;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search items...",
  onFilterClick,
  showFilter = false,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <div
        className={`flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 transition-all duration-200 ${
          isFocused
            ? "border-zinc-300 ring-4 ring-zinc-100"
            : "border-zinc-200"
        }`}
      >
        <SearchIcon
          size={20}
          className={`transition-colors ${
            isFocused ? "text-zinc-900" : "text-zinc-400"
          }`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-base text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="rounded-full p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
          >
            <XIcon size={16} />
          </button>
        )}
        {showFilter && (
          <button
            onClick={onFilterClick}
            className="rounded-full p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
          >
            <FilterIcon size={18} />
          </button>
        )}
      </div>
    </div>
  );
}