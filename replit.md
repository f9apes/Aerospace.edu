# Overview

Aero.edu is an interactive aerospace engineering educational platform that gamifies learning through immersive modules, rocket building simulations, and progress tracking. The application combines React-based frontend components with an Express.js backend and uses a space-themed design to engage students in aerospace concepts through hands-on activities, quizzes, and 3D visualizations.

**DEPLOYMENT STATUS: ✅ READY** - Successfully built and configured for deployment on Vercel, Netlify, GitHub Pages, and other static hosting platforms.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with pages for home, modules, rocket builder, and dashboard
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent design
- **Styling**: Tailwind CSS with custom space-themed color palette and animations
- **State Management**: TanStack Query for server state management and caching
- **3D Graphics**: Three.js integration for rocket visualization and interactive simulations
- **Animations**: GSAP library for smooth transitions and scroll-triggered animations

## Backend Architecture
- **Server Framework**: Express.js with TypeScript in ESM module format
- **API Design**: RESTful endpoints for user management, module progress, rocket designs, and activities
- **Data Layer**: Abstract storage interface with in-memory implementation for development
- **Middleware**: Request logging, JSON parsing, and error handling
- **Development**: Vite middleware integration for hot module replacement

## Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Schema**: Four main tables - users, module_progress, rocket_designs, and user_activities
- **Migrations**: Drizzle Kit for schema management and database migrations
- **Validation**: Zod schemas for runtime type checking and API validation

## Gamification System
- **XP System**: Experience points awarded for completing modules, quizzes, and activities
- **Leveling**: Progressive levels based on accumulated XP with visual progress indicators
- **Badges**: Achievement system for completing specific milestones and challenges
- **Progress Tracking**: Module completion tracking with scores and time spent analytics

## Component Organization
- **Page Components**: Route-based components in `/pages` directory
- **Shared Components**: Reusable UI components including navigation, quiz system, and rocket builder
- **UI Library**: Complete component library in `/components/ui` using Radix primitives
- **Custom Hooks**: React hooks for user progress management and mobile detection

# External Dependencies

## Database Integration
- **Neon Database**: Serverless PostgreSQL database with connection pooling
- **Drizzle ORM**: Type-safe database operations with automatic migration support
- **Connection Management**: Environment-based database URL configuration

## UI and Design System
- **Radix UI**: Accessible component primitives for complex UI interactions
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide Icons**: Consistent icon library with React components
- **Font Integration**: Google Fonts (Orbitron, Inter) for space-themed typography

## Development Tools
- **Vite**: Fast development server with TypeScript support and plugin ecosystem
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer plugins

## Animation and Graphics
- **GSAP**: Professional animation library for smooth transitions and scroll effects
- **Three.js**: 3D graphics library for rocket visualization and interactive simulations
- **React Spring**: Physics-based animations for component interactions

## Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **Cookie-based**: Secure session management with database persistence

## Query and State Management
- **TanStack Query**: Server state synchronization with caching and background updates
- **React Hook Form**: Form state management with validation
- **Zod**: Runtime type validation for API requests and responses