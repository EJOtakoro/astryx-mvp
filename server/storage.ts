import { 
  users, 
  userFeedback, 
  userResponses, 
  type User, 
  type InsertUser, 
  type UserFeedback, 
  type InsertFeedback,
  type UserResponses,
  type InsertResponses 
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveFeedback(feedback: InsertFeedback): Promise<UserFeedback>;
  saveResponses(responses: InsertResponses): Promise<UserResponses>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private feedback: Map<number, UserFeedback>;
  private responses: Map<number, UserResponses>;
  private currentUserId: number;
  private currentFeedbackId: number;
  private currentResponsesId: number;

  constructor() {
    this.users = new Map();
    this.feedback = new Map();
    this.responses = new Map();
    this.currentUserId = 1;
    this.currentFeedbackId = 1;
    this.currentResponsesId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveFeedback(insertFeedback: InsertFeedback): Promise<UserFeedback> {
    const id = this.currentFeedbackId++;
    const feedback: UserFeedback = { ...insertFeedback, id };
    this.feedback.set(id, feedback);
    return feedback;
  }

  async saveResponses(insertResponses: InsertResponses): Promise<UserResponses> {
    const id = this.currentResponsesId++;
    const responses: UserResponses = { ...insertResponses, id };
    this.responses.set(id, responses);
    return responses;
  }
}

// Export storage instance
export const storage = new MemStorage();
