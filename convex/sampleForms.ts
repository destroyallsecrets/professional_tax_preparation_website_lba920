import { mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createSampleForms = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    if (!user || user.role !== "admin") {
      throw new Error("Admin access required");
    }

    // This would typically be called after uploading actual form files
    // For now, this is just a placeholder to show the structure
    
    const services = await ctx.db.query("services").collect();
    
    // Find the current year tax preparation service
    const currentYearTaxService = services.find(s => 
      s.name.includes("Current Year Tax Preparation")
    );

    if (currentYearTaxService) {
      // In a real implementation, you would upload actual PDF forms
      // and get their storage IDs. This is just showing the structure.
      const sampleForms = [
        {
          title: "Tax Information Organizer",
          description: "Complete this form to organize all your tax documents before your appointment. This helps ensure we have everything needed for your tax return.",
          fileName: "tax-organizer-2024.pdf",
          fileType: "application/pdf",
          uploadedAt: Date.now(),
          // storageId would be set when actually uploading files
        },
        {
          title: "Direct Deposit Authorization",
          description: "Fill out this form to authorize direct deposit of your tax refund to your bank account.",
          fileName: "direct-deposit-form.pdf", 
          fileType: "application/pdf",
          uploadedAt: Date.now(),
        }
      ];

      // Note: In practice, you would need to upload actual files to get storageIds
      // This is just showing the data structure
      console.log("Sample forms structure:", sampleForms);
    }

    return "Sample forms structure created (files would need to be uploaded separately)";
  },
});