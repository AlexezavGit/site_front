import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReferralSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";

export function registerRoutes(app: Express): Server {
  // Referral endpoints
  app.post("/api/referrals", async (req, res) => {
    try {
      const parsed = insertReferralSchema.parse(req.body);
      const referral = await storage.createReferral(parsed);
      res.json(referral);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          message: fromZodError(error).message 
        });
      } else {
        res.status(500).json({ 
          message: "An unexpected error occurred" 
        });
      }
    }
  });

  app.get("/api/referrals", async (_req, res) => {
    try {
      const referrals = await storage.listReferrals();
      res.json(referrals);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to retrieve referrals" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}