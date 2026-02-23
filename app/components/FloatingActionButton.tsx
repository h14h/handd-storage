"use client";

import { useState } from "react";
import { PlusIcon, XIcon } from "./Icons";

interface FloatingActionButtonProps {
  onClick: () => void;
  isExpanded?: boolean;
}

export function FloatingActionButton({
  onClick,
  isExpanded = false,
}: FloatingActionButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-lg shadow-zinc-900/30 transition-all duration-200 hover:bg-zinc-800 active:scale-95 active:bg-zinc-700 sm:right-6"
    >
      <PlusIcon
        size={24}
        className={`transition-transform duration-200 ${
          isPressed ? "rotate-45" : ""
        }`}
      />
    </button>
  );
}