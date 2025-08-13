// Mock data for static deployment (when backend is not available)
import type { LearningModule, User, ModuleProgress, RocketDesign, UserActivity } from '@shared/schema';

export const MOCK_USER: User = {
  id: 'demo-user-123',
  username: 'Space Explorer',
  email: 'explorer@aero.edu',
  xp: 750,
  level: 3,
  createdAt: new Date().toISOString(),
  modulesCompleted: 2,
  badges: ['rookie', 'explorer'],
  currentModule: null
};

export const MOCK_MODULES: LearningModule[] = [
  {
    id: 1,
    title: 'Aerospace Engineering Basics',
    subtitle: 'Flight Principles & Design',
    description: 'Learn the fundamental principles of flight, aerodynamics, and aircraft design.',
    duration: 45,
    xpReward: 100,
    imageUrl: '/images/aerospace-basics.jpg',
    content: {
      sections: [
        {
          id: 'intro-flight',
          title: 'Introduction to Flight',
          content: 'Welcome to the fascinating world of aerospace engineering! Flight has captivated humanity for centuries...'
        },
        {
          id: 'four-forces',
          title: 'The Four Forces of Flight', 
          content: 'Every aircraft in flight is affected by four fundamental forces: lift, weight, thrust, and drag...'
        }
      ],
      quiz: [
        {
          id: '1',
          question: 'What are the four forces acting on an aircraft in flight?',
          options: ['Lift, Weight, Thrust, Drag', 'Speed, Height, Wind, Gravity', 'Power, Control, Balance, Motion'],
          correctAnswer: 0,
          explanation: 'The four forces are lift (upward), weight (downward), thrust (forward), and drag (backward).'
        }
      ]
    }
  },
  {
    id: 1001, // Nested sections are now separate modules
    title: 'Introduction to Flight',
    subtitle: 'Basic Principles',
    description: 'Learn the basic principles of flight.',
    duration: 15,
    xpReward: 25,
    imageUrl: '/images/intro-flight.jpg',
    content: {
      sections: [{
        id: 'intro-flight-detail',
        title: 'Introduction to Flight',
        content: 'Welcome to the fascinating world of aerospace engineering! Flight has captivated humanity for centuries...'
      }],
      quiz: []
    }
  },
  {
    id: 1002,
    title: 'The Four Forces of Flight',
    subtitle: 'Physics of Flight',
    description: 'Understanding lift, weight, thrust, and drag.',
    duration: 20,
    xpReward: 25,
    imageUrl: '/images/four-forces.jpg',
    content: {
      sections: [{
        id: 'four-forces-detail',
        title: 'The Four Forces of Flight',
        content: 'Every aircraft in flight is affected by four fundamental forces: lift, weight, thrust, and drag...'
      }],
      quiz: []
    }
  },
  {
    id: 2,
    title: 'Rocket Science Fundamentals',
    subtitle: 'Propulsion & Space Travel',
    description: 'Explore the principles of rocket propulsion and space travel.',
    duration: 60,
    xpReward: 150,
    imageUrl: '/images/rocket-science.jpg',
    content: {
      sections: [{
        id: 'newtons-laws',
        title: 'Newton\'s Laws in Space',
        content: 'Sir Isaac Newton\'s three laws of motion are the foundation of rocket science...'
      }],
      quiz: [
        {
          id: '2',
          question: 'Which of Newton\'s laws explains how rockets work?',
          options: ['First Law', 'Second Law', 'Third Law'],
          correctAnswer: 2,
          explanation: 'Newton\'s Third Law states that for every action, there is an equal and opposite reaction.'
        }
      ]
    }
  },
  {
    id: 3,
    title: 'Space Missions & Exploration',
    subtitle: 'History & Future',
    description: 'Discover the history and future of space exploration.',
    duration: 75,
    xpReward: 200,
    imageUrl: '/images/space-missions.jpg',
    content: {
      sections: [{
        id: 'space-missions',
        title: 'Historic Space Missions',
        content: 'From Sputnik to the Moon landing, space missions have pushed the boundaries of human achievement...'
      }],
      quiz: [
        {
          id: '3',
          question: 'What was the first artificial satellite launched into space?',
          options: ['Explorer 1', 'Sputnik 1', 'Luna 1'],
          correctAnswer: 1,
          explanation: 'Sputnik 1 was launched by the Soviet Union on October 4, 1957.'
        }
      ]
    }
  }
];



export const MOCK_PROGRESS: ModuleProgress[] = [
  {
    id: 'progress-1',
    userId: 'demo-user-123',
    moduleId: 1,
    completed: true,
    score: 85,
    timeSpent: 2700, // 45 minutes
    quizAnswers: { '1': '0' },
    completedAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: 'progress-2',
    userId: 'demo-user-123',
    moduleId: 2,
    completed: true,
    score: 92,
    timeSpent: 3600, // 60 minutes
    quizAnswers: { '1': '2' },
    completedAt: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
  }
];

export const MOCK_ROCKETS: RocketDesign[] = [
  {
    id: 'rocket-1',
    name: 'Explorer One',
    userId: 'demo-user-123',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    parts: {
      nose: true,
      payload: true,
      fuel: true,
      engine: true,
      fins: true
    },
    stability: 95,
    efficiency: 88,
    launchSuccess: true
  }
];

export const MOCK_ACTIVITIES: UserActivity[] = [
  {
    id: 'activity-1',
    description: 'Completed Aerospace Engineering Basics module',
    userId: 'demo-user-123',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    activityType: 'module_completion',
    xpEarned: 100
  },
  {
    id: 'activity-2',
    description: 'Built and launched Explorer One rocket',
    userId: 'demo-user-123',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    activityType: 'rocket_launch',
    xpEarned: 50
  }
];

// Check if we're in a static environment (no backend available)
export const isStaticDeployment = () => {
  if (typeof window !== 'undefined') {
    return true; // Always use static mode for client builds
  }
  return false;
};