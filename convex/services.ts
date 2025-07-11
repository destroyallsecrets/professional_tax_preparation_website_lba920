import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getAllServices = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("services")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

export const getServiceById = query({
  args: { serviceId: v.id("services") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.serviceId);
  },
});

export const createService = mutation({
  args: {
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
    processingTime: v.optional(v.string()),
    additionalNotes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    if (!user || user.role !== "admin") {
      throw new Error("Admin access required");
    }

    const serviceId = await ctx.db.insert("services", {
      ...args,
      isActive: true,
    });

    // Log admin action
    await ctx.db.insert("adminLogs", {
      adminId: userId,
      action: "Created new service",
      details: `Service: ${args.name}`,
      timestamp: Date.now(),
    });

    return serviceId;
  },
});

export const updateService = mutation({
  args: {
    serviceId: v.id("services"),
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
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    if (!user || user.role !== "admin") {
      throw new Error("Admin access required");
    }

    const { serviceId, ...updates } = args;
    await ctx.db.patch(serviceId, updates);

    // Log admin action
    await ctx.db.insert("adminLogs", {
      adminId: userId,
      action: "Updated service",
      details: `Service ID: ${serviceId}`,
      timestamp: Date.now(),
    });
  },
});
