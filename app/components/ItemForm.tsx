"use client";

import { useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";

const font = '"JetBrains Mono", "Courier New", monospace';

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

const labelStyle: React.CSSProperties = {
  fontSize: "0.625rem",
  fontWeight: 700,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "#000",
  fontFamily: font,
  marginBottom: "0.5rem",
  display: "block",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "3px solid #000",
  backgroundColor: "#FFF",
  color: "#000",
  padding: "0.75rem",
  fontSize: "0.875rem",
  fontFamily: font,
  borderRadius: 0,
  outline: "none",
  boxSizing: "border-box",
};

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
      category: showCustomCategory
        ? customCategory.trim()
        : category || undefined,
      notes: notes.trim() || undefined,
      isFragile,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
    >
      {/* Name */}
      <div>
        <label htmlFor="item-name" style={labelStyle}>
          NAME *
        </label>
        <input
          id="item-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ITEM DESIGNATION"
          style={inputStyle}
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="item-description" style={labelStyle}>
          DESCRIPTION
        </label>
        <input
          id="item-description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="BRIEF DESCRIPTION (OPTIONAL)"
          style={inputStyle}
        />
      </div>

      {/* Quantity */}
      <div>
        <label htmlFor="item-quantity" style={labelStyle}>
          QUANTITY
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            style={{
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#000",
              color: "#FFF",
              border: "3px solid #000",
              fontSize: "1.25rem",
              fontWeight: 800,
              fontFamily: font,
              cursor: "pointer",
              borderRadius: 0,
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#FFE500";
              e.currentTarget.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#000";
              e.currentTarget.style.color = "#FFF";
            }}
          >
            -
          </button>
          <input
            id="item-quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
            style={{
              width: "80px",
              height: "48px",
              border: "3px solid #000",
              borderLeft: "none",
              borderRight: "none",
              backgroundColor: "#FFF",
              textAlign: "center",
              fontSize: "1.125rem",
              fontWeight: 800,
              fontFamily: font,
              color: "#000",
              borderRadius: 0,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            style={{
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#000",
              color: "#FFF",
              border: "3px solid #000",
              fontSize: "1.25rem",
              fontWeight: 800,
              fontFamily: font,
              cursor: "pointer",
              borderRadius: 0,
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#FFE500";
              e.currentTarget.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#000";
              e.currentTarget.style.color = "#FFF";
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Category */}
      <div>
        <label style={labelStyle}>CATEGORY</label>
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}
        >
          {PRESET_CATEGORIES.slice(0, 6).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCategory(cat);
                setShowCustomCategory(false);
              }}
              style={{
                padding: "0.5rem 0.75rem",
                fontSize: "0.625rem",
                fontWeight: 700,
                fontFamily: font,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                borderRadius: 0,
                border: "3px solid #000",
                backgroundColor:
                  category === cat && !showCustomCategory ? "#000" : "#FFF",
                color:
                  category === cat && !showCustomCategory ? "#FFF" : "#000",
                transition: "all 100ms",
              }}
              onMouseEnter={(e) => {
                if (!(category === cat && !showCustomCategory)) {
                  e.currentTarget.style.backgroundColor = "#FFE500";
                }
              }}
              onMouseLeave={(e) => {
                if (!(category === cat && !showCustomCategory)) {
                  e.currentTarget.style.backgroundColor = "#FFF";
                }
              }}
            >
              {cat}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowCustomCategory(!showCustomCategory)}
            style={{
              padding: "0.5rem 0.75rem",
              fontSize: "0.625rem",
              fontWeight: 700,
              fontFamily: font,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: 0,
              border: "3px solid #000",
              backgroundColor: showCustomCategory ? "#000" : "#FFF",
              color: showCustomCategory ? "#FFF" : "#000",
              transition: "all 100ms",
            }}
            onMouseEnter={(e) => {
              if (!showCustomCategory) {
                e.currentTarget.style.backgroundColor = "#FFE500";
              }
            }}
            onMouseLeave={(e) => {
              if (!showCustomCategory) {
                e.currentTarget.style.backgroundColor = "#FFF";
              }
            }}
          >
            OTHER
          </button>
        </div>
        {showCustomCategory && (
          <input
            id="custom-category"
            type="text"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            placeholder="CUSTOM CATEGORY"
            style={{ ...inputStyle, marginTop: "0.5rem" }}
          />
        )}
      </div>

      {/* Fragile toggle */}
      <div>
        <button
          type="button"
          onClick={() => setIsFragile(!isFragile)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: "0.75rem",
            fontSize: "0.75rem",
            fontWeight: 800,
            fontFamily: font,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: "pointer",
            borderRadius: 0,
            border: "3px solid #000",
            backgroundColor: isFragile ? "#FFE500" : "#FFF",
            color: "#000",
            transition: "all 100ms",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          {isFragile ? "!! FRAGILE !!" : "FRAGILE"}
        </button>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="item-notes" style={labelStyle}>
          NOTES
        </label>
        <textarea
          id="item-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="ADDITIONAL NOTES..."
          rows={3}
          style={{
            ...inputStyle,
            resize: "none",
          }}
        />
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 0, paddingTop: "0.5rem" }}>
        <button
          type="button"
          onClick={onClose}
          style={{
            flex: 1,
            padding: "1rem",
            fontSize: "0.75rem",
            fontWeight: 700,
            fontFamily: font,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: "pointer",
            borderRadius: 0,
            border: "3px solid #000",
            backgroundColor: "#FFF",
            color: "#000",
            transition: "all 100ms",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#000";
            e.currentTarget.style.color = "#FFF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#FFF";
            e.currentTarget.style.color = "#000";
          }}
        >
          CANCEL
        </button>
        <button
          type="submit"
          disabled={!name.trim() || isLoading}
          style={{
            flex: 1,
            padding: "1rem",
            fontSize: "0.75rem",
            fontWeight: 700,
            fontFamily: font,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: !name.trim() || isLoading ? "not-allowed" : "pointer",
            borderRadius: 0,
            border: "3px solid #000",
            borderLeft: "none",
            backgroundColor: !name.trim() || isLoading ? "#ccc" : "#000",
            color: !name.trim() || isLoading ? "#666" : "#FFF",
            transition: "all 100ms",
            opacity: !name.trim() || isLoading ? 0.5 : 1,
          }}
          onMouseEnter={(e) => {
            if (name.trim() && !isLoading) {
              e.currentTarget.style.backgroundColor = "#FFE500";
              e.currentTarget.style.color = "#000";
            }
          }}
          onMouseLeave={(e) => {
            if (name.trim() && !isLoading) {
              e.currentTarget.style.backgroundColor = "#000";
              e.currentTarget.style.color = "#FFF";
            }
          }}
        >
          {isLoading ? "SAVING..." : item ? "UPDATE" : "+ ADD ITEM"}
        </button>
      </div>
    </form>
  );
}
