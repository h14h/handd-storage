"use client";

import { useState, useEffect } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { ItemForm } from "./ItemForm";

const font = '"JetBrains Mono", "Courier New", monospace';

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
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        fontFamily: font,
      }}
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close modal"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          border: "none",
          cursor: "pointer",
          opacity: showContent ? 1 : 0,
          transition: "opacity 100ms",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "640px",
          backgroundColor: "#FFF",
          border: "3px solid #000",
          borderBottom: "none",
          transform: showContent ? "translateY(0)" : "translateY(100%)",
          opacity: showContent ? 1 : 0,
          transition: "transform 100ms, opacity 100ms",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: 0,
        }}
      >
        {/* Yellow header bar */}
        <div
          style={{
            backgroundColor: "#FFE500",
            borderBottom: "3px solid #000",
            padding: "1rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <h2
            style={{
              fontSize: "0.875rem",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              margin: 0,
              color: "#000",
              fontFamily: font,
            }}
          >
            {item ? "// EDIT ITEM" : "// NEW ITEM"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              backgroundColor: "#000",
              color: "#FFF",
              border: "none",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontFamily: font,
              fontWeight: 800,
              fontSize: "1rem",
              borderRadius: 0,
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
        </div>

        {/* Form */}
        <div
          style={{
            overflowY: "auto",
            padding: "1.5rem",
            flex: 1,
          }}
        >
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
