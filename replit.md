# Replit.md

## Overview

This is a full-stack web application built with React, TypeScript, Express.js, and PostgreSQL. The application is a Seed Financial Internal Employee Portal featuring a sophisticated quote generation system that calculates pricing based on various business parameters like revenue bands, transaction volumes, and industry complexity. The portal provides a centralized dashboard for employees to access various tools, with the quote calculator being the primary integrated application. It uses modern web development practices with a component-based frontend and RESTful API backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

✓ **Employee Portal Implementation** (July 25, 2025)
  - Transformed application into Seed Financial Internal Employee Portal
  - Created dashboard landing page with professional card-based navigation
  - Quote calculator now accessible as a component within the portal at /calculator
  - Added portal navigation with "Back to Portal" button in calculator
  - Updated branding with new nav logo for consistent portal appearance
  - Maintained all existing calculator functionality and features
  - Portal dashboard ready for future feature integration

✓ **Complete Dashboard Redesign with Home Page Aesthetic** (July 25, 2025)
  - **Same Background**: Used exact gradient background from home page (`from-[#253e31] to-[#75c29a]`) with fade-in animation
  - **Transparent Navigation**: Removed white nav bar, made transparent with white Seed logo only
  - **Enhanced Quick Actions**: Redesigned action cards with glassmorphism effects, gradient icon backgrounds, and orange hover borders
  - **Seed Orange Integration**: Added orange accents throughout (user avatar, notification badge, buttons, progress bars)
  - **Full-Width Footer Section**: Added comprehensive footer with performance metrics, goal progress, recent wins, and quick links
  - **Dark Theme Consistency**: Updated all text, cards, and UI elements to work with dark background
  - **Advanced Visual Effects**: Added backdrop blur, scale animations, gradient buttons, and professional hover states
  - **Cohesive Design Language**: Created seamless visual transition between login/home page and dashboard

✓ **Enterprise Dashboard Redesign** (July 25, 2025)
  - Redesigned dashboard with professional, enterprise-grade interface removing playful elements
  - Added sophisticated navigation with organized tool dropdowns (Tools and Resources menus)
  - Integrated comprehensive feature set: Commission Tracker, Sales Inbox, Client Snapshot Generator
  - Built Meeting Vault with AI transcription and searchable recordings
  - Created Knowledge Base with GPT-powered search functionality
  - Added Seed Academy LMS with XP tracking, courses, and gamification
  - Included Announcements feed with operational transparency and demo links
  - Integrated Slack alerts for micro-notifications (leads, commissions, uploads)
  - Added executive summary bar with key business metrics (pipeline, leads, revenue)
  - Applied green gradient background aesthetic with semi-transparent cards for visual appeal
  - Maintained professional corporate look while incorporating brand colors

✓ **Complete Authentication System Implemented** (July 21, 2025)
  - Secure login system with automatic user registration for @seedfinancial.io emails
  - Password-based authentication with default password SeedAdmin1! 
  - Session management with Express sessions and Passport.js
  - Protected routes requiring authentication for all quote operations
  - User ownership model ensuring data isolation between users
  - Auto-creation of users when valid @seedfinancial.io emails attempt login
  - Clean authentication UI with Seed Financial branding
  - User menu with logout functionality in application header
  - Simplified auth page removing registration option as requested
  - HubSpot user verification: Only emails existing in HubSpot contacts/owners can access
  - Pre-approved email list for immediate access to key users
  - Updated placeholder text to "name@seedfinancial.io" for clarity

