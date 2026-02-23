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
import { PackageIcon, PlusIcon } from "./Icons";

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
    if (confirm("Are you sure you want to delete this item?")) {
      await deleteItem({ id });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-lg px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
                Storage Locker
              </h1>
              <p className="text-sm text-zinc-500">
                {allItems?.length ?? 0} items
              </p>
            </div>
            <div className="flex items-center gap-2">
              <UserButton />
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setIsItemModalOpen(true);
                }}
                className="flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 active:bg-zinc-700"
              >
                <PlusIcon size={16} />
                <span className="hidden sm:inline">New Item</span>
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mt-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search items..."
            />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-lg px-4 py-4 pb-28">
        {/* Items list */}
        {displayItems.length > 0 ? (
          <div className="flex flex-col gap-3">
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
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100">
              <PackageIcon size={28} className="text-zinc-400" />
            </div>
            <div>
              <h3 className="text-base font-medium text-zinc-900">
                {searchQuery ? "No items found" : "No items yet"}
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                {searchQuery
                  ? "Try a different search term"
                  : "Tap the + button to add your first item"}
              </p>
            </div>
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