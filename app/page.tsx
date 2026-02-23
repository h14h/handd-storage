"use client";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { InventoryApp } from "./components/InventoryApp";

export default function Home() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <SignedIn>
        <InventoryApp />
      </SignedIn>
      <SignedOut>
        <div
          style={{
            fontFamily: '"JetBrains Mono", "Courier New", monospace',
            backgroundColor: "#000",
            color: "#FFF",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(3rem, 15vw, 10rem)",
                fontWeight: 800,
                letterSpacing: "0.15em",
                lineHeight: 0.9,
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              STORAGE
            </h1>
            <div
              style={{
                width: "100%",
                height: "6px",
                backgroundColor: "#FFE500",
                margin: "1rem 0",
              }}
            />
            <h1
              style={{
                fontSize: "clamp(3rem, 15vw, 10rem)",
                fontWeight: 800,
                letterSpacing: "0.15em",
                lineHeight: 0.9,
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              LOCKER
            </h1>
          </div>

          <p
            style={{
              marginTop: "3rem",
              fontSize: "0.875rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#FFF",
              opacity: 0.6,
            }}
          >
            INVENTORY MANAGEMENT SYSTEM
          </p>

          <div
            style={{
              marginTop: "3rem",
              border: "3px solid #FFE500",
              backgroundColor: "#FFE500",
              color: "#000",
              padding: "1rem 3rem",
              fontSize: "1rem",
              fontWeight: 700,
              fontFamily: '"JetBrains Mono", "Courier New", monospace',
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: 0,
            }}
          >
            <SignInButton mode="modal" />
          </div>

          <p
            style={{
              marginTop: "2rem",
              fontSize: "0.625rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#FFF",
              opacity: 0.3,
            }}
          >
            V.01 // BRUTALIST EDITION
          </p>
        </div>
      </SignedOut>
    </>
  );
}