✓ **Enhanced HubSpot Integration Implemented** (July 21, 2025)
  - Complete HubSpot CRM integration with contact verification
  - Email verification with real-time visual indicators (green check/red X)  
  - Company Name field with auto-population from HubSpot contact data
  - Deal creation with "New Business" deal type classification
  - Deal Owner properly assigned to the user creating the quote
  - Modern quote creation (legacy templates deprecated by HubSpot)
  - Quote sender information dynamically pulled from HubSpot user profiles and company branding settings
  - Proper Seed Financial company information in quotes (4136 Del Rey Ave, Ste 521, Marina Del Rey, CA 90292)
  - E-signature enabled in quotes (payments temporarily disabled for validation)
  - Auto-save quote functionality before pushing to HubSpot
  - Error handling for non-existing contacts with user-friendly messages
  - Line items automatically added using HubSpot product library with association type 67
  - Line item quantities fixed to 1 for both monthly and cleanup services
  - Address override system to ensure correct Seed Financial address displays in quotes
  - Successfully tested with live HubSpot API integration

✓ **Quote Recall Functionality Fully Fixed** (July 21, 2025)
  - Fixed React Hook Form Select components using `value` instead of `defaultValue`
  - Resolved data type mismatch between database decimals and form options
  - All fields now populate correctly when loading saved quotes
  - HubSpot verification re-runs properly on quote load
  - Added debug logging for troubleshooting form state

✓ **HubSpot Quote Update Issue Fixed** (July 21, 2025)
  - Fixed updateQuote method incorrectly targeting notes API instead of quotes API
  - Added proper quote existence and status checking before updates
  - Improved error handling for expired or non-existent quotes
  - Quote updates now target correct HubSpot quote objects

✓ **Reset Confirmation Dialog Enhanced** (July 21, 2025)
  - Shows proper "unsaved changes" warning message
  - Triggers confirmation for both new forms and edited quotes
  - Different messages based on actual form state
  - Replaces browser confirm() with custom AlertDialog

✓ **Archive Dialog Issue Fixed** (July 21, 2025)
  - Replaced browser confirm() dialog with custom AlertDialog component
  - Added "Don't show this dialog again" checkbox with localStorage persistence
  - Archive functionality works regardless of user preferences
  - Added reset button to re-enable confirmations when needed
  - Prevents browser-specific dialog blocking issues

✓ **Approval Code Tracking Added** (July 21, 2025)
  - Added 'approvalRequired' database column to track quotes that used approved overrides
  - Visual indicators in quotes table: "Approved" (orange badge), "Override" (gray badge), "Standard" (gray text)
  - Enables auditing and tracking of override patterns for business analysis

✓ **Critical HubSpot Integration Bug Fixed** (July 22, 2025)
  - Fixed HubSpot integration to properly handle combined Bookkeeping + TaaS quotes
  - Deal names now dynamically generated based on services: "Company - Bookkeeping", "Company - TaaS", or "Company - Bookkeeping + TaaS"
  - Quote names updated to match service combinations: "Company - Bookkeeping Services Quote", etc.
  - Line items now include both services when quote is combined
  - TaaS monthly and prior years fees properly pushed as separate line items
  - Updated HubSpot service methods to accept service type parameters

✓ **Critical Backend Fee Calculation Fixed** (July 22, 2025)
  - Fixed major issue where backend was overriding frontend calculations with different logic
  - Backend now trusts frontend calculations instead of recalculating with outdated formulas
  - Database and HubSpot now receive correct calculated values from frontend
  - Fixed TaaS-only quote validation by providing defaults for bookkeeping-required fields

✓ **Final Housekeeping Updates Completed** (July 22, 2025)
  - Added Hospitality industry to dropdown with same modifiers as Restaurant/Food Service (1.6x monthly, 1.4x cleanup)
  - Increased Seed Package discount from 10% to 15% for existing bookkeeping clients
  - Updated service card descriptions: Bookkeeping "Monthly bookkeeping, cleanup, and financial statements"; TaaS "Tax preparation, filing and planning services"; Other Services "Payroll, FP&A Lite, AP/AR Lite, and more"
  - Made Reset button always visible for better user experience
  - Completely removed all copy buttons to simplify interface

