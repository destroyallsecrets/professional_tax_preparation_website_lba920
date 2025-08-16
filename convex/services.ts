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

export const addDownloadableDocument = mutation({
  args: {
    serviceId: v.id("services"),
    title: v.string(),
    description: v.string(),
    storageId: v.id("_storage"),
    fileName: v.string(),
    fileType: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    if (!user || user.role !== "admin") {
      throw new Error("Admin access required");
    }

    const service = await ctx.db.get(args.serviceId);
    if (!service) throw new Error("Service not found");

    const newDocument = {
      title: args.title,
      description: args.description,
      storageId: args.storageId,
      fileName: args.fileName,
      fileType: args.fileType,
      uploadedAt: Date.now(),
    };

    const currentDocuments = service.downloadableDocuments || [];
    const updatedDocuments = [...currentDocuments, newDocument];

    await ctx.db.patch(args.serviceId, {
      downloadableDocuments: updatedDocuments,
    });

    // Log admin action
    await ctx.db.insert("adminLogs", {
      adminId: userId,
      action: "Added downloadable document to service",
      details: `Service: ${service.name}, Document: ${args.title}`,
      timestamp: Date.now(),
    });

    return newDocument;
  },
});

export const removeDownloadableDocument = mutation({
  args: {
    serviceId: v.id("services"),
    documentIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    if (!user || user.role !== "admin") {
      throw new Error("Admin access required");
    }

    const service = await ctx.db.get(args.serviceId);
    if (!service) throw new Error("Service not found");

    const currentDocuments = service.downloadableDocuments || [];
    if (args.documentIndex < 0 || args.documentIndex >= currentDocuments.length) {
      throw new Error("Invalid document index");
    }

    const documentToRemove = currentDocuments[args.documentIndex];
    const updatedDocuments = currentDocuments.filter((_, index) => index !== args.documentIndex);

    await ctx.db.patch(args.serviceId, {
      downloadableDocuments: updatedDocuments,
    });

    // Delete the file from storage
    await ctx.storage.delete(documentToRemove.storageId);

    // Log admin action
    await ctx.db.insert("adminLogs", {
      adminId: userId,
      action: "Removed downloadable document from service",
      details: `Service: ${service.name}, Document: ${documentToRemove.title}`,
      timestamp: Date.now(),
    });
  },
});

export const getDownloadUrl = query({
  args: {
    serviceId: v.id("services"),
    documentIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const service = await ctx.db.get(args.serviceId);
    if (!service) throw new Error("Service not found");

    const documents = service.downloadableDocuments || [];
    if (args.documentIndex < 0 || args.documentIndex >= documents.length) {
      throw new Error("Invalid document index");
    }

    const document = documents[args.documentIndex];
    const url = await ctx.storage.getUrl(document.storageId);
    
    return {
      url,
      fileName: document.fileName,
      title: document.title,
    };
  },
});
