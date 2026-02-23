"use client";

import { useState } from "react";

const font = '"JetBrains Mono", "Courier New", monospace';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "SEARCH INVENTORY...",
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: isFocused ? "3px solid #FFE500" : "3px solid #000",
        backgroundColor: "#FFF",
        transition: "border-color 100ms",
        borderRadius: 0,
      }}
    >
      {/* Search icon */}
      <div
        style={{
          padding: "0 0.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#000",
          flexShrink: 0,
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        style={{
          flex: 1,
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          padding: "0.75rem 0",
          fontSize: "0.8125rem",
          fontFamily: font,
          fontWeight: 500,
          letterSpacing: "0.05em",
          color: "#000",
          textTransform: "uppercase",
        }}
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          style={{
            padding: "0 0.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#000",
            fontFamily: font,
            borderRadius: 0,
            flexShrink: 0,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}
