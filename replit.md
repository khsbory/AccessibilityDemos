# Web Accessibility Demo Site

## Overview

This is a full-stack web application demonstrating web accessibility issues and solutions. The application is built with React (frontend) and Express.js (backend), using a Korean language interface to showcase accessibility patterns and anti-patterns. The site includes interactive demos that highlight common accessibility problems and their proper implementations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state, React hooks for local state
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js 20
- **Module System**: ES Modules
- **Development**: tsx for TypeScript execution
- **Production**: esbuild for bundling

### Database & ORM
- **Database**: PostgreSQL 16 (configured via Drizzle)
- **ORM**: Drizzle ORM with Zod schema validation
- **Connection**: Neon Database serverless driver
- **Migrations**: Drizzle Kit for schema management

## Key Components

### Frontend Components
- **Layout System**: Header with responsive navigation, mobile sheet menu
- **UI Components**: Comprehensive shadcn/ui component library (40+ components)
- **Pages**: 
  - HomePage: Introduction and purpose explanation
  - DemosPage: Categorized accessibility demonstrations
  - RadioDemoPage: Specific demo for radio button accessibility issues
- **Accessibility Features**: ARIA labels, semantic HTML, keyboard navigation

### Backend Components
- **Route Registration**: Centralized route management in `server/routes.ts`
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **Development Server**: Vite integration for HMR and development tools
- **Error Handling**: Centralized error middleware

### Shared Components
- **Schema Definition**: Shared TypeScript types and Zod validation schemas
- **User Model**: Basic user entity with username/password fields

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Layer**: Express routes handle HTTP requests with JSON middleware
3. **Storage Layer**: Abstract storage interface allows for different implementations
4. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
5. **Response Flow**: JSON responses with error handling and logging

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, ReactDOM, React Query, React Hook Form
- **UI Libraries**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Database**: Drizzle ORM, Neon serverless driver
- **Development**: Vite, TypeScript, tsx for execution

### Development Tools
- **Build**: Vite with React plugin and error overlay
- **TypeScript**: Strict configuration with path mapping
- **Linting**: PostCSS with Tailwind and Autoprefixer
- **Replit Integration**: Cartographer plugin for development environment

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with Replit modules
- **Database**: PostgreSQL 16 module
- **Port Configuration**: Local port 5000, external port 80
- **Development Command**: `npm run dev` with tsx execution

### Production Build
- **Frontend Build**: Vite builds to `dist/public`
- **Backend Build**: esbuild bundles server to `dist/index.js`
- **Deployment Target**: Autoscale deployment on Replit
- **Environment**: Production NODE_ENV with optimized builds

### Database Management
- **Schema**: Defined in `shared/schema.ts`
- **Migrations**: Generated in `./migrations` directory
- **Push Command**: `npm run db:push` for schema updates
- **Connection**: DATABASE_URL environment variable required

## Changelog

- June 22, 2025. Initial setup
- June 22, 2025. Restructured navigation from single "데모" page to direct category access (소개, 모바일 데모, PC 웹 데모, 공통 웹 데모)
- June 22, 2025. Improved HTML semantics by separating button and link elements for better accessibility
- June 22, 2025. Implemented dropdown navigation system with direct access to demos from header menu
- June 22, 2025. Added accessibility features: aria-current="page", skip to main content link, parent category active state
- June 22, 2025. Created reusable demo components for consistent structure across all demo pages
- June 22, 2025. Refactored RadioDemoPage with standard HTML inputs and keyboard control override
- June 22, 2025. Implemented CategoryRadioDemoPage with hierarchical category selection using radio buttons
- June 22, 2025. Added 3-level category structure (cosmetics/perfume → subcategories → specific items)
- June 22, 2025. Applied accessibility patterns: hidden radio buttons, role="button" labels, aria-labels for lists
- June 22, 2025. Improved hierarchical display: 3rd level categories now appear directly under selected 2nd level
- June 22, 2025. Implemented server-side data fetching simulation for dynamic 3rd level category loading
- June 22, 2025. Added logic to hide other 2nd level categories when 3rd level is displayed
- June 22, 2025. Removed auto-close on 3rd level selection and added Apply/Cancel buttons for explicit user control
- June 22, 2025. Removed category level titles and used visual indentation for hierarchy distinction
- June 22, 2025. Added aria-current="true" to selected categories in accessibility-enabled version
- June 22, 2025. Fixed missing aria-current on 1st level category button in accessibility version
- June 22, 2025. Completed removal of all category level headings (h3, h4) for cleaner visual hierarchy
- June 22, 2025. Added focus restoration to Apply/Cancel buttons for proper keyboard navigation accessibility
- June 22, 2025. Fixed radio button keyboard navigation: arrow keys for browsing only, spacebar for selection
- June 22, 2025. Added visual focus styles to radio buttons and improved problem descriptions for hierarchy issues
- June 22, 2025. Updated demo content to reflect real keyboard navigation challenges in hierarchical categories
- June 22, 2025. Corrected code examples to match actual implementation with hidden radio buttons and button role labels
- June 22, 2025. Fixed accessibility unapplied version to use sr-only radio buttons with label styling only
- June 22, 2025. Removed confusing onKeyDown handlers from bad example to show default radio behavior

## User Preferences

Preferred communication style: Simple, everyday language.