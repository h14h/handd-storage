"use client";

import { useState } from "react";

const font = '"JetBrains Mono", "Courier New", monospace';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => {
        setIsPressed(false);
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        position: "fixed",
        bottom: "5rem",
        right: "1rem",
        zIndex: 50,
        width: "56px",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isHovered ? "#000" : "#FFE500",
        color: isHovered ? "#FFE500" : "#000",
        border: "3px solid #000",
        cursor: "pointer",
        fontFamily: font,
        borderRadius: 0,
        boxShadow: isPressed ? "none" : "4px 4px 0px #000",
        transform: isPressed ? "translate(4px, 4px)" : "translate(0, 0)",
        transition: "all 100ms",
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </button>
  );
}
