import { 
  users, 
  admins,
  userFeedback, 
  userResponses, 
  type User, 
  type Admin,
  type InsertUser, 
  type InsertAdmin,
  type UserFeedback, 
  type InsertFeedback,
  type UserResponses,
  type InsertResponses 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveFeedback(feedback: InsertFeedback): Promise<UserFeedback>;
  saveResponses(responses: InsertResponses): Promise<UserResponses>;
  // Admin functionality
  getAdmin(id: number): Promise<Admin | undefined>;
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
  getAllFeedback(): Promise<UserFeedback[]>;
  getAllResponses(): Promise<UserResponses[]>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async saveFeedback(insertFeedback: InsertFeedback): Promise<UserFeedback> {
    const [feedback] = await db.insert(userFeedback).values(insertFeedback).returning();
    return feedback;
  }

  async saveResponses(insertResponses: InsertResponses): Promise<UserResponses> {
    const [responses] = await db.insert(userResponses).values(insertResponses).returning();
    return responses;
  }

  // Admin functionality
  async getAdmin(id: number): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins).where(eq(admins.id, id));
    return admin;
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins).where(eq(admins.username, username));
    return admin;
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const [admin] = await db.insert(admins).values(insertAdmin).returning();
    return admin;
  }

  async getAllFeedback(): Promise<UserFeedback[]> {
    return await db.select().from(userFeedback).orderBy(userFeedback.createdAt);
  }

  async getAllResponses(): Promise<UserResponses[]> {
    return await db.select().from(userResponses).orderBy(userResponses.createdAt);
  }
}

// Export storage instance
export const storage = new DatabaseStorage();
