import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userFeedback = pgTable("user_feedback", {
  id: serial("id").primaryKey(),
  email: text("email"),
  userType: text("user_type"),
  feedback1: integer("feedback1").default(3),
  feedback2: integer("feedback2").default(3),
  feedback3: integer("feedback3").default(3),
  feedback4: integer("feedback4").default(3),
  feedback5: integer("feedback5").default(3),
  feedback6: integer("feedback6").default(3),
  additionalFeedback: text("additional_feedback"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userResponses = pgTable("user_responses", {
  id: serial("id").primaryKey(),
  email: text("email"),
  answer1: text("answer1"),
  answer2: text("answer2"),
  answer3: text("answer3"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAdminSchema = createInsertSchema(admins).pick({
  username: true,
  password: true,
});

export const adminLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const insertFeedbackSchema = createInsertSchema(userFeedback).omit({
  id: true,
  createdAt: true,
});

export const insertResponsesSchema = createInsertSchema(userResponses).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type AdminLogin = z.infer<typeof adminLoginSchema>;
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
export type InsertResponses = z.infer<typeof insertResponsesSchema>;
export type User = typeof users.$inferSelect;
export type Admin = typeof admins.$inferSelect;
export type UserFeedback = typeof userFeedback.$inferSelect;
export type UserResponses = typeof userResponses.$inferSelect;
