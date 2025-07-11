import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    if (!user || user.role !== "admin") {
      throw new Error("Admin access required");
    }

    const [totalUsers, totalDocuments, totalServices, recentLogs] = await Promise.all([
      ctx.db.query("users").collect().then(users => users.length),
      ctx.db.query("documents").collect().then(docs => docs.length),
      ctx.db.query("services").collect().then(services => services.length),
      ctx.db.query("adminLogs")
        .withIndex("by_timestamp")
        .order("desc")
        .take(10),
    ]);

    const documentsByStatus = await ctx.db.query("documents").collect();
    const statusCounts = documentsByStatus.reduce((acc, doc) => {
      acc[doc.status] = (acc[doc.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const documentsByService = await Promise.all(
      documentsByStatus.map(async (doc) => {
        const service = await ctx.db.get(doc.serviceId);
        return { serviceName: service?.name || "Unknown", ...doc };
      })
    );

    const serviceCounts = documentsByService.reduce((acc, doc) => {
      acc[doc.serviceName] = (acc[doc.serviceName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalUsers,
      totalDocuments,
      totalServices,
      statusCounts,
      serviceCounts,
      recentLogs,
    };
  },
});

export const getAdminLogs = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    if (!user || user.role !== "admin") {
      throw new Error("Admin access required");
    }

    const logs = await ctx.db.query("adminLogs")
      .withIndex("by_timestamp")
      .order("desc")
      .take(args.limit || 50);

    return Promise.all(logs.map(async (log) => {
      const admin = await ctx.db.get(log.adminId);
      return {
        ...log,
        adminName: admin?.name || "Unknown Admin",
        adminEmail: admin?.email || "Unknown Email",
      };
    }));
  },
});

export const logAdminAction = mutation({
  args: {
    action: v.string(),
    details: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    if (!user || user.role !== "admin") {
      throw new Error("Admin access required");
    }

    await ctx.db.insert("adminLogs", {
      adminId: userId,
      action: args.action,
      details: args.details,
      timestamp: Date.now(),
    });
  },
});
