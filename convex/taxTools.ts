import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const calculateStandardDeduction = mutation({
  args: {
    filingStatus: v.union(
      v.literal("single"),
      v.literal("marriedFilingJointly"),
      v.literal("marriedFilingSeparately"),
      v.literal("headOfHousehold")
    ),
    taxYear: v.number(),
    age65OrOlder: v.boolean(),
    blind: v.boolean(),
  },
  handler: async (ctx, args) => {
    // 2023 standard deduction amounts
    const standardDeductions = {
      2023: {
        single: 13850,
        marriedFilingJointly: 27700,
        marriedFilingSeparately: 13850,
        headOfHousehold: 20800,
      },
      2024: {
        single: 14600,
        marriedFilingJointly: 29200,
        marriedFilingSeparately: 14600,
        headOfHousehold: 21900,
      }
    };

    const baseDeduction = standardDeductions[args.taxYear as keyof typeof standardDeductions]?.[args.filingStatus] || 0;
    
    // Additional deductions for age and blindness
    let additionalDeduction = 0;
    if (args.age65OrOlder) {
      additionalDeduction += args.filingStatus === "marriedFilingJointly" ? 1500 : 1850;
    }
    if (args.blind) {
      additionalDeduction += args.filingStatus === "marriedFilingJointly" ? 1500 : 1850;
    }

    const totalDeduction = baseDeduction + additionalDeduction;

    // Save calculation if user is logged in
    const userId = await getAuthUserId(ctx);
    if (userId) {
      await ctx.db.insert("taxCalculations", {
        userId,
        calculationType: "standardDeduction",
        inputs: args,
        result: totalDeduction,
        createdAt: Date.now(),
      });
    }

    return {
      baseDeduction,
      additionalDeduction,
      totalDeduction,
      filingStatus: args.filingStatus,
      taxYear: args.taxYear,
    };
  },
});

export const calculateEstimatedTax = mutation({
  args: {
    income: v.number(),
    filingStatus: v.union(
      v.literal("single"),
      v.literal("marriedFilingJointly"),
      v.literal("marriedFilingSeparately"),
      v.literal("headOfHousehold")
    ),
    deductions: v.number(),
    taxYear: v.number(),
  },
  handler: async (ctx, args) => {
    // Simplified tax calculation for estimation purposes
    const taxableIncome = Math.max(0, args.income - args.deductions);
    
    // 2023 tax brackets (simplified)
    const taxBrackets = {
      single: [
        { min: 0, max: 11000, rate: 0.10 },
        { min: 11000, max: 44725, rate: 0.12 },
        { min: 44725, max: 95375, rate: 0.22 },
        { min: 95375, max: 182050, rate: 0.24 },
        { min: 182050, max: 231250, rate: 0.32 },
        { min: 231250, max: 578125, rate: 0.35 },
        { min: 578125, max: Infinity, rate: 0.37 },
      ],
      marriedFilingJointly: [
        { min: 0, max: 22000, rate: 0.10 },
        { min: 22000, max: 89450, rate: 0.12 },
        { min: 89450, max: 190750, rate: 0.22 },
        { min: 190750, max: 364200, rate: 0.24 },
        { min: 364200, max: 462500, rate: 0.32 },
        { min: 462500, max: 693750, rate: 0.35 },
        { min: 693750, max: Infinity, rate: 0.37 },
      ],
    };

    const brackets = taxBrackets[args.filingStatus as keyof typeof taxBrackets] || taxBrackets.single;
    
    let tax = 0;
    let remainingIncome = taxableIncome;

    for (const bracket of brackets) {
      if (remainingIncome <= 0) break;
      
      const taxableAtThisBracket = Math.min(remainingIncome, bracket.max - bracket.min);
      tax += taxableAtThisBracket * bracket.rate;
      remainingIncome -= taxableAtThisBracket;
    }

    const effectiveRate = taxableIncome > 0 ? (tax / taxableIncome) * 100 : 0;
    const marginalRate = brackets.find(b => taxableIncome > b.min && taxableIncome <= b.max)?.rate || 0;

    // Save calculation if user is logged in
    const userId = await getAuthUserId(ctx);
    if (userId) {
      await ctx.db.insert("taxCalculations", {
        userId,
        calculationType: "estimatedTax",
        inputs: args,
        result: tax,
        createdAt: Date.now(),
      });
    }

    return {
      taxableIncome,
      estimatedTax: Math.round(tax),
      effectiveRate: Math.round(effectiveRate * 100) / 100,
      marginalRate: Math.round(marginalRate * 10000) / 100,
    };
  },
});

export const getTaxDueDates = query({
  args: { taxYear: v.number() },
  handler: async (ctx, args) => {
    const year = args.taxYear;
    
    return {
      taxYear: year,
      dueDates: [
        {
          date: `April 15, ${year + 1}`,
          description: "Individual Income Tax Return Filing Deadline",
          type: "filing",
        },
        {
          date: `January 31, ${year + 1}`,
          description: "W-2 and 1099 Forms Due to Recipients",
          type: "forms",
        },
        {
          date: `March 15, ${year + 1}`,
          description: "S Corporation and Partnership Returns Due",
          type: "business",
        },
        {
          date: `October 15, ${year + 1}`,
          description: "Extended Filing Deadline (with extension)",
          type: "extension",
        },
      ],
      quarterlyDates: [
        { quarter: "Q1", date: `April 15, ${year + 1}`, description: "First Quarter Estimated Tax" },
        { quarter: "Q2", date: `June 15, ${year + 1}`, description: "Second Quarter Estimated Tax" },
        { quarter: "Q3", date: `September 15, ${year + 1}`, description: "Third Quarter Estimated Tax" },
        { quarter: "Q4", date: `January 15, ${year + 2}`, description: "Fourth Quarter Estimated Tax" },
      ],
    };
  },
});
