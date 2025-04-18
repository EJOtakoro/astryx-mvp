import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
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
});

export const userResponses = pgTable("user_responses", {
  id: serial("id").primaryKey(),
  email: text("email"),
  answer1: text("answer1"),
  answer2: text("answer2"),
  answer3: text("answer3"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertFeedbackSchema = createInsertSchema(userFeedback).omit({
  id: true,
});

export const insertResponsesSchema = createInsertSchema(userResponses).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
export type InsertResponses = z.infer<typeof insertResponsesSchema>;
export type User = typeof users.$inferSelect;
export type UserFeedback = typeof userFeedback.$inferSelect;
export type UserResponses = typeof userResponses.$inferSelect;
