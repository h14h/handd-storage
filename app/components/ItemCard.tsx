"use client";

import { useState, useRef } from "react";
import { Doc, Id } from "@/convex/_generated/dataModel";

interface ItemCardProps {
  item: Doc<"items">;
  onEdit: (item: Doc<"items">) => void;
  onDelete: (id: Id<"items">) => void;
}

export function ItemCard({ item, onEdit, onDelete }: ItemCardProps) {
  const [showActions, setShowActions] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX.current - currentX;
    if (diff > 0) {
      setSwipeOffset(Math.min(diff, 120));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (swipeOffset > 60) {
      setShowActions(true);
      setSwipeOffset(0);
    } else {
      setSwipeOffset(0);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Action buttons behind the card */}
      <div
        className="absolute right-0 top-0 flex h-full items-center gap-1 px-2 transition-opacity"
        style={{ opacity: showActions ? 1 : 0 }}
      >
        <button
          type="button"
          onClick={() => {
            onEdit(item);
            setShowActions(false);
          }}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-transform hover:scale-105 active:scale-95"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => {
            onDelete(item._id);
            setShowActions(false);
          }}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600 transition-transform hover:scale-105 active:scale-95"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>

      {/* Main card */}
      <div
        className="relative cursor-pointer bg-white transition-all duration-200 active:bg-zinc-50"
        style={{
          transform: `translateX(-${swipeOffset}px)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => (showActions ? setShowActions(false) : onEdit(item))}
        onKeyDown={(e) => e.key === "Enter" && (showActions ? setShowActions(false) : onEdit(item))}
        role="button"
        tabIndex={0}
      >
        <div className="flex items-start gap-4 p-4">
          {/* Left side - quantity */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-lg font-semibold text-zinc-600">
              {item.quantity > 99 ? (
                <span className="text-sm">99+</span>
              ) : (
                <span>{item.quantity}</span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col gap-1.5 overflow-hidden">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-base font-medium text-zinc-900">
                {item.name}
              </h3>
              {item.isFragile && (
                <span className="shrink-0 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-600">
                  Fragile
                </span>
              )}
            </div>
            {item.description && (
              <p className="truncate text-sm text-zinc-500">
                {item.description}
              </p>
            )}
            {item.category && (
              <span className="w-fit rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-400">
                {item.category}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}