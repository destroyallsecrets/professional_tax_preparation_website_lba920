import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    
    return await ctx.storage.generateUploadUrl();
  },
});

export const uploadDocument = mutation({
  args: {
    serviceId: v.id("services"),
    fileName: v.string(),
    fileType: v.string(),
    fileSize: v.number(),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const documentId = await ctx.db.insert("documents", {
      userId,
      serviceId: args.serviceId,
      fileName: args.fileName,
      fileType: args.fileType,
      fileSize: args.fileSize,
      storageId: args.storageId,
      uploadedAt: Date.now(),
      status: "pending",
    });

    return documentId;
  },
});

export const getUserDocuments = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const documents = await ctx.db.query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    return Promise.all(documents.map(async (doc) => {
      const service = await ctx.db.get(doc.serviceId);
      const url = await ctx.storage.getUrl(doc.storageId);
      return {
        ...doc,
        service: service?.name || "Unknown Service",
        downloadUrl: url,
      };
    }));
  },
});

export const getAllDocuments = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    if (!user || user.role !== "admin") {
      throw new Error("Admin access required");
    }

    const documents = await ctx.db.query("documents").collect();
    
    return Promise.all(documents.map(async (doc) => {
      const user = await ctx.db.get(doc.userId);
      const service = await ctx.db.get(doc.serviceId);
      const url = await ctx.storage.getUrl(doc.storageId);
      
      return {
        ...doc,
        userName: user?.name || "Unknown User",
        userEmail: (user as any)?.validator?.email || "Unknown Email",
        serviceName: service?.name || "Unknown Service",
        downloadUrl: url,
      };
    }));
  },
});

export const updateDocumentStatus = mutation({
  args: {
    documentId: v.id("documents"),
    status: v.union(v.literal("pending"), v.literal("reviewed"), v.literal("approved")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    if (!user || user.role !== "admin") {
      throw new Error("Admin access required");
    }

    await ctx.db.patch(args.documentId, { status: args.status });

    // Log admin action
    await ctx.db.insert("adminLogs", {
      adminId: userId,
      action: `Updated document status to ${args.status}`,
      details: `Document ID: ${args.documentId}`,
      timestamp: Date.now(),
    });
  },
});

export const deleteDocument = mutation({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const document = await ctx.db.get(args.documentId);
    if (!document) throw new Error("Document not found");

    const user = await ctx.db.get(userId);
    const isOwner = document.userId === userId;
    const isAdmin = user?.role === "admin";

    if (!isOwner && !isAdmin) {
      throw new Error("Permission denied");
    }

    // Delete from storage
    await ctx.storage.delete(document.storageId);
    
    // Delete from database
    await ctx.db.delete(args.documentId);

    // Log admin action if admin deleted it
    if (isAdmin && !isOwner) {
      await ctx.db.insert("adminLogs", {
        adminId: userId,
        action: "Deleted document",
        details: `Document ID: ${args.documentId}, Owner: ${document.userId}`,
        timestamp: Date.now(),
      });
    }
  },
});
