"use client";

import { useState, useEffect } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { ItemForm } from "./ItemForm";
import { XIcon } from "./Icons";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: Doc<"items"> | null;
  onSave: (data: {
    name: string;
    description?: string;
    quantity: number;
    category?: string;
    notes?: string;
    isFragile: boolean;
  }) => void;
  isLoading?: boolean;
}

export function AddItemModal({
  isOpen,
  onClose,
  item,
  onSave,
  isLoading = false,
}: AddItemModalProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowContent(true), 10);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <button
        type="button"
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-lg rounded-t-3xl bg-white shadow-2xl transition-all duration-300 sm:rounded-3xl ${
          showContent
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        {/* Handle bar for mobile */}
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-zinc-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-zinc-900">
            {item ? "Edit Item" : "Add New Item"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
          >
            <XIcon size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
          <ItemForm
            item={item}
            onSave={onSave}
            onClose={onClose}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}