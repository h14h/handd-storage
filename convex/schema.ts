import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Inventory items for a single storage locker
  items: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    quantity: v.number(),
    category: v.optional(v.string()),
    notes: v.optional(v.string()),
    isFragile: v.optional(v.boolean()),
    lastModified: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_name", ["name"])
    .index("by_last_modified", ["lastModified"])
    .searchIndex("search_items", {
      searchField: "name",
      filterFields: ["category"],
    }),
});