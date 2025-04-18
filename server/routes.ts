import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAdminSchema, adminLoginSchema } from "@shared/schema";
import { z } from "zod";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

// Admin auth middleware
const requireAdminAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    // Simple implementation - in a real app, would use JWT
    const [username, password] = Buffer.from(token, 'base64').toString().split(':');
    
    const admin = await storage.getAdminByUsername(username);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isValidPassword = await comparePasswords(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Set admin info on request
    (req as any).admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // User feedback and responses API routes
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

  // Admin API routes
  app.post("/api/admin/register", async (req, res) => {
    try {
      const validation = insertAdminSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          error: "Invalid admin data",
          details: validation.error.format(),
        });
      }

      const existingAdmin = await storage.getAdminByUsername(req.body.username);
      if (existingAdmin) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const hashedPassword = await hashPassword(req.body.password);
      const admin = await storage.createAdmin({
        username: req.body.username,
        password: hashedPassword,
      });

      // Don't return the password
      const { password, ...adminWithoutPassword } = admin;
      res.status(201).json(adminWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: "Failed to create admin account" });
    }
  });

  app.post("/api/admin/login", async (req, res) => {
    try {
      const validation = adminLoginSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          error: "Invalid credentials",
          details: validation.error.format(),
        });
      }

      const admin = await storage.getAdminByUsername(req.body.username);
      if (!admin) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValidPassword = await comparePasswords(req.body.password, admin.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Create a simple token (username:password base64 encoded)
      // In a real app, would use JWT with expiration
      const token = Buffer.from(`${admin.username}:${req.body.password}`).toString('base64');
      
      // Don't return the password
      const { password, ...adminWithoutPassword } = admin;
      res.status(200).json({ admin: adminWithoutPassword, token });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Protected admin routes
  app.get("/api/admin/feedback", requireAdminAuth, async (req, res) => {
    try {
      const feedback = await storage.getAllFeedback();
      res.status(200).json(feedback);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve feedback data" });
    }
  });

  app.get("/api/admin/responses", requireAdminAuth, async (req, res) => {
    try {
      const responses = await storage.getAllResponses();
      res.status(200).json(responses);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve response data" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
