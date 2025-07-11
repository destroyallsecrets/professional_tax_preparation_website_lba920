import { mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const initializeSampleServices = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    if (!user || user.role !== "admin") {
      throw new Error("Admin access required");
    }

    // Check if services already exist
    const existingServices = await ctx.db.query("services").collect();
    if (existingServices.length > 0) {
      return "Services already exist";
    }

    const sampleServices = [
      {
        name: "Individual Tax Return (Form 1040)",
        description: "Complete individual tax return preparation with maximum deduction optimization",
        detailedDescription: "Our comprehensive individual tax return service includes preparation of Form 1040 with all necessary schedules and forms. We review your income sources, identify all eligible deductions and credits, and ensure compliance with current tax laws. Our experienced professionals will maximize your refund while minimizing your tax liability.",
        category: "Individual Tax Services",
        price: "$199",
        requiredDocuments: [
          "W-2 Forms from all employers",
          "1099 Forms (Interest, Dividends, Misc Income)",
          "Previous year tax return",
          "Social Security cards for all family members",
          "Bank account information for direct deposit",
          "Receipts for deductible expenses"
        ],
        processingTime: "5-7 business days",
        additionalNotes: "E-filing included. State tax return preparation available for an additional fee.",
        officialLinks: [
          { title: "IRS Form 1040 Instructions", url: "https://www.irs.gov/forms-pubs/about-form-1040" },
          { title: "Standard Deduction Amounts", url: "https://www.irs.gov/newsroom/irs-provides-tax-inflation-adjustments-for-tax-year-2024" }
        ],
        isActive: true
      },
      {
        name: "Small Business Tax Return (Form 1120S)",
        description: "S-Corporation tax return preparation with comprehensive business deduction analysis",
        detailedDescription: "Professional preparation of Form 1120S for S-Corporations including all required schedules and K-1 preparation for shareholders. We analyze business expenses, depreciation schedules, and ensure proper allocation of income and losses to shareholders. Includes quarterly estimated tax planning.",
        category: "Business Tax Services",
        price: "$599",
        requiredDocuments: [
          "Profit & Loss Statement",
          "Balance Sheet",
          "Bank statements for all business accounts",
          "Receipts for business expenses",
          "Payroll records and Forms 941",
          "Previous year business tax return",
          "Articles of Incorporation and S-Election"
        ],
        processingTime: "10-14 business days",
        additionalNotes: "Includes one state return. Additional states and complex K-1 allocations may incur extra fees.",
        officialLinks: [
          { title: "IRS Form 1120S Instructions", url: "https://www.irs.gov/forms-pubs/about-form-1120s" },
          { title: "S-Corporation Tax Information", url: "https://www.irs.gov/businesses/small-businesses-self-employed/s-corporations" }
        ],
        isActive: true
      },
      {
        name: "Tax Planning Consultation",
        description: "Strategic year-round tax planning to minimize your tax liability",
        detailedDescription: "Comprehensive tax planning session focused on reducing your overall tax burden through strategic planning. We review your current financial situation, analyze potential tax-saving opportunities, and develop a customized plan for the current and future tax years. Includes retirement planning, investment strategies, and business structure optimization.",
        category: "Tax Planning & Consultation",
        price: "$299",
        requiredDocuments: [
          "Previous 3 years tax returns",
          "Current year income projections",
          "Investment account statements",
          "Retirement account statements",
          "Business financial statements (if applicable)",
          "Estate planning documents"
        ],
        officialLinks: [
          { title: "Tax Planning Strategies", url: "https://www.irs.gov/businesses/small-businesses-self-employed/tax-planning" },
          { title: "Retirement Plan Contributions", url: "https://www.irs.gov/retirement-plans" }
        ],
        isActive: true
      },
      {
        name: "Quarterly Estimated Tax Payments",
        description: "Calculate and manage quarterly estimated tax payments for self-employed individuals",
        detailedDescription: "Professional calculation and management of quarterly estimated tax payments for self-employed individuals, freelancers, and business owners. We analyze your income projections, calculate required payments, and provide payment vouchers with due date reminders to avoid penalties.",
        category: "Tax Planning & Consultation",
        price: "$149",
        requiredDocuments: [
          "Previous year tax return",
          "Current year income records",
          "Business profit & loss statements",
          "Self-employment income documentation",
          "Previous quarterly payment records"
        ],
        officialLinks: [
          { title: "Estimated Tax Payments", url: "https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes" },
          { title: "Form 1040ES", url: "https://www.irs.gov/forms-pubs/about-form-1040es" }
        ],
        isActive: true
      },
      {
        name: "IRS Audit Representation",
        description: "Professional representation and support during IRS audits and examinations",
        detailedDescription: "Complete representation before the IRS during audits, examinations, and appeals. Our experienced professionals will handle all communications with the IRS, prepare necessary documentation, and represent your interests throughout the audit process. Includes preparation for audit meetings and negotiation of settlements when appropriate.",
        category: "Tax Resolution Services",
        price: "$499",
        requiredDocuments: [
          "IRS audit notice or correspondence",
          "All tax returns for years under examination",
          "Supporting documentation for questioned items",
          "Bank statements and financial records",
          "Business records (if applicable)",
          "Previous IRS correspondence"
        ],
        officialLinks: [
          { title: "IRS Audit Process", url: "https://www.irs.gov/businesses/small-businesses-self-employed/irs-audits" },
          { title: "Taxpayer Rights", url: "https://www.irs.gov/taxpayer-advocate/taxpayer-rights" }
        ],
        isActive: true
      }
    ];

    for (const service of sampleServices) {
      await ctx.db.insert("services", service);
    }

    return "Sample services created successfully";
  },
});
