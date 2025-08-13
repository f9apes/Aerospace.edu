import { 
  type User, 
  type InsertUser,
  type ModuleProgress,
  type InsertModuleProgress,
  type RocketDesign,
  type InsertRocketDesign,
  type UserActivity,
  type InsertUserActivity,
  type RocketParts,
  type LearningModule,
  type QuizQuestion
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserXP(userId: string, xpToAdd: number): Promise<User>;
  updateUserLevel(userId: string, newLevel: number): Promise<User>;
  addBadgeToUser(userId: string, badge: string): Promise<User>;
  
  // Module progress operations
  getModuleProgress(userId: string): Promise<ModuleProgress[]>;
  getModuleProgressById(userId: string, moduleId: number): Promise<ModuleProgress | undefined>;
  createModuleProgress(progress: InsertModuleProgress): Promise<ModuleProgress>;
  updateModuleProgress(userId: string, moduleId: number, updates: Partial<ModuleProgress>): Promise<ModuleProgress>;
  completeModule(userId: string, moduleId: number, score: number, timeSpent: number): Promise<ModuleProgress>;
  
  // Rocket design operations
  getRocketDesigns(userId: string): Promise<RocketDesign[]>;
  createRocketDesign(design: InsertRocketDesign): Promise<RocketDesign>;
  getRocketDesignById(id: string): Promise<RocketDesign | undefined>;
  
  // Activity operations
  getUserActivities(userId: string, limit?: number): Promise<UserActivity[]>;
  createUserActivity(activity: InsertUserActivity): Promise<UserActivity>;
  
  // Learning content
  getLearningModules(): Promise<LearningModule[]>;
  getLearningModule(id: number): Promise<LearningModule | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private moduleProgress: Map<string, ModuleProgress> = new Map();
  private rocketDesigns: Map<string, RocketDesign> = new Map();
  private userActivities: Map<string, UserActivity> = new Map();
  private learningModules: Map<number, LearningModule> = new Map();

  constructor() {
    this.initializeLearningContent();
  }

  private initializeLearningContent() {
    // Module 1: Aerospace Engineering Basics
    this.learningModules.set(1, {
      id: 1,
      title: "Aerospace Engineering Basics",
      subtitle: "The Foundation of Flight",
      description: "Discover the fundamental principles of flight: lift, thrust, drag, and weight. Learn how aerospace engineers design aircraft and spacecraft.",
      duration: 15,
      xpReward: 100,
      imageUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      content: {
        sections: [
          {
            id: "intro",
            title: "What is Aerospace Engineering?",
            content: "Aerospace engineering is the field that designs, builds, and tests aircraft and spacecraft. Engineers in this field solve complex problems to help humans fly through the atmosphere and explore space.",
            imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
            interactive: true
          },
          {
            id: "forces",
            title: "Four Forces of Flight",
            content: "Every aircraft in flight experiences four fundamental forces: lift (upward), weight (downward), thrust (forward), and drag (backward). Understanding these forces is crucial for flight.",
            interactive: true
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "Which force opposes the motion of an aircraft?",
            options: ["Lift", "Thrust", "Drag", "Weight"],
            correctAnswer: 2,
            explanation: "Drag is the force that opposes aircraft motion through the air."
          },
          {
            id: "q2",
            question: "What force must overcome weight for an aircraft to fly?",
            options: ["Drag", "Thrust", "Lift", "Gravity"],
            correctAnswer: 2,
            explanation: "Lift is the upward force that must overcome weight (gravity) for flight."
          }
        ]
      }
    });

    // Module 2: How Rockets Work
    this.learningModules.set(2, {
      id: 2,
      title: "How Rockets Work",
      subtitle: "Principles of Space Propulsion",
      description: "Explore rocket anatomy, launch stages, and propulsion systems. Understand thrust vector control and how rockets navigate in space.",
      duration: 20,
      xpReward: 150,
      imageUrl: "https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      content: {
        sections: [
          {
            id: "anatomy",
            title: "Rocket Anatomy",
            content: "A rocket consists of several key components: nose cone for aerodynamics, payload bay for cargo, fuel tanks for propellant, engines for thrust, and fins for stability.",
            imageUrl: "https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
            interactive: true
          },
          {
            id: "stages",
            title: "Multi-Stage Rockets",
            content: "Most rockets use multiple stages that separate after their fuel is exhausted, making the remaining rocket lighter and more efficient.",
            interactive: true
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "What is the primary purpose of rocket fins?",
            options: ["Generate lift", "Store fuel", "Provide stability", "Create thrust"],
            correctAnswer: 2,
            explanation: "Fins provide stability and help keep the rocket flying straight."
          }
        ]
      }
    });

    // Module 3: Space Missions Through Time
    this.learningModules.set(3, {
      id: 3,
      title: "Space Missions Through Time",
      subtitle: "History of Space Exploration",
      description: "Journey through space exploration history from Sputnik to Artemis. Discover key missions and their impact on space technology.",
      duration: 25,
      xpReward: 200,
      imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      content: {
        sections: [
          {
            id: "early-missions",
            title: "The Space Age Begins",
            content: "The space age began in 1957 with Sputnik 1, the first artificial satellite launched by the Soviet Union.",
            imageUrl: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
            interactive: true
          },
          {
            id: "moon-landing",
            title: "Apollo Program",
            content: "NASA's Apollo program achieved the historic goal of landing humans on the Moon in 1969 with Apollo 11.",
            imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
            interactive: true
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "What was the first artificial satellite?",
            options: ["Explorer 1", "Sputnik 1", "Vanguard 1", "Luna 1"],
            correctAnswer: 1,
            explanation: "Sputnik 1 was launched by the Soviet Union in 1957 as the first artificial satellite."
          }
        ]
      }
    });
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      xp: 0,
      level: 1,
      modulesCompleted: 0,
      badges: [],
      currentModule: null,
      createdAt: new Date().toISOString()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserXP(userId: string, xpToAdd: number): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");
    
    user.xp += xpToAdd;
    // Calculate new level (500 XP per level)
    const newLevel = Math.floor(user.xp / 500) + 1;
    if (newLevel > user.level) {
      user.level = newLevel;
    }
    
    this.users.set(userId, user);
    return user;
  }

  async updateUserLevel(userId: string, newLevel: number): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");
    
    user.level = newLevel;
    this.users.set(userId, user);
    return user;
  }

  async addBadgeToUser(userId: string, badge: string): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");
    
    if (!user.badges.includes(badge)) {
      user.badges.push(badge);
    }
    
    this.users.set(userId, user);
    return user;
  }

  // Module progress operations
  async getModuleProgress(userId: string): Promise<ModuleProgress[]> {
    return Array.from(this.moduleProgress.values()).filter(progress => progress.userId === userId);
  }

  async getModuleProgressById(userId: string, moduleId: number): Promise<ModuleProgress | undefined> {
    return Array.from(this.moduleProgress.values()).find(
      progress => progress.userId === userId && progress.moduleId === moduleId
    );
  }

  async createModuleProgress(insertProgress: InsertModuleProgress): Promise<ModuleProgress> {
    const id = randomUUID();
    const progress: ModuleProgress = {
      ...insertProgress,
      id,
      completedAt: insertProgress.completed ? new Date().toISOString() : null
    };
    this.moduleProgress.set(id, progress);
    return progress;
  }

  async updateModuleProgress(userId: string, moduleId: number, updates: Partial<ModuleProgress>): Promise<ModuleProgress> {
    const existing = await this.getModuleProgressById(userId, moduleId);
    if (!existing) {
      throw new Error("Module progress not found");
    }
    
    const updated = { ...existing, ...updates };
    if (updates.completed && !existing.completed) {
      updated.completedAt = new Date().toISOString();
    }
    
    this.moduleProgress.set(existing.id, updated);
    return updated;
  }

  async completeModule(userId: string, moduleId: number, score: number, timeSpent: number): Promise<ModuleProgress> {
    let progress = await this.getModuleProgressById(userId, moduleId);
    
    if (!progress) {
      progress = await this.createModuleProgress({
        userId,
        moduleId,
        completed: false,
        score: 0,
        timeSpent: 0,
        quizAnswers: {}
      });
    }

    return this.updateModuleProgress(userId, moduleId, {
      completed: true,
      score,
      timeSpent,
      completedAt: new Date().toISOString()
    });
  }

  // Rocket design operations
  async getRocketDesigns(userId: string): Promise<RocketDesign[]> {
    return Array.from(this.rocketDesigns.values()).filter(design => design.userId === userId);
  }

  async createRocketDesign(insertDesign: InsertRocketDesign): Promise<RocketDesign> {
    const id = randomUUID();
    const design: RocketDesign = {
      ...insertDesign,
      id,
      createdAt: new Date().toISOString()
    };
    this.rocketDesigns.set(id, design);
    return design;
  }

  async getRocketDesignById(id: string): Promise<RocketDesign | undefined> {
    return this.rocketDesigns.get(id);
  }

  // Activity operations
  async getUserActivities(userId: string, limit: number = 10): Promise<UserActivity[]> {
    return Array.from(this.userActivities.values())
      .filter(activity => activity.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  async createUserActivity(insertActivity: InsertUserActivity): Promise<UserActivity> {
    const id = randomUUID();
    const activity: UserActivity = {
      ...insertActivity,
      id,
      createdAt: new Date().toISOString()
    };
    this.userActivities.set(id, activity);
    return activity;
  }

  // Learning content
  async getLearningModules(): Promise<LearningModule[]> {
    return Array.from(this.learningModules.values());
  }

  async getLearningModule(id: number): Promise<LearningModule | undefined> {
    return this.learningModules.get(id);
  }
}

export const storage = new MemStorage();
