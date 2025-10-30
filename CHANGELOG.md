# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed - 2024-10-30

#### Architecture Documentation Update

Updated all GitHub issues and project documentation to reflect the actual Next.js monorepo architecture instead of the originally planned separate frontend/backend structure.

**GitHub Issues Updated:**
- Closed #1 (Backend initialization) - Already complete with Next.js setup
- Closed #2 (Frontend initialization) - Already complete with Next.js setup
- Updated #3 (MongoDB connection) - Changed paths from `backend/config/` to `src/lib/`
- Updated #4 (Folder structure) - Documented Next.js App Router structure
- Updated #5 (Environment variables) - Changed to Next.js `.env.local` pattern
- Updated #6 (ESLint & Prettier) - Updated for monorepo configuration
- Updated #7 (CI/CD) - Updated for unified Next.js deployment

**Files Modified:**
- `tasks/tasks-prd-apartment-listings-organizer.md` - Updated all file paths and architecture notes to reflect Next.js structure
  - Added architecture documentation explaining the monorepo approach
  - Updated relevant files section with correct Next.js paths
  - Modified Sprint 1 tasks to mark completed items and update Next.js-specific tasks
  - Added notes about serverless considerations and Next.js conventions

**Architecture Changes:**
- **From**: Separate `backend/` and `frontend/` folders with Express + React
- **To**: Next.js 15 monorepo with:
  - `src/app/` - Pages and API routes (App Router)
  - `src/components/` - React components
  - `src/lib/` - Utilities and database connection
  - `src/models/` - MongoDB/Mongoose schemas
  - `.env.local` - Environment variables (Next.js convention)

**Rationale:**
The project was already initialized as a Next.js application, which provides a more modern, integrated approach with:
- Built-in API routes (serverless functions)
- React Server Components
- Automatic code splitting and optimization
- Simplified deployment (single build process)
- Better developer experience with Hot Module Replacement

This change aligns the project documentation with the actual implementation, preventing confusion and ensuring all team members understand the monorepo architecture.