✓ **Enhanced Cleanup Override System and HubSpot Integration Fix** (July 24, 2025)
  - **Automatic Override Unlock**: Clicking override checkbox automatically allows cleanup months to be reduced to 0
  - **Smart Approval Logic**: For "Other" reason - button enabled when custom setup fee entered OR cleanup months decreased; For "Brand New Business"/"Books Confirmed Current" - button enabled only when cleanup months decreased
  - **Custom Setup Fee Always Overrides**: Custom setup fee takes precedence over calculated setup fee regardless of cleanup months value, including when months = 0
  - **Interactive Help System**: Hover tooltips on disabled approval buttons explain exactly what action is needed to enable them
  - **Enhanced Request/Enter Code Flow**: "Request Approval" button changes to "Enter Code" after approval requested, allowing users to reopen code dialog
  - **Detailed Slack Notifications**: Include original cleanup months, requested months, and custom setup fee in approval messages
  - **Approval State Management**: Better tracking of approval states to prevent accidental bypassing of approval requirements
  - **HubSpot Integration Protection**: HubSpot push button now properly disabled until approval code entered for all override scenarios
  - **Custom Setup Fee HubSpot Fix**: Fixed backend recalculation overriding custom setup fees - now preserves saved values in HubSpot quotes

✓ **Fixed HubSpot Button State Management and TaaS Quote Loading** (July 24, 2025)
  - **Smart Button Text Logic**: Button now correctly shows "Update in HubSpot" when editing quotes with HubSpot IDs or "Push to HubSpot" for new quotes
  - **Enhanced State Tracking**: After saving quotes, editingQuoteId is set so users can immediately update in HubSpot
  - **Post-Push State Management**: After pushing to HubSpot, editingQuoteId is maintained for subsequent updates
  - **Fixed TaaS Quote Loading Consistency**: Resolved intermittent field population by adding explicit setValue calls after form reset
  - **Enhanced Select Component Synchronization**: TaaS numeric fields now consistently populate in Select dropdowns
  - **Robust Form Reset Process**: Added form.trigger() and individual field updates to ensure reliable form state management
  - **Complete Form Data Restoration**: Loading saved quotes now includes service flags (includesBookkeeping, includesTaas) and quote type
  - **Service Card Synchronization**: Form view now properly aligns with loaded quote's service selection
  - **TypeScript Error Resolution**: Fixed type annotations for quote data access in button logic

✓ **Fixed Critical Line Item Duplicate Issue** (July 25, 2025)
  - **Root Cause Identified**: HubSpot line items don't store custom names, only product IDs and amounts
  - **Fixed Matching Logic**: Changed from name-based to product ID + amount combination matching
  - **Enhanced API Debugging**: Added comprehensive logging to reveal actual HubSpot response structure
  - **Eliminated Duplicates**: Proper identification of existing line items prevents duplicate creation
  - **Robust Tolerance Matching**: Uses floating-point tolerance for amount comparisons to handle precision issues
  
✓ **Critical TaaS Product ID Fix** (July 25, 2025)
  - **Root Cause**: TaaS was using bookkeeping product IDs, causing updates instead of new line items
  - **Fixed Product IDs**: Monthly TaaS now uses 26203849099, Prior Years uses 26354718811
  - **Proper Service Separation**: Each service type now has unique product IDs preventing conflicts
  - **Complete Line Item Management**: Adding/removing services now properly creates/deletes appropriate line items

✓ **Complete HubSpot Service Conversion Fix** (July 25, 2025)
  - **Database Update Fixed**: Preserves custom setup fees and uses form data instead of recalculating during updates
  - **Deal Name Updates**: Automatically updates deal names to reflect service combinations (Bookkeeping + TaaS)
  - **Quote Title Updates**: Updates quote titles to show correct service combinations with (Updated date)
  - **TaaS Line Item Creation**: Adds missing TaaS line items when converting from single to combined services
  - **Deal Value Calculation**: Correctly includes all TaaS fees in deal value calculations
  - **Auto-Save Before HubSpot Update**: "Update in HubSpot" button now auto-saves form changes first, ensuring database matches display
  - **Fixed TaaS Line Item Association**: Corrected HubSpot API endpoint for associating new TaaS line items with quotes (line_items to quotes direction)
  - **Simplified Fee Calculation**: Uses form data fees directly instead of recalculating to prevent discrepancies
  - **Enhanced Debug Logging**: Added comprehensive logging to track TaaS fee flow and line item creation
  - **Fixed Form Data Enhancement**: Update mutation now includes calculated TaaS fees in form data to ensure proper line item creation
  - **Fixed HubSpot Association API**: Uses proper quote->line_item direction matching working line item associations
  - **Completely Redesigned Line Item Management**: Universal system handles all three core processes - new quote creation, service addition, and service removal without duplicates
  - **Comprehensive Service Conversion**: Handles all aspects of converting bookkeeping-only quotes to combined service quotes
  - **Fixed HubSpot API Empty Response Handling**: DELETE requests now properly handle 204 No Content responses without JSON parsing errors
  - **Database Connection Monitoring**: App may occasionally lose connection to Neon PostgreSQL when loading old quotes (transient issue)

