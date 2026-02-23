"use client";

import { UserButton } from "@clerk/nextjs";
import { useState, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { SearchBar } from "./SearchBar";
import { ItemCard } from "./ItemCard";
import { AddItemModal } from "./AddItemModal";
import { FloatingActionButton } from "./FloatingActionButton";

const font = '"JetBrains Mono", "Courier New", monospace';

export function InventoryApp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Doc<"items"> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Queries
  const allItems = useQuery(api.items.list, {});
  const searchResults = useQuery(api.items.search, { query: searchQuery });

  // Mutations
  const createItem = useMutation(api.items.create);
  const updateItem = useMutation(api.items.update);
  const deleteItem = useMutation(api.items.remove);

  // Computed values
  const displayItems = useMemo(() => {
    if (searchQuery.trim()) {
      return searchResults ?? [];
    }
    return allItems ?? [];
  }, [searchQuery, searchResults, allItems]);

  // Handlers
  const handleSaveItem = async (data: {
    name: string;
    description?: string;
    quantity: number;
    category?: string;
    notes?: string;
    isFragile: boolean;
  }) => {
    setIsSaving(true);
    try {
      if (editingItem) {
        await updateItem({ id: editingItem._id, ...data });
      } else {
        await createItem(data);
      }
      setIsItemModalOpen(false);
      setEditingItem(null);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditItem = (item: Doc<"items">) => {
    setEditingItem(item);
    setIsItemModalOpen(true);
  };

  const handleDeleteItem = async (id: Id<"items">) => {
    if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS ITEM?")) {
      await deleteItem({ id });
    }
  };

  return (
    <div
      style={{
        fontFamily: font,
        minHeight: "100vh",
        backgroundColor: "#FFF",
        color: "#000",
      }}
    >
      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          borderBottom: "3px solid #000",
          backgroundColor: "#FFF",
        }}
      >
        <div style={{ maxWidth: "640px", margin: "0 auto", padding: "0 1rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1rem 0",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  margin: 0,
                  fontFamily: font,
                }}
              >
                STORAGE LOCKER
              </h1>
              <p
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  margin: "0.25rem 0 0 0",
                  fontFamily: font,
                }}
              >
                [{allItems?.length ?? 0}] ITEMS INDEXED
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <UserButton />
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setIsItemModalOpen(true);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "#000",
                  color: "#FFF",
                  border: "3px solid #000",
                  padding: "0.5rem 1rem",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  fontFamily: font,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  borderRadius: 0,
                  transition: "all 100ms",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFE500";
                  e.currentTarget.style.color = "#000";
                  e.currentTarget.style.borderColor = "#000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#000";
                  e.currentTarget.style.color = "#FFF";
                  e.currentTarget.style.borderColor = "#000";
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span style={{ display: "none" }} className="sm-show">
                  NEW
                </span>
              </button>
            </div>
          </div>

          {/* Search */}
          <div style={{ paddingBottom: "1rem" }}>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="SEARCH INVENTORY..."
            />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          padding: "0 1rem 7rem 1rem",
        }}
      >
        {/* Table header */}
        {displayItems.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "60px 1fr 100px 80px",
              borderLeft: "3px solid #000",
              borderRight: "3px solid #000",
              borderTop: "3px solid #000",
              backgroundColor: "#000",
              color: "#FFF",
              fontSize: "0.625rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontFamily: font,
            }}
          >
            <div style={{ padding: "0.5rem", borderRight: "1px solid #FFF" }}>
              QTY
            </div>
            <div style={{ padding: "0.5rem", borderRight: "1px solid #FFF" }}>
              ITEM
            </div>
            <div style={{ padding: "0.5rem", borderRight: "1px solid #FFF" }}>
              CATEGORY
            </div>
            <div style={{ padding: "0.5rem" }}>STATUS</div>
          </div>
        )}

        {/* Items list */}
        {displayItems.length > 0 ? (
          <div
            style={{
              borderLeft: "3px solid #000",
              borderRight: "3px solid #000",
              borderBottom: "3px solid #000",
            }}
          >
            {displayItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div
            style={{
              border: "3px solid #000",
              padding: "4rem 2rem",
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            <div
              style={{
                fontSize: "3rem",
                fontWeight: 800,
                letterSpacing: "0.15em",
                lineHeight: 1,
              }}
            >
              {searchQuery ? "NULL" : "EMPTY"}
            </div>
            <div
              style={{
                width: "60px",
                height: "3px",
                backgroundColor: "#FFE500",
                margin: "1rem auto",
              }}
            />
            <p
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontFamily: font,
              }}
            >
              {searchQuery
                ? "NO MATCHING RECORDS FOUND"
                : "NO ITEMS CATALOGUED // TAP [+] TO BEGIN"}
            </p>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton
        onClick={() => {
          setEditingItem(null);
          setIsItemModalOpen(true);
        }}
      />

      {/* Modal */}
      <AddItemModal
        isOpen={isItemModalOpen}
        onClose={() => {
          setIsItemModalOpen(false);
          setEditingItem(null);
        }}
        item={editingItem}
        onSave={handleSaveItem}
        isLoading={isSaving}
      />
    </div>
  );
}
