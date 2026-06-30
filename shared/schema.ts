import { pgTable, text, serial, timestamp, integer, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const professionals = pgTable("professionals", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  specialization: text("specialization").notNull(),
  yearsExperience: integer("years_experience").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const trainings = pgTable("trainings", {
  id: serial("id").primaryKey(),
  professionalId: integer("professional_id").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  completionDate: timestamp("completion_date").notNull(),
  certificateUrl: text("certificate_url"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const impactMetrics = pgTable("impact_metrics", {
  id: serial("id").primaryKey(),
  professionalId: integer("professional_id").notNull(),
  metricType: text("metric_type").notNull(),
  value: decimal("value").notNull(),
  measurementDate: timestamp("measurement_date").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const referrals = pgTable("referrals", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  status: text("status").default('new'),
  serviceType: text("service_type").default('general'),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const donors = pgTable("donors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  organizationType: text("organization_type").notNull(),
  contactPerson: text("contact_person").notNull(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const insertProfessionalSchema = createInsertSchema(professionals).omit({
  id: true,
  createdAt: true,
  isActive: true
});

export type InsertProfessional = z.infer<typeof insertProfessionalSchema>;
export type Professional = typeof professionals.$inferSelect;

export const insertTrainingSchema = createInsertSchema(trainings).omit({
  id: true,
  createdAt: true
});

export type InsertTraining = z.infer<typeof insertTrainingSchema>;
export type Training = typeof trainings.$inferSelect;

export const insertImpactMetricSchema = createInsertSchema(impactMetrics).omit({
  id: true,
  createdAt: true
});

export type InsertImpactMetric = z.infer<typeof insertImpactMetricSchema>;
export type ImpactMetric = typeof impactMetrics.$inferSelect;

export const insertReferralSchema = createInsertSchema(referrals).omit({
  id: true,
  createdAt: true,
  status: true,
  serviceType: true
}).extend({
  email: z.string().email(),
  phone: z.string().min(10).max(15)
});

export type InsertReferral = z.infer<typeof insertReferralSchema>;
export type Referral = typeof referrals.$inferSelect;

export const insertDonorSchema = createInsertSchema(donors).omit({
  id: true,
  createdAt: true
}).extend({
  email: z.string().email()
});

export type InsertDonor = z.infer<typeof insertDonorSchema>;
export type Donor = typeof donors.$inferSelect;

// Role-based user system (enables multi-role switching)
export const userRoles = pgTable("user_roles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  role: text("role").notNull(), // donor | provider | beneficiary | supervisor
  isPrimary: boolean("is_primary").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Funding programs created by donors
export const fundingPrograms = pgTable("funding_programs", {
  id: serial("id").primaryKey(),
  donorId: integer("donor_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  budgetTotal: integer("budget_total").notNull(),
  budgetUsed: integer("budget_used").default(0).notNull(),
  maxSessionCost: integer("max_session_cost").notNull(),
  autoApprove: boolean("auto_approve").default(false).notNull(),
  requiredCredentials: text("required_credentials").array().notNull(),
  beneficiaryEligibility: text("beneficiary_eligibility").array().notNull(),
  status: text("status").default('draft').notNull(), // draft | active | paused | closed
  startsAt: timestamp("starts_at"),
  endsAt: timestamp("ends_at"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Program enrollments (providers or beneficiaries sign up)
export const programEnrollments = pgTable("program_enrollments", {
  id: serial("id").primaryKey(),
  programId: integer("program_id").notNull(),
  userId: integer("user_id").notNull(),
  userRole: text("user_role").notNull(), // provider | beneficiary
  status: text("status").default('pending').notNull(), // pending | compliance_review | approved | rejected
  complianceData: text("compliance_data"),
  enrolledAt: timestamp("enrolled_at").defaultNow().notNull(),
  approvedAt: timestamp("approved_at")
});

// Projects created by providers under a program
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  providerId: integer("provider_id").notNull(),
  programId: integer("program_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  beneficiaries: integer("beneficiaries").array().notNull(),
  sessionsPlanned: integer("sessions_planned").notNull(),
  sessionsCompleted: integer("sessions_completed").default(0).notNull(),
  budgetAllocated: integer("budget_allocated").notNull(),
  budgetSpent: integer("budget_spent").default(0).notNull(),
  status: text("status").default('draft').notNull(), // draft | submitted | approved | active | completed
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Reports on projects
export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  type: text("type").notNull(), // progress | final | financial
  periodStart: timestamp("period_start").notNull(),
  periodEnd: timestamp("period_end").notNull(),
  beneficiariesServed: integer("beneficiaries_served").default(0).notNull(),
  sessionsDelivered: integer("sessions_delivered").default(0).notNull(),
  outcomes: text("outcomes").notNull(), // JSON string
  status: text("status").default('draft').notNull(), // draft | submitted | reviewed | approved
  submittedAt: timestamp("submitted_at"),
  approvedAt: timestamp("approved_at"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Insert schemas
export const insertUserRoleSchema = createInsertSchema(userRoles).omit({
  id: true, createdAt: true
});
export type InsertUserRole = z.infer<typeof insertUserRoleSchema>;
export type UserRole = typeof userRoles.$inferSelect;

export const insertFundingProgramSchema = createInsertSchema(fundingPrograms).omit({
  id: true, createdAt: true, budgetUsed: true, status: true
});
export type InsertFundingProgram = z.infer<typeof insertFundingProgramSchema>;
export type FundingProgram = typeof fundingPrograms.$inferSelect;

export const insertProgramEnrollmentSchema = createInsertSchema(programEnrollments).omit({
  id: true, enrolledAt: true, approvedAt: true, status: true, complianceData: true
});
export type InsertProgramEnrollment = z.infer<typeof insertProgramEnrollmentSchema>;
export type ProgramEnrollment = typeof programEnrollments.$inferSelect;

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true, createdAt: true, sessionsCompleted: true, budgetSpent: true, status: true
});
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export const insertReportSchema = createInsertSchema(reports).omit({
  id: true, createdAt: true, status: true, submittedAt: true, approvedAt: true
});
export type InsertReport = z.infer<typeof insertReportSchema>;
export type Report = typeof reports.$inferSelect;