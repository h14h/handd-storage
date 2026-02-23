import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all items, optionally filtered by category
export const list = query({
  args: {
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.category) {
      return await ctx.db
        .query("items")
        .withIndex("by_category", (q) => q.eq("category", args.category))
        .order("desc")
        .collect();
    }
    return await ctx.db.query("items").order("desc").collect();
  },
});

// Get recent items
export const recent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;
    return await ctx.db
      .query("items")
      .withIndex("by_last_modified", (q) => q)
      .order("desc")
      .take(limit);
  },
});

// Search items by name
export const search = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    if (args.query.trim() === "") {
      return [];
    }
    return await ctx.db
      .query("items")
      .withSearchIndex("search_items", (q) =>
        q.search("name", args.query)
      )
      .take(20);
  },
});

// Get a single item by ID
export const get = query({
  args: { id: v.id("items") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create a new item
export const create = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    quantity: v.optional(v.number()),
    category: v.optional(v.string()),
    notes: v.optional(v.string()),
    isFragile: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("items", {
      ...args,
      quantity: args.quantity ?? 1,
      lastModified: now,
    });
  },
});

// Update an item
export const update = mutation({
  args: {
    id: v.id("items"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    quantity: v.optional(v.number()),
    category: v.optional(v.string()),
    notes: v.optional(v.string()),
    isFragile: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Item not found");

    const cleanUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined)
    );

    await ctx.db.patch(id, {
      ...cleanUpdates,
      lastModified: Date.now(),
    });
    return id;
  },
});

// Delete an item
export const remove = mutation({
  args: { id: v.id("items") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Get all unique categories
export const categories = query({
  handler: async (ctx) => {
    const items = await ctx.db.query("items").collect();
    const categories = new Set(
      items.map((item) => item.category).filter(Boolean)
    );
    return Array.from(categories).sort();
  },
});