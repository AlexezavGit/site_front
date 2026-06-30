import { 
  professionals, type Professional, type InsertProfessional,
  trainings, type Training, type InsertTraining,
  impactMetrics, type ImpactMetric, type InsertImpactMetric,
  referrals, type Referral, type InsertReferral,
  donors, type Donor, type InsertDonor,
  fundingPrograms, type FundingProgram, type InsertFundingProgram,
  programEnrollments, type ProgramEnrollment, type InsertProgramEnrollment,
  projects, type Project, type InsertProject,
  reports, type Report, type InsertReport,
  userRoles, type UserRole, type InsertUserRole
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

  // User roles (multi-role system)
  getUserRoles(userId: number): Promise<UserRole[]>;
  createUserRole(role: InsertUserRole): Promise<UserRole>;

  // Funding program operations
  getFundingProgram(id: number): Promise<FundingProgram | undefined>;
  listFundingPrograms(donorId?: number): Promise<FundingProgram[]>;
  listActiveFundingPrograms(): Promise<FundingProgram[]>;
  createFundingProgram(program: InsertFundingProgram): Promise<FundingProgram>;
  updateFundingProgramStatus(id: number, status: string): Promise<FundingProgram | undefined>;

  // Program enrollment operations
  getProgramEnrollment(id: number): Promise<ProgramEnrollment | undefined>;
  listProgramEnrollments(programId?: number): Promise<ProgramEnrollment[]>;
  listUserEnrollments(userId: number): Promise<ProgramEnrollment[]>;
  createProgramEnrollment(enrollment: InsertProgramEnrollment): Promise<ProgramEnrollment>;
  updateEnrollmentStatus(id: number, status: string): Promise<ProgramEnrollment | undefined>;

  // Project operations
  getProject(id: number): Promise<Project | undefined>;
  listProjects(providerId?: number): Promise<Project[]>;
  listProgramProjects(programId: number): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProjectStatus(id: number, status: string): Promise<Project | undefined>;

  // Report operations
  getReport(id: number): Promise<Report | undefined>;
  listReports(projectId?: number): Promise<Report[]>;
  createReport(report: InsertReport): Promise<Report>;
  updateReportStatus(id: number, status: string): Promise<Report | undefined>;
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

  // User roles
  async getUserRoles(userId: number): Promise<UserRole[]> {
    return db.select().from(userRoles).where(eq(userRoles.userId, userId));
  }

  async createUserRole(insertRole: InsertUserRole): Promise<UserRole> {
    const [role] = await db.insert(userRoles).values(insertRole).returning();
    return role;
  }

  // Funding programs
  async getFundingProgram(id: number): Promise<FundingProgram | undefined> {
    const [program] = await db.select().from(fundingPrograms).where(eq(fundingPrograms.id, id));
    return program || undefined;
  }

  async listFundingPrograms(donorId?: number): Promise<FundingProgram[]> {
    if (donorId) {
      return db.select().from(fundingPrograms).where(eq(fundingPrograms.donorId, donorId)).orderBy(fundingPrograms.createdAt);
    }
    return db.select().from(fundingPrograms).orderBy(fundingPrograms.createdAt);
  }

  async listActiveFundingPrograms(): Promise<FundingProgram[]> {
    return db.select().from(fundingPrograms).where(eq(fundingPrograms.status, 'active')).orderBy(fundingPrograms.createdAt);
  }

  async createFundingProgram(insertProgram: InsertFundingProgram): Promise<FundingProgram> {
    const [program] = await db.insert(fundingPrograms).values(insertProgram).returning();
    return program;
  }

  async updateFundingProgramStatus(id: number, status: string): Promise<FundingProgram | undefined> {
    const [program] = await db.update(fundingPrograms).set({ status }).where(eq(fundingPrograms.id, id)).returning();
    return program || undefined;
  }

  // Program enrollments
  async getProgramEnrollment(id: number): Promise<ProgramEnrollment | undefined> {
    const [enrollment] = await db.select().from(programEnrollments).where(eq(programEnrollments.id, id));
    return enrollment || undefined;
  }

  async listProgramEnrollments(programId?: number): Promise<ProgramEnrollment[]> {
    if (programId) {
      return db.select().from(programEnrollments).where(eq(programEnrollments.programId, programId));
    }
    return db.select().from(programEnrollments);
  }

  async listUserEnrollments(userId: number): Promise<ProgramEnrollment[]> {
    return db.select().from(programEnrollments).where(eq(programEnrollments.userId, userId));
  }

  async createProgramEnrollment(insertEnrollment: InsertProgramEnrollment): Promise<ProgramEnrollment> {
    const [enrollment] = await db.insert(programEnrollments).values(insertEnrollment).returning();
    return enrollment;
  }

  async updateEnrollmentStatus(id: number, status: string): Promise<ProgramEnrollment | undefined> {
    const updates: any = { status };
    if (status === 'approved') updates.approvedAt = new Date();
    const [enrollment] = await db.update(programEnrollments).set(updates).where(eq(programEnrollments.id, id)).returning();
    return enrollment || undefined;
  }

  // Projects
  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }

  async listProjects(providerId?: number): Promise<Project[]> {
    if (providerId) {
      return db.select().from(projects).where(eq(projects.providerId, providerId)).orderBy(projects.createdAt);
    }
    return db.select().from(projects).orderBy(projects.createdAt);
  }

  async listProgramProjects(programId: number): Promise<Project[]> {
    return db.select().from(projects).where(eq(projects.programId, programId)).orderBy(projects.createdAt);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }

  async updateProjectStatus(id: number, status: string): Promise<Project | undefined> {
    const [project] = await db.update(projects).set({ status }).where(eq(projects.id, id)).returning();
    return project || undefined;
  }

  // Reports
  async getReport(id: number): Promise<Report | undefined> {
    const [report] = await db.select().from(reports).where(eq(reports.id, id));
    return report || undefined;
  }

  async listReports(projectId?: number): Promise<Report[]> {
    if (projectId) {
      return db.select().from(reports).where(eq(reports.projectId, projectId)).orderBy(reports.createdAt);
    }
    return db.select().from(reports).orderBy(reports.createdAt);
  }

  async createReport(insertReport: InsertReport): Promise<Report> {
    const [report] = await db.insert(reports).values(insertReport).returning();
    return report;
  }

  async updateReportStatus(id: number, status: string): Promise<Report | undefined> {
    const updates: any = { status };
    if (status === 'submitted') updates.submittedAt = new Date();
    if (status === 'approved') updates.approvedAt = new Date();
    const [report] = await db.update(reports).set(updates).where(eq(reports.id, id)).returning();
    return report || undefined;
  }
}

export const storage = new DatabaseStorage();