✓ **Fixed Critical Session Management Bug** (July 25, 2025)
  - **Root Cause**: Logout only cleared user data but not quotes cache, causing next user to see previous user's quotes
  - **Solution**: Modified logout mutation to invalidate and remove all quotes-related queries from React Query cache
  - **Security Impact**: Prevents data leakage between user sessions
  - **User Experience**: Clean session switching without residual data from previous users

✓ **Simplified Approval System Implementation** (July 25, 2025)
  - **Permanent Override Lock**: Override checkbox locked permanently after approval code entered - cannot be unchecked
  - **Field Locking**: All setup fee fields (cleanup months, reason, custom setup fee) locked after approval
  - **Unlock Button**: Users can unlock fields via confirmation dialog, but override checkbox stays locked
  - **Simplified Logic**: No complex value tracking - any change after unlock requires new approval code
  - **User-Friendly Design**: Clear warnings and intuitive unlock process prevent accidental approval bypass
  - **Robust Security**: Impossible to bypass approval requirements through any UI interaction

✓ **Minor UX Improvements** (July 25, 2025)
  - **Login Error Fix**: Changed login error from "email not authorized" to "incorrect password" with admin contact instructions
  - **TaaS Discount Clarification**: Added "(provides 15% discount)" text to Seed Bookkeeping Package checkbox for clarity
  - **Entity Type Addition**: Added "Non-Profit" to entity type dropdown with same pricing as C-Corp

✓ **Major Code Refactoring and Layout Fixes Completed** (July 22, 2025)
  - **Eliminated Code Duplication**: Created `/shared/pricing.ts` with unified pricing logic used by both frontend and backend
  - **Component Extraction**: Built reusable components (QuoteTable, ContactSection, BookkeepingSection, TaasSection, ServiceCards, PricingDisplay, FormNavigation)
  - **Schema Separation**: Extracted form validation logic to `QuoteFormSchema.ts` for better organization
  - **Custom Hooks**: Created specialized hooks (usePricingCalculation, useQuoteManagement, useHubSpotIntegration) to separate business logic from UI
  - **Visual Layout Restored**: Fixed service cards to display in single row and quote form/pricing summary to appear side-by-side
  - **Flexbox Implementation**: Replaced CSS Grid with Flexbox layout for more reliable responsive behavior
  - **Maintained External Behavior**: All user-facing functionality preserved during refactoring - no breaking changes
  - **Improved Maintainability**: Code now organized into logical, single-responsibility components that are easy to understand and modify
  - **Future-Proof Architecture**: Foundation set for easy feature additions and bug fixes without touching massive files

✓ **Complete Approval Code System Implemented** (July 21, 2025)
  - Built 4-digit approval code generation and validation system
  - Request Approval button triggers Slack notification with unique code
  - Approval code popup dialog for secure code entry
  - Cleanup months field locked until valid approval code entered
  - Codes expire after 1 hour and are single-use for security

✓ **Archive Functionality Implemented** (July 20, 2025)
  - Added archive button to saved quotes with confirmation dialog
  - Archives preserve all data for auditing (never deleted from database)
  - Updated database schema with 'archived' boolean field
  - All queries exclude archived quotes by default for clean interface
  - New API endpoint: PATCH /api/quotes/:id/archive

