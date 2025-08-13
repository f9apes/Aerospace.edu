# 🚀 Aero.edu - Interactive Aerospace Education Platform

> Launch Your Curiosity — Engineering the Future, One Student at a Time

An immersive educational website targeting students ages 10-16, featuring interactive learning modules on aerospace engineering, drag-and-drop rocket building challenges, and gamified experiences with XP tracking and achievement badges.

## ✨ Features

- **🎓 Interactive Learning Modules**: 3 comprehensive modules covering Aerospace Basics, Rocket Science, and Space Missions
- **🛠️ 3D Rocket Builder**: Drag-and-drop rocket assembly with launch simulation using Three.js
- **🎮 Gamification System**: XP tracking, level progression, and achievement badges
- **📊 Progress Dashboard**: User analytics, module completion tracking, and performance metrics
- **🌌 Space-Themed Design**: Immersive cosmic animations using GSAP and custom CSS
- **📱 Responsive Design**: Mobile-friendly interface with interactive elements

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Three.js** for 3D rocket visualization
- **GSAP** for smooth animations
- **TanStack Query** for state management
- **Wouter** for routing

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **Drizzle ORM** with PostgreSQL
- **Zod** for validation
- **In-memory storage** for development

## 🚀 Quick Deploy

### Deploy to Vercel (Recommended)
1. Fork this repository
2. Connect to Vercel
3. Deploy automatically - Vercel will detect the configuration

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/aero-edu)

### Deploy to Netlify
1. Fork this repository
2. Connect to Netlify
3. Deploy automatically using the netlify.toml configuration

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/aero-edu)

### Deploy to Railway
1. Fork this repository
2. Connect to Railway
3. Deploy the client folder as a static site

## 💻 Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/aero-edu.git
cd aero-edu

# Install dependencies for all packages
npm install
cd client && npm install
cd ../server && npm install

# Return to root directory
cd ..
```

### Development Server
```bash
# Start the development server (runs both frontend and backend)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### Building for Production
```bash
# Build client for production
npm run build:client

# Build server for production  
npm run build:server

# Build everything
npm run build
```

## 📁 Project Structure

```
aero-edu/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Route components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and configurations
│   │   └── types/         # TypeScript type definitions
│   ├── dist/              # Build output (generated)
│   └── package.json       # Frontend dependencies
├── server/                # Node.js backend
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Data storage interface
│   ├── index.ts           # Server entry point
│   └── package.json       # Backend dependencies
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schema and types
├── vercel.json            # Vercel deployment config
├── netlify.toml           # Netlify deployment config
└── README.md
```

## 🎨 Design System

The application features a space-themed design with:
- **Colors**: Deep space blue (#0B1D51), cosmic purple (#3A0CA3), neon cyan (#00F5D4), solar yellow (#FFD60A)
- **Typography**: Orbitron font for headings, Inter for body text
- **Animations**: GSAP-powered smooth transitions and scroll-triggered effects
- **Interactive Elements**: Hover effects, click feedback, and animated notifications

## 🎮 Educational Content

### Module 1: Aerospace Engineering Basics
- Introduction to flight principles
- Forces acting on aircraft
- Basic aerodynamics concepts
- Interactive quiz with 10 questions

### Module 2: Rocket Science
- Rocket propulsion fundamentals
- Newton's laws in space
- Fuel types and efficiency
- Hands-on rocket building simulation

### Module 3: Space Missions
- Historical space missions
- Mission planning and execution
- Current and future space exploration
- Achievement-based learning progression

## 🏆 Gamification Features

- **XP System**: Earn points for completing modules, quizzes, and activities
- **Level Progression**: Unlock new content and features as you advance
- **Achievement Badges**: Collect badges for various milestones
- **Progress Tracking**: Visual progress indicators and performance analytics

## 🌟 Contact

- **Email**: aeroeng.edu@gmail.com
- **Copyright**: © 2025 Aero.edu. All rights reserved.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Built with ❤️ for aspiring aerospace engineers*