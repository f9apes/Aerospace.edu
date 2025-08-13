import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertModuleProgressSchema,
  insertRocketDesignSchema,
  insertUserActivitySchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/user/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      
      // Create initial activity
      await storage.createUserActivity({
        userId: user.id,
        activityType: "account_created",
        description: "Started learning journey",
        xpEarned: 0
      });
      
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  app.post("/api/user/:id/xp", async (req, res) => {
    try {
      const { xpToAdd, reason } = req.body;
      const userId = req.params.id;
      
      const user = await storage.updateUserXP(userId, xpToAdd);
      
      // Create activity for XP gain
      await storage.createUserActivity({
        userId,
        activityType: "xp_earned",
        description: reason || "Earned XP",
        xpEarned: xpToAdd
      });
      
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "Failed to update XP" });
    }
  });

  app.post("/api/user/:id/badge", async (req, res) => {
    try {
      const { badge, description } = req.body;
      const userId = req.params.id;
      
      const user = await storage.addBadgeToUser(userId, badge);
      
      // Create activity for badge
      await storage.createUserActivity({
        userId,
        activityType: "badge_earned",
        description: description || `Earned ${badge} badge`,
        xpEarned: 0
      });
      
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "Failed to add badge" });
    }
  });

  // Learning modules routes
  app.get("/api/modules", async (req, res) => {
    try {
      const modules = await storage.getLearningModules();
      res.json(modules);
    } catch (error) {
      res.status(500).json({ message: "Failed to get modules" });
    }
  });

  app.get("/api/modules/:id", async (req, res) => {
    try {
      const module = await storage.getLearningModule(parseInt(req.params.id));
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
      res.json(module);
    } catch (error) {
      res.status(500).json({ message: "Failed to get module" });
    }
  });

  // Module progress routes
  app.get("/api/user/:userId/progress", async (req, res) => {
    try {
      const progress = await storage.getModuleProgress(req.params.userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to get progress" });
    }
  });

  app.get("/api/user/:userId/progress/:moduleId", async (req, res) => {
    try {
      const progress = await storage.getModuleProgressById(
        req.params.userId, 
        parseInt(req.params.moduleId)
      );
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to get module progress" });
    }
  });

  app.post("/api/user/:userId/progress", async (req, res) => {
    try {
      const progressData = insertModuleProgressSchema.parse({
        ...req.body,
        userId: req.params.userId
      });
      const progress = await storage.createModuleProgress(progressData);
      res.json(progress);
    } catch (error) {
      res.status(400).json({ message: "Invalid progress data" });
    }
  });

  app.put("/api/user/:userId/progress/:moduleId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const moduleId = parseInt(req.params.moduleId);
      const updates = req.body;
      
      const progress = await storage.updateModuleProgress(userId, moduleId, updates);
      res.json(progress);
    } catch (error) {
      res.status(400).json({ message: "Failed to update progress" });
    }
  });

  app.post("/api/user/:userId/complete-module/:moduleId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const moduleId = parseInt(req.params.moduleId);
      const { score, timeSpent, xpEarned } = req.body;
      
      const progress = await storage.completeModule(userId, moduleId, score, timeSpent);
      
      // Award XP for completion
      if (xpEarned > 0) {
        await storage.updateUserXP(userId, xpEarned);
      }
      
      // Create completion activity
      await storage.createUserActivity({
        userId,
        activityType: "module_completed",
        description: `Completed Module ${moduleId} with ${score}% score`,
        xpEarned
      });
      
      res.json(progress);
    } catch (error) {
      res.status(400).json({ message: "Failed to complete module" });
    }
  });

  // Rocket design routes
  app.get("/api/user/:userId/rockets", async (req, res) => {
    try {
      const designs = await storage.getRocketDesigns(req.params.userId);
      res.json(designs);
    } catch (error) {
      res.status(500).json({ message: "Failed to get rocket designs" });
    }
  });

  app.post("/api/user/:userId/rockets", async (req, res) => {
    try {
      const designData = insertRocketDesignSchema.parse({
        ...req.body,
        userId: req.params.userId
      });
      const design = await storage.createRocketDesign(designData);
      
      // Create activity for rocket design
      await storage.createUserActivity({
        userId: req.params.userId,
        activityType: "rocket_built",
        description: `Built rocket "${design.name}" with ${design.stability}% stability`,
        xpEarned: design.launchSuccess ? 150 : 50
      });
      
      res.json(design);
    } catch (error) {
      res.status(400).json({ message: "Invalid rocket design data" });
    }
  });

  app.get("/api/rockets/:id", async (req, res) => {
    try {
      const design = await storage.getRocketDesignById(req.params.id);
      if (!design) {
        return res.status(404).json({ message: "Rocket design not found" });
      }
      res.json(design);
    } catch (error) {
      res.status(500).json({ message: "Failed to get rocket design" });
    }
  });

  // User activities routes
  app.get("/api/user/:userId/activities", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const activities = await storage.getUserActivities(req.params.userId, limit);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to get activities" });
    }
  });

  app.post("/api/user/:userId/activities", async (req, res) => {
    try {
      const activityData = insertUserActivitySchema.parse({
        ...req.body,
        userId: req.params.userId
      });
      const activity = await storage.createUserActivity(activityData);
      res.json(activity);
    } catch (error) {
      res.status(400).json({ message: "Invalid activity data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
