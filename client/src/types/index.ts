export interface UserState {
  id: string;
  username: string;
  email: string;
  xp: number;
  level: number;
  modulesCompleted: number;
  badges: string[];
  currentModule: number | null;
}

export interface RocketParts {
  nose: boolean;
  payload: boolean;
  fuel: boolean;
  engine: boolean;
  fins: boolean;
}

export interface RocketState {
  parts: RocketParts;
  stability: number;
  efficiency: number;
  name: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ModuleSection {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  animations?: string[];
  interactive?: boolean;
}

export interface LearningModule {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  duration: number;
  xpReward: number;
  imageUrl: string;
  content: {
    sections: ModuleSection[];
    quiz: QuizQuestion[];
  };
}

export interface Activity {
  id: string;
  activityType: string;
  description: string;
  xpEarned: number;
  createdAt: string;
}

export interface SpaceMission {
  year: number;
  title: string;
  description: string;
  imageUrl: string;
  color: string;
}

export const SPACE_MISSIONS: SpaceMission[] = [
  {
    year: 1957,
    title: "Sputnik 1",
    description: "First artificial satellite launched by Soviet Union, marking the beginning of the Space Age.",
    imageUrl: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    color: "neon-cyan"
  },
  {
    year: 1969,
    title: "Apollo 11 Moon Landing",
    description: "First human moon landing with Neil Armstrong and Buzz Aldrin walking on lunar surface.",
    imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    color: "solar-yellow"
  },
  {
    year: 1981,
    title: "Space Shuttle Program",
    description: "Reusable spacecraft program enabling regular access to space and ISS construction.",
    imageUrl: "https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    color: "cosmic-purple"
  },
  {
    year: 2021,
    title: "Mars Perseverance Rover",
    description: "Advanced rover searching for signs of ancient life and collecting samples on Mars.",
    imageUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    color: "red-500"
  }
];

export const BADGE_DEFINITIONS: Record<string, { name: string; icon: string; description: string }> = {
  rookie: {
    name: "Rocket Rookie",
    icon: "fas fa-rocket",
    description: "Completed your first module"
  },
  builder: {
    name: "Rocket Builder",
    icon: "fas fa-wrench",
    description: "Successfully launched a rocket"
  },
  explorer: {
    name: "Space Explorer",
    icon: "fas fa-globe",
    description: "Completed all learning modules"
  },
  engineer: {
    name: "Aerospace Engineer",
    icon: "fas fa-cogs",
    description: "Achieved level 5"
  },
  commander: {
    name: "Mission Commander",
    icon: "fas fa-medal",
    description: "Earned 1000+ XP"
  }
};
