import { 
  professionals, type Professional, type InsertProfessional,
  trainings, type Training, type InsertTraining,
  impactMetrics, type ImpactMetric, type InsertImpactMetric,
  referrals, type Referral, type InsertReferral,
  donors, type Donor, type InsertDonor
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Professional operations
  getProfessional(id: number): Promise<Professional | undefined>;
  listProfessionals(): Promise<Professional[]>;
  createProfessional(professional: InsertProfessional): Promise<Professional>;

  // Training operations
  getTraining(id: number): Promise<Training | undefined>;
  listTrainings(professionalId: number): Promise<Training[]>;
  createTraining(training: InsertTraining): Promise<Training>;

  // Impact metric operations
  getImpactMetric(id: number): Promise<ImpactMetric | undefined>;
  listImpactMetrics(professionalId: number): Promise<ImpactMetric[]>;
  createImpactMetric(metric: InsertImpactMetric): Promise<ImpactMetric>;

  // Referral operations
  getReferral(id: number): Promise<Referral | undefined>;
  listReferrals(): Promise<Referral[]>;
  createReferral(referral: InsertReferral): Promise<Referral>;

  // Donor operations
  getDonor(id: number): Promise<Donor | undefined>;
  listDonors(): Promise<Donor[]>;
  createDonor(donor: InsertDonor): Promise<Donor>;
}

export class DatabaseStorage implements IStorage {
  // Professional operations
  async getProfessional(id: number): Promise<Professional | undefined> {
    const [professional] = await db.select().from(professionals).where(eq(professionals.id, id));
    return professional || undefined;
  }

  async listProfessionals(): Promise<Professional[]> {
    return db.select().from(professionals).orderBy(professionals.createdAt);
  }

  async createProfessional(insertProfessional: InsertProfessional): Promise<Professional> {
    const [professional] = await db
      .insert(professionals)
      .values(insertProfessional)
      .returning();
    return professional;
  }

  // Training operations
  async getTraining(id: number): Promise<Training | undefined> {
    const [training] = await db.select().from(trainings).where(eq(trainings.id, id));
    return training || undefined;
  }

  async listTrainings(professionalId: number): Promise<Training[]> {
    return db
      .select()
      .from(trainings)
      .where(eq(trainings.professionalId, professionalId))
      .orderBy(trainings.completionDate);
  }

  async createTraining(insertTraining: InsertTraining): Promise<Training> {
    const [training] = await db
      .insert(trainings)
      .values(insertTraining)
      .returning();
    return training;
  }

  // Impact metric operations
  async getImpactMetric(id: number): Promise<ImpactMetric | undefined> {
    const [metric] = await db.select().from(impactMetrics).where(eq(impactMetrics.id, id));
    return metric || undefined;
  }

  async listImpactMetrics(professionalId: number): Promise<ImpactMetric[]> {
    return db
      .select()
      .from(impactMetrics)
      .where(eq(impactMetrics.professionalId, professionalId))
      .orderBy(impactMetrics.measurementDate);
  }

  async createImpactMetric(insertMetric: InsertImpactMetric): Promise<ImpactMetric> {
    const [metric] = await db
      .insert(impactMetrics)
      .values(insertMetric)
      .returning();
    return metric;
  }

  // Referral operations
  async getReferral(id: number): Promise<Referral | undefined> {
    const [referral] = await db.select().from(referrals).where(eq(referrals.id, id));
    return referral || undefined;
  }

  async listReferrals(): Promise<Referral[]> {
    return db.select().from(referrals).orderBy(referrals.createdAt);
  }

  async createReferral(insertReferral: InsertReferral): Promise<Referral> {
    const [referral] = await db
      .insert(referrals)
      .values(insertReferral)
      .returning();
    return referral;
  }

  // Donor operations
  async getDonor(id: number): Promise<Donor | undefined> {
    const [donor] = await db.select().from(donors).where(eq(donors.id, id));
    return donor || undefined;
  }

  async listDonors(): Promise<Donor[]> {
    return db.select().from(donors).orderBy(donors.createdAt);
  }

  async createDonor(insertDonor: InsertDonor): Promise<Donor> {
    const [donor] = await db
      .insert(donors)
      .values(insertDonor)
      .returning();
    return donor;
  }
}

export const storage = new DatabaseStorage();