✓ **Production Deployment Completed** (July 20, 2025)
  - Successfully deployed to Replit at seed-bk-calc.replit.app
  - Application is live and accessible via public URL
  - Connected to GitHub repository at seedfinancialdev/seed-price-calc
  - Ready for internal business use and client quote generation

✓ **Dynamic Pricing Implementation** (July 20, 2025)
  - Changed "Marketing Agencies" to "Professional Services" in industry dropdown
  - Moved Transactions field above Revenue Band field for better UX
  - Replaced flat base fees with dynamic revenue multipliers (0.5x to 7.0x)
  - Fixed decimal precision issues - all monetary values now display 2 decimal places
  - Maintained similar pricing levels with smoother transitions between revenue bands

✓ **Application Startup Issues Fixed** (July 20, 2025)
  - Resolved frontend error with undefined updateQuoteMutation
  - Fixed database connection issues with Neon PostgreSQL
  - Application now running successfully on port 5000
  - All quote creation, updates, and pricing calculations working properly

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Style**: RESTful API with JSON responses
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Validation**: Zod schemas shared between frontend and backend

### Data Storage Solutions
- **Primary Database**: PostgreSQL (configured and connected)
- **ORM**: Drizzle ORM for type-safe database operations
- **Migrations**: Drizzle Kit for database schema management
- **Schema Location**: Shared TypeScript schemas in `/shared/schema.ts`
- **Storage Implementation**: DatabaseStorage class replacing MemStorage

## Key Components

### Database Schema
- **Quotes Table**: Stores quote information including contact email, revenue band, transaction volume, industry type, cleanup complexity, calculated fees, and archive status
- **Users Table**: Basic user management with username and password (legacy/placeholder)

### API Endpoints
- `POST /api/quotes` - Create a new quote with pricing calculations
- `GET /api/quotes?email=<email>` - Retrieve quotes by contact email
- `GET /api/quotes/:id` - Retrieve a specific quote by ID
- `PATCH /api/quotes/:id/archive` - Archive a quote (preserves data for auditing)

### Frontend Components
- **Home Page**: Quote generation form with real-time pricing calculations
- **Form Components**: React Hook Form integration with shadcn/ui components
- **Pricing Logic**: Embedded calculations based on revenue bands, transaction volumes, and industry complexity multipliers

### Shared Types and Validation
- Zod schemas for quote creation and validation
- TypeScript types generated from Drizzle schema
- Shared between client and server for type safety

## Data Flow

1. **Quote Creation Flow**:
   - User fills out quote form on frontend
   - Form validation using Zod schemas
   - Real-time price calculation on frontend
   - Form submission sends data to `/api/quotes` endpoint
   - Backend validates data and stores in PostgreSQL
   - Success response triggers UI updates and notifications

2. **Quote Retrieval Flow**:
   - Frontend queries `/api/quotes` with email parameter
   - Backend fetches quotes from database using Drizzle ORM
   - Results displayed in UI components

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL provider
- **Connection**: Uses `DATABASE_URL` environment variable

### UI Libraries
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **shadcn/ui**: Pre-built component library

### Development Tools
- **Replit Integration**: Special development environment support
- **Vite Plugins**: Runtime error overlay and development tools

## Deployment Strategy

### Development
- **Dev Server**: Vite development server for frontend
- **API Server**: Express.js with hot reloading using tsx
- **Database**: Connects to Neon Database in development

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles server code for Node.js production
- **Deployment**: Single process serving both API and static files
- **Environment**: Production detection via `NODE_ENV=production`

### Key Files
- `package.json`: Defines build and dev scripts
- `vite.config.ts`: Frontend build configuration
- `drizzle.config.ts`: Database schema and migration configuration
- `tsconfig.json`: TypeScript configuration for monorepo structure

The architecture follows a modern full-stack pattern with strong type safety, shared validation logic, and optimized development experience through Vite and TypeScript.