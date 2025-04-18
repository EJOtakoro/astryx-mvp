import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for user feedback
  app.post("/api/feedback", async (req, res) => {
    try {
      const feedback = await storage.saveFeedback({
        email: req.body.email,
        userType: req.body.userType,
        feedback1: req.body.feedback1,
        feedback2: req.body.feedback2,
        feedback3: req.body.feedback3,
        feedback4: req.body.feedback4,
        feedback5: req.body.feedback5,
        feedback6: req.body.feedback6,
        additionalFeedback: req.body.additionalFeedback,
      });
      res.status(201).json(feedback);
    } catch (error) {
      res.status(400).json({ error: "Failed to save feedback" });
    }
  });

  // API routes for user responses
  app.post("/api/responses", async (req, res) => {
    try {
      const responses = await storage.saveResponses({
        email: req.body.email,
        answer1: req.body.answer1,
        answer2: req.body.answer2,
        answer3: req.body.answer3,
      });
      res.status(201).json(responses);
    } catch (error) {
      res.status(400).json({ error: "Failed to save responses" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
