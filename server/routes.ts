import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertReferralSchema,
  insertFundingProgramSchema,
  insertProgramEnrollmentSchema,
  insertProjectSchema,
  insertReportSchema
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";

export function registerRoutes(app: Express): Server {
  // Helper for error handling
  const handleZodError = (error: unknown, res: any) => {
    if (error instanceof ZodError) {
      res.status(400).json({ message: fromZodError(error).message });
    } else {
      console.error(error);
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  };

  // Referral endpoints
  app.post("/api/referrals", async (req, res) => {
    try {
      const parsed = insertReferralSchema.parse(req.body);
      const referral = await storage.createReferral(parsed);
      res.json(referral);
    } catch (error) { handleZodError(error, res); }
  });

  app.get("/api/referrals", async (_req, res) => {
    try {
      const referrals = await storage.listReferrals();
      res.json(referrals);
    } catch (error) { res.status(500).json({ message: "Failed to retrieve referrals" }); }
  });

  // Funding programs
  app.get("/api/programs", async (_req, res) => {
    try {
      const programs = await storage.listActiveFundingPrograms();
      res.json(programs);
    } catch (error) { res.status(500).json({ message: "Failed to retrieve programs" }); }
  });

  app.get("/api/programs/all", async (_req, res) => {
    try {
      const programs = await storage.listFundingPrograms();
      res.json(programs);
    } catch (error) { res.status(500).json({ message: "Failed to retrieve programs" }); }
  });

  app.get("/api/programs/:id", async (req, res) => {
    try {
      const program = await storage.getFundingProgram(Number(req.params.id));
      if (!program) return res.status(404).json({ message: "Program not found" });
      res.json(program);
    } catch (error) { res.status(500).json({ message: "Failed to retrieve program" }); }
  });

  app.post("/api/programs", async (req, res) => {
    try {
      const parsed = insertFundingProgramSchema.parse(req.body);
      const program = await storage.createFundingProgram(parsed);
      res.json(program);
    } catch (error) { handleZodError(error, res); }
  });

  app.patch("/api/programs/:id/status", async (req, res) => {
    try {
      const program = await storage.updateFundingProgramStatus(Number(req.params.id), req.body.status);
      res.json(program);
    } catch (error) { res.status(500).json({ message: "Failed to update program" }); }
  });

  // Program enrollments
  app.get("/api/enrollments", async (req, res) => {
    try {
      const userId = req.query.userId ? Number(req.query.userId) : undefined;
      const programId = req.query.programId ? Number(req.query.programId) : undefined;
      let enrollments;
      if (userId) enrollments = await storage.listUserEnrollments(userId);
      else if (programId) enrollments = await storage.listProgramEnrollments(programId);
      else enrollments = await storage.listProgramEnrollments();
      res.json(enrollments);
    } catch (error) { res.status(500).json({ message: "Failed to retrieve enrollments" }); }
  });

  app.post("/api/enrollments", async (req, res) => {
    try {
      const parsed = insertProgramEnrollmentSchema.parse(req.body);
      const enrollment = await storage.createProgramEnrollment(parsed);
      res.json(enrollment);
    } catch (error) { handleZodError(error, res); }
  });

  app.patch("/api/enrollments/:id/status", async (req, res) => {
    try {
      const enrollment = await storage.updateEnrollmentStatus(Number(req.params.id), req.body.status);
      res.json(enrollment);
    } catch (error) { res.status(500).json({ message: "Failed to update enrollment" }); }
  });

  // Projects
  app.get("/api/projects", async (req, res) => {
    try {
      const providerId = req.query.providerId ? Number(req.query.providerId) : undefined;
      const programId = req.query.programId ? Number(req.query.programId) : undefined;
      let projects;
      if (providerId) projects = await storage.listProjects(providerId);
      else if (programId) projects = await storage.listProgramProjects(programId);
      else projects = await storage.listProjects();
      res.json(projects);
    } catch (error) { res.status(500).json({ message: "Failed to retrieve projects" }); }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(Number(req.params.id));
      if (!project) return res.status(404).json({ message: "Project not found" });
      res.json(project);
    } catch (error) { res.status(500).json({ message: "Failed to retrieve project" }); }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const parsed = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(parsed);
      res.json(project);
    } catch (error) { handleZodError(error, res); }
  });

  app.patch("/api/projects/:id/status", async (req, res) => {
    try {
      const project = await storage.updateProjectStatus(Number(req.params.id), req.body.status);
      res.json(project);
    } catch (error) { res.status(500).json({ message: "Failed to update project" }); }
  });

  // Reports
  app.get("/api/reports", async (req, res) => {
    try {
      const projectId = req.query.projectId ? Number(req.query.projectId) : undefined;
      const reports = await storage.listReports(projectId);
      res.json(reports);
    } catch (error) { res.status(500).json({ message: "Failed to retrieve reports" }); }
  });

  app.post("/api/reports", async (req, res) => {
    try {
      const parsed = insertReportSchema.parse(req.body);
      const report = await storage.createReport(parsed);
      res.json(report);
    } catch (error) { handleZodError(error, res); }
  });

  app.patch("/api/reports/:id/status", async (req, res) => {
    try {
      const report = await storage.updateReportStatus(Number(req.params.id), req.body.status);
      res.json(report);
    } catch (error) { res.status(500).json({ message: "Failed to update report" }); }
  });

  const httpServer = createServer(app);
  return httpServer;
}