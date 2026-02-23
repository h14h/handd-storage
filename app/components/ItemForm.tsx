"use client";

import { useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { PlusIcon } from "./Icons";

interface ItemFormProps {
  item?: Doc<"items"> | null;
  onSave: (data: {
    name: string;
    description?: string;
    quantity: number;
    category?: string;
    notes?: string;
    isFragile: boolean;
  }) => void;
  onClose: () => void;
  isLoading?: boolean;
}

const PRESET_CATEGORIES = [
  "Electronics",
  "Clothing",
  "Books",
  "Tools",
  "Kitchen",
  "Decor",
  "Sports",
  "Documents",
  "Memorabilia",
  "Seasonal",
];

export function ItemForm({
  item,
  onSave,
  onClose,
  isLoading = false,
}: ItemFormProps) {
  const [name, setName] = useState(item?.name || "");
  const [description, setDescription] = useState(item?.description || "");
  const [quantity, setQuantity] = useState(item?.quantity || 1);
  const [category, setCategory] = useState(item?.category || "");
  const [customCategory, setCustomCategory] = useState("");
  const [notes, setNotes] = useState(item?.notes || "");
  const [isFragile, setIsFragile] = useState(item?.isFragile || false);
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name: name.trim(),
      description: description.trim() || undefined,
      quantity,
      category: showCustomCategory ? customCategory.trim() : category || undefined,
      notes: notes.trim() || undefined,
      isFragile,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="item-name" className="text-sm font-medium text-zinc-700">
          Name *
        </label>
        <input
          id="item-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="What are you storing?"
          className="rounded-xl border border-zinc-200 px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-4 focus:ring-zinc-100"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <label htmlFor="item-description" className="text-sm font-medium text-zinc-700">
          Description
        </label>
        <input
          id="item-description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description (optional)"
          className="rounded-xl border border-zinc-200 px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-4 focus:ring-zinc-100"
        />
      </div>

      {/* Quantity */}
      <div className="flex flex-col gap-2">
        <label htmlFor="item-quantity" className="text-sm font-medium text-zinc-700">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 text-xl font-medium text-zinc-600 transition-colors hover:bg-zinc-50 active:bg-zinc-100"
          >
            −
          </button>
          <input
            id="item-quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="h-12 w-20 rounded-xl border border-zinc-200 bg-zinc-50 text-center text-lg font-semibold focus:border-zinc-400 focus:outline-none focus:ring-4 focus:ring-zinc-100"
          />
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 text-xl font-medium text-zinc-600 transition-colors hover:bg-zinc-50 active:bg-zinc-100"
          >
            +
          </button>
        </div>
      </div>

      {/* Category */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-700">Category</label>
        <div className="flex flex-wrap gap-2">
          {PRESET_CATEGORIES.slice(0, 6).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCategory(cat);
                setShowCustomCategory(false);
              }}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
                category === cat && !showCustomCategory
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
              }`}
            >
              {cat}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowCustomCategory(!showCustomCategory)}
            className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
              showCustomCategory
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
            }`}
          >
            Other
          </button>
        </div>
        {showCustomCategory && (
          <input
            id="custom-category"
            type="text"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            placeholder="Enter custom category"
            className="mt-2 rounded-xl border border-zinc-200 px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-4 focus:ring-zinc-100"
          />
        )}
      </div>

      {/* Fragile toggle */}
      <div>
        <button
          type="button"
          onClick={() => setIsFragile(!isFragile)}
          className={`flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-all ${
            isFragile
              ? "border-orange-300 bg-orange-50 text-orange-600"
              : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          Fragile
        </button>
      </div>

      {/* Notes */}
      <div className="flex flex-col gap-2">
        <label htmlFor="item-notes" className="text-sm font-medium text-zinc-700">
          Notes
        </label>
        <textarea
          id="item-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any additional notes..."
          rows={3}
          className="resize-none rounded-xl border border-zinc-200 px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-4 focus:ring-zinc-100"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-xl border border-zinc-200 py-3.5 text-base font-medium text-zinc-600 transition-colors hover:bg-zinc-50 active:bg-zinc-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!name.trim() || isLoading}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3.5 text-base font-medium text-white transition-all hover:bg-zinc-800 active:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <span className="animate-pulse">Saving...</span>
          ) : item ? (
            "Update Item"
          ) : (
            <>
              <PlusIcon size={18} />
              Add Item
            </>
          )}
        </button>
      </div>
    </form>
  );
}