"use client";

import { useState, useRef, useEffect } from "react";
import { Doc, Id } from "@/convex/_generated/dataModel";

const font = '"JetBrains Mono", "Courier New", monospace';

interface ItemCardProps {
  item: Doc<"items">;
  onEdit: (item: Doc<"items">) => void;
  onDelete: (id: Id<"items">) => void;
}

export function ItemCard({ item, onEdit, onDelete }: ItemCardProps) {
  const [showActions, setShowActions] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const startX = useRef(0);
  const startOffset = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    setCanHover(mq.matches);
    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startOffset.current = showActions ? 120 : 0;
    setIsDragging(true);
    setIsHovered(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX.current - currentX;
    const newOffset = startOffset.current + diff;
    setSwipeOffset(Math.max(0, Math.min(newOffset, 120)));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (swipeOffset > 60) {
      setShowActions(true);
      setSwipeOffset(120);
    } else {
      setShowActions(false);
      setSwipeOffset(0);
    }
  };

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Action buttons behind the card */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 0,
          opacity: swipeOffset > 0 ? 1 : 0,
          pointerEvents: swipeOffset > 0 ? "auto" : "none",
          transition: "opacity 100ms",
        }}
      >
        <button
          type="button"
          onClick={() => {
            onEdit(item);
            setShowActions(false);
          }}
          style={{
            height: "100%",
            width: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFE500",
            color: "#000",
            border: "none",
            borderLeft: "3px solid #000",
            cursor: "pointer",
            fontFamily: font,
            fontSize: "0.625rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            borderRadius: 0,
          }}
        >
          EDIT
        </button>
        <button
          type="button"
          onClick={() => {
            onDelete(item._id);
            setShowActions(false);
          }}
          style={{
            height: "100%",
            width: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000",
            color: "#FFF",
            border: "none",
            borderLeft: "3px solid #000",
            cursor: "pointer",
            fontFamily: font,
            fontSize: "0.625rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            borderRadius: 0,
          }}
        >
          DEL
        </button>
      </div>

      {/* Main row */}
      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "60px 1fr 100px 80px",
          borderBottom: "1px solid #000",
          backgroundColor: isHovered ? "#000" : "#FFF",
          color: isHovered ? "#FFF" : "#000",
          cursor: "pointer",
          fontFamily: font,
          transform: `translateX(-${swipeOffset}px)`,
          transition: isDragging ? "none" : "transform 200ms ease-out",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => {
          if (showActions) {
            setShowActions(false);
            setSwipeOffset(0);
          } else {
            onEdit(item);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (showActions) {
              setShowActions(false);
              setSwipeOffset(0);
            } else {
              onEdit(item);
            }
          }
        }}
        onMouseEnter={() => canHover && setIsHovered(true)}
        onMouseLeave={() => canHover && setIsHovered(false)}
        role="button"
        tabIndex={0}
      >
        {/* Quantity */}
        <div
          style={{
            padding: "0.75rem 0.5rem",
            borderRight: "1px solid " + (isHovered ? "#FFF" : "#000"),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "1rem",
            transition: "border-color 100ms",
          }}
        >
          {item.quantity > 99 ? "99+" : item.quantity}
        </div>

        {/* Item name + description */}
        <div
          style={{
            padding: "0.75rem 0.5rem",
            borderRight: "1px solid " + (isHovered ? "#FFF" : "#000"),
            overflow: "hidden",
            transition: "border-color 100ms",
          }}
        >
          <div
            style={{
              fontSize: "0.8125rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.name}
          </div>
          {item.description && (
            <div
              style={{
                fontSize: "0.625rem",
                marginTop: "0.125rem",
                opacity: 0.6,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                letterSpacing: "0.05em",
              }}
            >
              {item.description}
            </div>
          )}
        </div>

        {/* Category */}
        <div
          style={{
            padding: "0.75rem 0.5rem",
            borderRight: "1px solid " + (isHovered ? "#FFF" : "#000"),
            display: "flex",
            alignItems: "center",
            fontSize: "0.625rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            transition: "border-color 100ms",
          }}
        >
          {item.category ? (
            <span
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.category}
            </span>
          ) : (
            <span style={{ opacity: 0.3 }}>---</span>
          )}
        </div>

        {/* Status / Fragile */}
        <div
          style={{
            padding: "0.75rem 0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color 100ms",
          }}
        >
          {item.isFragile ? (
            <span
              style={{
                backgroundColor: "#FFE500",
                color: "#000",
                padding: "0.125rem 0.375rem",
                fontSize: "0.5625rem",
                fontWeight: 800,
                letterSpacing: "0.1em",
                fontFamily: font,
                border: "2px solid #000",
              }}
            >
              FRAGILE
            </span>
          ) : (
            <span
              style={{
                fontSize: "0.5625rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                opacity: 0.3,
              }}
            >
              STD
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
