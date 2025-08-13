import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  xp: integer("xp").notNull().default(0),
  level: integer("level").notNull().default(1),
  modulesCompleted: integer("modules_completed").notNull().default(0),
  badges: jsonb("badges").$type<string[]>().notNull().default(sql`'[]'`),
  currentModule: integer("current_module"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const moduleProgress = pgTable("module_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  moduleId: integer("module_id").notNull(),
  completed: boolean("completed").notNull().default(false),
  score: integer("score").notNull().default(0),
  timeSpent: integer("time_spent").notNull().default(0), // in seconds
  quizAnswers: jsonb("quiz_answers").$type<Record<string, string>>().notNull().default(sql`'{}'`),
  completedAt: text("completed_at"),
});

export const rocketDesigns = pgTable("rocket_designs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  parts: jsonb("parts").$type<RocketParts>().notNull(),
  stability: integer("stability").notNull(),
  efficiency: integer("efficiency").notNull(),
  launchSuccess: boolean("launch_success").notNull().default(false),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const userActivities = pgTable("user_activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  activityType: text("activity_type").notNull(), // 'module_completed', 'badge_earned', 'rocket_built', etc.
  description: text("description").notNull(),
  xpEarned: integer("xp_earned").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Schema validations
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
});

export const insertModuleProgressSchema = createInsertSchema(moduleProgress).pick({
  userId: true,
  moduleId: true,
  completed: true,
  score: true,
  timeSpent: true,
  quizAnswers: true,
});

export const insertRocketDesignSchema = createInsertSchema(rocketDesigns).pick({
  userId: true,
  name: true,
  parts: true,
  stability: true,
  efficiency: true,
  launchSuccess: true,
});

export const insertUserActivitySchema = createInsertSchema(userActivities).pick({
  userId: true,
  activityType: true,
  description: true,
  xpEarned: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertModuleProgress = z.infer<typeof insertModuleProgressSchema>;
export type ModuleProgress = typeof moduleProgress.$inferSelect;
export type InsertRocketDesign = z.infer<typeof insertRocketDesignSchema>;
export type RocketDesign = typeof rocketDesigns.$inferSelect;
export type InsertUserActivity = z.infer<typeof insertUserActivitySchema>;
export type UserActivity = typeof userActivities.$inferSelect;

// Custom types
export interface RocketParts {
  nose: boolean;
  payload: boolean;
  fuel: boolean;
  engine: boolean;
  fins: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LearningModule {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  duration: number; // in minutes
  xpReward: number;
  imageUrl: string;
  content: {
    sections: ModuleSection[];
    quiz: QuizQuestion[];
  };
}

export interface ModuleSection {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  animations?: string[];
  interactive?: boolean;
}
