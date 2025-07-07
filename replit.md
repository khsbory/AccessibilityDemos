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
- June 22, 2025. Updated demo descriptions and code examples to accurately reflect radio button auto-selection issue
- June 22, 2025. Corrected problem description: radio button arrow key movement causes automatic selection
- June 22, 2025. Fixed test guides to show auto-focus and arrow key auto-selection causing DOM updates
- June 22, 2025. Updated solution to emphasize hidden radio buttons with label role="button" and Tab-only navigation
- June 23, 2025. Implemented PaymentCarouselDemoPage with Swiper library for mobile carousel demo
- June 23, 2025. Created mobile-first approach: no buttons by default, minimal buttons only for accessibility
- June 23, 2025. Applied inert attribute to inactive slides for proper keyboard navigation control
- June 23, 2025. Added 5 payment card examples (신한, KB국민, 우리, 하나, 삼성) with realistic card data
- June 23, 2025. Updated demo focus: mobile carousels typically don't include buttons for clean UI
- June 23, 2025. Corrected problem description: screen reader users and users with hand limitations cannot navigate slides
- June 23, 2025. Removed keyboard references for mobile context, focused on swipe vs accessibility button approach
- June 23, 2025. Updated inert explanation: prevents access to hidden/covered slide content that causes confusion
- June 23, 2025. Implemented conditional button display: hide prev button on first card, hide next button on last card
- June 23, 2025. Added focus management in click handlers: predict next state and move focus to remaining button
- June 23, 2025. Fixed timing issues with focus management using 100ms delay for DOM update completion
- June 23, 2025. Updated TestGuideSection component to accept testTitle prop for page-specific test instructions
- June 23, 2025. Changed test guide to "스크린 리더로 테스트하기" with VoiceOver/TalkBack instructions for mobile context
- June 29, 2025. Updated Windows screen reader setup section with VoiceWith (NVDA Korean version) installation guide
- June 29, 2025. Added 경북점자도서관 link for VoiceWith download and subtitle addon download link
- June 29, 2025. Updated iPhone VoiceOver setup with accessibility shortcuts and caption panel settings
- June 29, 2025. Added Android TalkBack setup instructions for Galaxy devices with shortcut configuration
- June 29, 2025. Implemented table of contents navigation for HomePage with smooth scrolling to sections
- June 29, 2025. Added section IDs for all screen reader setup platforms (Windows, iPhone, Android, macOS)
- June 29, 2025. Created fixed floating button in Layout component for quick access to screen reader setup
- June 29, 2025. Fixed button navigates to home page screen reader section from any page in the site
- June 29, 2025. Implemented accessibility focus management for all navigation links with 0.5s delay
- June 29, 2025. Added tabindex="-1" and programmatic focus to heading elements after smooth scrolling
- June 29, 2025. Added CSS focus styles for headings with tabindex="-1" for visual focus indication
- June 29, 2025. Implemented URL hash-based focus management for external page navigation to sections
- June 29, 2025. Added NotificationSettingsDemoPage with bottom sheet modal accessibility demo
- June 29, 2025. Implemented React Portal-based bottom sheet with proper focus management and inert attributes
- June 29, 2025. Created accessible vs inaccessible bottom sheet comparison for notification settings
- June 29, 2025. Added new "모달 데모" category to header navigation with Settings icon
- June 29, 2025. Implemented comprehensive ARIA attributes, keyboard navigation, and focus trap for modal accessibility
- June 29, 2025. Updated notification settings demo to remove mobile-specific language, clarified as PC/mobile common demo
- July 6, 2025. Created TabControlDemoPage with comprehensive ARIA implementation and keyboard navigation
- July 6, 2025. Added new "탭 데모" category to header navigation with LayoutGrid icon
- July 6, 2025. Implemented useTabAccessibility reusable React hook for automatic tab accessibility
- July 6, 2025. Updated all role="presentation" to role="none" for better semantic clarity
- July 6, 2025. Enhanced aria-label for favorite buttons to include "찜하기/찜 취소하기" distinction
- July 6, 2025. Added copyable hook code section for developers to implement tab accessibility in their projects
- July 6, 2025. Implemented WAI-ARIA compliant tab controls with arrow key navigation, Home/End support, and proper focus management
- July 7, 2025. Created InfiniteCarouselDemoPage with infinite loop category carousel using 75 shopping categories (15 base categories × 5 sets)
- July 7, 2025. Implemented bottom sheet modal with accessibility applied/unapplied versions for infinite carousel comparison
- July 7, 2025. Added 7 categories per view with group-based navigation using slideTo method for precise slide positioning
- July 7, 2025. Applied a11y={false} for both accessible and inaccessible versions to maintain consistent manual accessibility control
- July 7, 2025. Implemented inert attribute for hidden category groups and focus management to first visible category after navigation
- July 7, 2025. Fixed group-based slide navigation logic with proper group index calculation for infinite loop carousel
- July 7, 2025. Added "무한 루프 캐러셀 접근성" to carousel demo category in header navigation
- July 7, 2025. Increased category duplication from 75 to 450 items (30 sets × 15 categories) for stable Swiper loop mode
- July 7, 2025. Implemented realIndex-based group navigation with modulo calculation for proper 7-item group cycling
- July 7, 2025. Fixed inert logic to work with base category groups (15 items) instead of total duplicated items

## User Preferences

Preferred communication style: Simple, everyday language.