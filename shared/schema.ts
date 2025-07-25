import { pgTable, text, serial, integer, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  contactEmail: text("contact_email").notNull(),
  revenueBand: text("revenue_band").notNull(),
  monthlyTransactions: text("monthly_transactions").notNull(),
  industry: text("industry").notNull(),
  cleanupMonths: integer("cleanup_months").notNull(),
  cleanupComplexity: decimal("cleanup_complexity", { precision: 3, scale: 2 }).notNull(),
  cleanupOverride: boolean("cleanup_override").default(false).notNull(),
  overrideReason: text("override_reason"),
  approvalRequired: boolean("approval_required").default(false).notNull(),
  monthlyFee: decimal("monthly_fee", { precision: 10, scale: 2 }).notNull(),
  setupFee: decimal("setup_fee", { precision: 10, scale: 2 }).notNull(),
  // TaaS pricing fields
  taasMonthlyFee: decimal("taas_monthly_fee", { precision: 10, scale: 2 }).default("0").notNull(),
  taasPriorYearsFee: decimal("taas_prior_years_fee", { precision: 10, scale: 2 }).default("0").notNull(),
  // Combined service flags
  includesBookkeeping: boolean("includes_bookkeeping").default(true).notNull(),
  includesTaas: boolean("includes_taas").default(false).notNull(),
  archived: boolean("archived").default(false).notNull(),
  // Quote type - 'bookkeeping' or 'taas'
  quoteType: text("quote_type").default("bookkeeping").notNull(),
  // TaaS-specific fields
  entityType: text("entity_type"), // LLC, S-Corp, C-Corp, Partnership, Sole Prop, Non-Profit
  numEntities: integer("num_entities"),
  statesFiled: integer("states_filed"),
  internationalFiling: boolean("international_filing"),
  numBusinessOwners: integer("num_business_owners"),
  bookkeepingQuality: text("bookkeeping_quality"), // Outside CPA, Self-Managed, Not Done / Behind
  include1040s: boolean("include_1040s"),
  priorYearsUnfiled: integer("prior_years_unfiled"),
  alreadyOnSeedBookkeeping: boolean("already_on_seed_bookkeeping"),
  // User ownership
  ownerId: integer("owner_id").notNull(),
  // HubSpot integration fields
  hubspotContactId: text("hubspot_contact_id"),
  hubspotDealId: text("hubspot_deal_id"),
  hubspotQuoteId: text("hubspot_quote_id"),
  hubspotContactVerified: boolean("hubspot_contact_verified").default(false),
  companyName: text("company_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateQuoteSchema = createInsertSchema(quotes).omit({
  createdAt: true,
}).partial().required({ id: true });

export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type Quote = typeof quotes.$inferSelect;

// Users with HubSpot integration
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(), // @seedfinancial.io email
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  hubspotUserId: text("hubspot_user_id"), // HubSpot user ID for ownership
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Approval codes for cleanup overrides
export const approvalCodes = pgTable("approval_codes", {
  id: serial("id").primaryKey(),
  code: text("code").notNull(),
  contactEmail: text("contact_email").notNull(),
  used: boolean("used").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

export const insertApprovalCodeSchema = createInsertSchema(approvalCodes).omit({
  id: true,
  createdAt: true,
});

export type InsertApprovalCode = z.infer<typeof insertApprovalCodeSchema>;
export type ApprovalCode = typeof approvalCodes.$inferSelect;
