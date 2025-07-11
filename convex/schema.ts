import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  users: defineTable({
    name: v.optional(v.string()),
    role: v.optional(v.union(v.literal("user"), v.literal("admin"))),
    createdAt: v.optional(v.number()),
    // Explicitly list the auth fields you need from authTables.users
    tokenIdentifier: v.string(),
    email: v.string(),
  }),

  services: defineTable({
    name: v.string(),
    description: v.string(),
    detailedDescription: v.string(),
    officialLinks: v.array(v.object({
      title: v.string(),
      url: v.string(),
    })),
    requiredDocuments: v.array(v.string()),
    price: v.optional(v.string()),
    category: v.string(),
    isActive: v.boolean(),
    processingTime: v.optional(v.string()),
    additionalNotes: v.optional(v.string()),
  }),

  documents: defineTable({
    userId: v.id("users"),
    serviceId: v.id("services"),
    fileName: v.string(),
    fileType: v.string(),
    fileSize: v.number(),
    storageId: v.id("_storage"),
    uploadedAt: v.number(),
    status: v.union(v.literal("pending"), v.literal("reviewed"), v.literal("approved")),
  }).index("by_user", ["userId"])
    .index("by_service", ["serviceId"])
    .index("by_status", ["status"]),

  adminLogs: defineTable({
    adminId: v.id("users"),
    action: v.string(),
    details: v.optional(v.string()),
    timestamp: v.number(),
    ipAddress: v.optional(v.string()),
  }).index("by_admin", ["adminId"])
    .index("by_timestamp", ["timestamp"]),

  taxCalculations: defineTable({
    userId: v.optional(v.id("users")),
    calculationType: v.string(),
    inputs: v.any(),
    result: v.number(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),
};

export default defineSchema(applicationTables);
