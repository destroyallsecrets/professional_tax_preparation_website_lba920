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

    // Create categories and get their IDs
    const categories = [
      "Tax Services",
      "Business Tax Services",
      "Tax Planning & Consultation",
      "Tax Resolution Services",
      "Notary Services",
      "Additional Services",
    ];

    const categoryIds = new Map<string, any>();
    for (const name of categories) {
      const existingCategory = await ctx.db
        .query("categories")
        .filter((q) => q.eq(q.field("name"), name))
        .first();
      if (existingCategory) {
        categoryIds.set(name, existingCategory._id);
      } else {
        const categoryId = await ctx.db.insert("categories", {
          name,
          createdAt: Date.now(),
        });
        categoryIds.set(name, categoryId);
      }
    }

    const sampleServices = [
      // Tax Services
      {
        name: "Current Year Tax Preparation and Filing",
        description: "Professional preparation and e-filing of your current year tax returns with maximum deduction optimization",
        detailedDescription: "Complete preparation of your current year individual or business tax returns. We ensure accuracy, maximize deductions and credits, and handle all e-filing requirements. Our experienced tax professionals stay current with the latest tax law changes to ensure you receive every benefit you're entitled to. Includes federal and state returns where applicable.",
        categoryId: categoryIds.get("Tax Services"),
        price: "Starting at $150",
        requiredDocuments: [
          "W-2 Forms from all employers",
          "1099 Forms (Interest, Dividends, Misc Income, etc.)",
          "Previous year tax return for reference",
          "Social Security cards for all family members",
          "Bank account information for direct deposit",
          "Receipts for deductible expenses",
          "Health insurance forms (1095-A, B, or C)",
          "Childcare provider information and receipts"
        ],
        processingTime: "3-5 business days",
        additionalNotes: "E-filing included. Same-day service available for additional fee. Free consultation to review your tax situation.",
        officialLinks: [
          { title: "IRS Tax Filing Requirements", url: "https://www.irs.gov/filing" },
          { title: "Indiana Department of Revenue", url: "https://www.in.gov/dor/" }
        ],
        isActive: true
      },
      {
        name: "Past Year(s) Tax Preparation and Filing",
        description: "Preparation and filing of prior year tax returns for missed or amended filings",
        detailedDescription: "Professional preparation of past year tax returns for individuals and businesses who missed filing deadlines or need to amend previous returns. We handle all necessary forms, calculate penalties and interest, and work to minimize your tax liability. Includes assistance with payment plans if needed and communication with tax authorities.",
        categoryId: categoryIds.get("Tax Services"),
        price: "Starting at $200",
        requiredDocuments: [
          "All income documents for the tax year(s) in question",
          "Previous tax returns if available",
          "Any IRS or state correspondence received",
          "Bank statements and financial records",
          "Business records for applicable years",
          "Documentation of estimated payments made"
        ],
        processingTime: "5-10 business days",
        additionalNotes: "Additional fees may apply for complex situations or multiple years. Payment plan assistance available.",
        officialLinks: [
          { title: "Filing Past Due Returns", url: "https://www.irs.gov/filing/individuals/filing-past-due-tax-returns" },
          { title: "Amended Returns", url: "https://www.irs.gov/forms-pubs/about-form-1040x" }
        ],
        isActive: true
      },
      {
        name: "Business Filing for Current Tax Year",
        description: "Complete business tax return preparation for corporations, partnerships, and LLCs",
        detailedDescription: "Professional preparation of business tax returns including Forms 1120, 1120S, 1065, and Schedule C. We analyze business expenses, depreciation schedules, and ensure proper tax treatment of all business transactions. Includes K-1 preparation for partners and shareholders, quarterly estimated tax planning, and business deduction optimization.",
        categoryId: categoryIds.get("Business Tax Services"),
        price: "Starting at $400",
        requiredDocuments: [
          "Profit & Loss Statement",
          "Balance Sheet",
          "Bank statements for all business accounts",
          "Receipts for business expenses",
          "Payroll records and Forms 941",
          "Previous year business tax return",
          "Articles of Incorporation or Operating Agreement",
          "Depreciation schedules",
          "1099s issued and received"
        ],
        processingTime: "7-14 business days",
        additionalNotes: "Includes one state return. Multi-state filings and complex allocations may incur additional fees.",
        officialLinks: [
          { title: "Business Tax Forms", url: "https://www.irs.gov/businesses/small-businesses-self-employed/business-tax-forms" },
          { title: "Business Deductions", url: "https://www.irs.gov/businesses/small-businesses-self-employed/deducting-business-expenses" }
        ],
        isActive: true
      },
      {
        name: "Business Filing for Past Tax Year(s)",
        description: "Preparation of delinquent business tax returns with penalty minimization strategies",
        detailedDescription: "Professional preparation of past due business tax returns with focus on minimizing penalties and interest. We handle complex multi-year filings, work with tax authorities to establish payment plans, and ensure compliance going forward. Includes analysis of potential penalty abatement opportunities and representation in communications with tax agencies.",
        categoryId: categoryIds.get("Business Tax Services"),
        price: "Starting at $500",
        requiredDocuments: [
          "Financial statements for all years in question",
          "Bank statements and business records",
          "Any tax correspondence received",
          "Previous business tax returns if available",
          "Payroll records and employment tax filings",
          "Business licenses and formation documents"
        ],
        processingTime: "10-21 business days",
        additionalNotes: "Complex cases may require additional time. Payment plan assistance and penalty abatement requests included.",
        officialLinks: [
          { title: "Business Filing Requirements", url: "https://www.irs.gov/businesses/small-businesses-self-employed/business-filing-requirements" },
          { title: "Penalty Relief", url: "https://www.irs.gov/businesses/small-businesses-self-employed/penalty-relief-due-to-first-time-penalty-abatement-or-other-administrative-waiver" }
        ],
        isActive: true
      },
      {
        name: "Tax Planning",
        description: "Strategic year-round tax planning to minimize your tax liability and maximize savings",
        detailedDescription: "Comprehensive tax planning services designed to reduce your overall tax burden through strategic planning and timing. We analyze your current financial situation, project future tax scenarios, and develop customized strategies for tax minimization. Includes retirement planning, investment timing, business structure optimization, and estate planning considerations.",
        categoryId: categoryIds.get("Tax Planning & Consultation"),
        price: "Starting at $250",
        requiredDocuments: [
          "Previous 3 years tax returns",
          "Current year income projections",
          "Investment account statements",
          "Retirement account statements",
          "Business financial statements (if applicable)",
          "Estate planning documents",
          "Insurance policies",
          "Real estate documents"
        ],
        processingTime: "Initial consultation within 3 business days",
        additionalNotes: "Includes written tax planning report and quarterly check-ins. Implementation support available.",
        officialLinks: [
          { title: "Tax Planning Strategies", url: "https://www.irs.gov/businesses/small-businesses-self-employed/tax-planning" },
          { title: "Retirement Planning", url: "https://www.irs.gov/retirement-plans" }
        ],
        isActive: true
      },
      {
        name: "Audit and Conflict Resolution Support",
        description: "Professional representation and support during IRS audits, examinations, and tax disputes",
        detailedDescription: "Complete representation before the IRS and state tax authorities during audits, examinations, and appeals. Our experienced professionals handle all communications, prepare necessary documentation, and represent your interests throughout the process. Includes audit preparation, document organization, negotiation of settlements, and appeals representation when needed.",
        categoryId: categoryIds.get("Tax Resolution Services"),
        price: "Starting at $500",
        requiredDocuments: [
          "IRS audit notice or correspondence",
          "All tax returns for years under examination",
          "Supporting documentation for questioned items",
          "Bank statements and financial records",
          "Business records (if applicable)",
          "Previous IRS correspondence",
          "Power of Attorney forms"
        ],
        processingTime: "Immediate response to audit notices",
        additionalNotes: "Hourly rates apply for extended representation. Payment plans available for resolution settlements.",
        officialLinks: [
          { title: "IRS Audit Process", url: "https://www.irs.gov/businesses/small-businesses-self-employed/irs-audits" },
          { title: "Taxpayer Rights", url: "https://www.irs.gov/taxpayer-advocate/taxpayer-rights" }
        ],
        isActive: true
      },
      
      // Notary Services
      {
        name: "Notarization",
        description: "Professional notary services for legal documents, contracts, and official paperwork",
        detailedDescription: "Certified notary public services for all types of documents requiring notarization. We verify identity, witness signatures, and provide official notarial certificates. Our notary services meet all Indiana state requirements and are accepted nationwide. Available for real estate documents, legal contracts, powers of attorney, and other important paperwork.",
        categoryId: categoryIds.get("Notary Services"),
        price: "$10 per signature",
        requiredDocuments: [
          "Valid government-issued photo ID (driver's license, passport, state ID)",
          "Documents to be notarized (must be unsigned)",
          "Additional identification if name on ID differs from document"
        ],
        processingTime: "Same day service",
        additionalNotes: "Mobile notary services available for additional fee. Evening and weekend appointments by arrangement.",
        officialLinks: [
          { title: "Indiana Notary Requirements", url: "https://www.in.gov/sos/business-services/notary-division/" },
          { title: "Notary Public Handbook", url: "https://www.nationalnotary.org/" }
        ],
        isActive: true
      },
      {
        name: "Notarial Acknowledgement",
        description: "Official acknowledgement services for legal documents and real estate transactions",
        detailedDescription: "Professional notarial acknowledgement services where the signer personally appears before the notary and acknowledges that they signed the document voluntarily. Commonly required for real estate deeds, mortgages, powers of attorney, and other legal documents. We ensure proper identification and complete all required notarial certificates.",
        categoryId: categoryIds.get("Notary Services"),
        price: "$10 per acknowledgement",
        requiredDocuments: [
          "Valid government-issued photo ID",
          "Document requiring acknowledgement",
          "Proof of signing authority if acting on behalf of entity"
        ],
        processingTime: "Immediate service",
        additionalNotes: "Real estate closing services available. Bulk document discounts for multiple acknowledgements.",
        officialLinks: [
          { title: "Acknowledgement Requirements", url: "https://www.in.gov/sos/business-services/notary-division/" },
          { title: "Real Estate Notarization", url: "https://www.nationalnotary.org/notary-bulletin/blog/2019/09/notarizing-real-estate-documents" }
        ],
        isActive: true
      },
      {
        name: "Jurat",
        description: "Sworn statement notarization with oath or affirmation administration",
        detailedDescription: "Professional jurat services where the signer takes an oath or affirmation before the notary that the contents of the document are true. The signer must sign the document in the presence of the notary. Commonly used for affidavits, depositions, and sworn statements. We administer the required oath and complete the jurat certificate.",
        categoryId: categoryIds.get("Notary Services"),
        price: "$10 per jurat",
        requiredDocuments: [
          "Valid government-issued photo ID",
          "Document requiring jurat (must be signed in notary's presence)",
          "Understanding of document contents for oath taking"
        ],
        processingTime: "Immediate service",
        additionalNotes: "Signer must be able to take oath or affirmation. Translation services available if needed.",
        officialLinks: [
          { title: "Jurat vs Acknowledgement", url: "https://www.nationalnotary.org/notary-bulletin/blog/2014/09/notary-basics-the-difference-between-acknowledgments-and-jurats" },
          { title: "Oath Administration", url: "https://www.in.gov/sos/business-services/notary-division/" }
        ],
        isActive: true
      },
      {
        name: "Signature Witnessing",
        description: "Professional witnessing of document signatures with notarial certificate",
        detailedDescription: "Signature witnessing services where the notary watches the signer sign the document and then signs as a witness. This service is used when a document requires a witness signature but not a full notarization. We verify the signer's identity and provide our signature and seal as an official witness to the signing.",
        categoryId: categoryIds.get("Notary Services"),
        price: "$10 per witnessing",
        requiredDocuments: [
          "Valid government-issued photo ID",
          "Document requiring witness signature",
          "Document must be signed in notary's presence"
        ],
        processingTime: "Immediate service",
        additionalNotes: "Available for wills, contracts, and other legal documents requiring witnesses.",
        officialLinks: [
          { title: "Witness Requirements", url: "https://www.nationalnotary.org/" },
          { title: "Document Witnessing", url: "https://www.in.gov/sos/business-services/notary-division/" }
        ],
        isActive: true
      },
      {
        name: "Notarial Copy Certification",
        description: "Certification of true copies of original documents",
        detailedDescription: "Professional copy certification services where we certify that a photocopy is a true and accurate reproduction of an original document. The notary compares the copy to the original document and provides a certificate stating the copy is accurate. Commonly used for diplomas, transcripts, passports, and other important documents.",
        categoryId: categoryIds.get("Notary Services"),
        price: "$10 per certification",
        requiredDocuments: [
          "Original document to be copied",
          "Photocopy of the document",
          "Valid ID of person requesting certification"
        ],
        processingTime: "Immediate service",
        additionalNotes: "Cannot certify copies of vital records (birth certificates, death certificates, marriage licenses). Some restrictions apply.",
        officialLinks: [
          { title: "Copy Certification Rules", url: "https://www.nationalnotary.org/notary-bulletin/blog/2017/05/copy-certification-what-notaries-need-to-know" },
          { title: "Indiana Copy Certification", url: "https://www.in.gov/sos/business-services/notary-division/" }
        ],
        isActive: true
      },
      {
        name: "Apostille or Authentication",
        description: "Document authentication services for international use",
        detailedDescription: "Professional assistance with apostille and authentication services for documents intended for use in foreign countries. We help prepare documents for submission to the Indiana Secretary of State or U.S. State Department for official authentication. This service validates the notary's signature and seal for international recognition under the Hague Convention.",
        categoryId: categoryIds.get("Notary Services"),
        price: "$25 plus state fees",
        requiredDocuments: [
          "Notarized document requiring apostille",
          "Completed apostille application",
          "Payment for state processing fees",
          "Information about destination country"
        ],
        processingTime: "5-10 business days (state processing time)",
        additionalNotes: "Rush processing available through state for additional fees. We handle all paperwork and submission.",
        officialLinks: [
          { title: "Indiana Apostille Services", url: "https://www.in.gov/sos/business-services/apostille-authentication/" },
          { title: "Hague Convention Countries", url: "https://www.hcch.net/en/instruments/conventions/status-table/?cid=41" }
        ],
        isActive: true
      },
      {
        name: "Fingerprinting",
        description: "Professional fingerprinting services for background checks and licensing",
        detailedDescription: "Professional ink and digital fingerprinting services for employment background checks, professional licensing, immigration applications, and other official purposes. We use FBI-approved methods and provide clean, clear prints that meet all agency requirements. Our experienced staff ensures proper technique for successful submissions.",
        categoryId: categoryIds.get("Additional Services"),
        price: "$25 per set",
        requiredDocuments: [
          "Valid government-issued photo ID",
          "Fingerprint cards or forms (if provided by requesting agency)",
          "Information about requesting agency and purpose"
        ],
        processingTime: "Immediate service",
        additionalNotes: "Digital fingerprinting available for electronic submission. Multiple sets available at discounted rates.",
        officialLinks: [
          { title: "FBI Fingerprinting", url: "https://www.fbi.gov/services/cjis/fingerprints-and-other-biometrics" },
          { title: "Indiana State Police Background Checks", url: "https://www.in.gov/isp/2829.htm" }
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
