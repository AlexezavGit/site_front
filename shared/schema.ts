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