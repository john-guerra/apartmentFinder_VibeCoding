# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added - 2024-10-30

#### ESLint and Prettier Configuration (Issue #6)

Configured code formatting and linting tools to maintain consistent code quality and style across the Next.js project.

**Packages Installed:**
- `prettier@^3.6.2` - Code formatter
- `eslint-config-prettier@^10.1.8` - Disables ESLint rules that conflict with Prettier
- `eslint-plugin-prettier@^5.5.4` - Runs Prettier as an ESLint rule

**Files Created:**
- `.prettierrc` - Prettier configuration with project coding standards:
  - Double quotes for strings
  - Semicolons required
  - 100 character line width
  - 2 space indentation
  - ES5 trailing commas
- `.prettierignore` - Files to exclude from formatting
- `.vscode/settings.json` - VS Code editor integration for auto-formatting

**Files Modified:**
- `eslint.config.mjs` - Updated with custom rules:
  - Enforce double quotes (`quotes`)
  - Require semicolons (`semi`)
  - Disallow `var`, prefer `const`/`let` (`no-var`, `prefer-const`)
  - Prefer template literals (`prefer-template`)
  - Enforce camelCase naming (`camelcase`)
  - Modern JavaScript patterns (`prefer-arrow-callback`, `prefer-destructuring`)
  - Restrict console usage to `console.warn` and `console.error`
  - Integrated Prettier config to avoid rule conflicts
- `package.json` - Added scripts:
  - `lint`: Run ESLint via Next.js
  - `lint:fix`: Auto-fix linting issues
  - `format`: Format all files with Prettier
  - `format:check`: Check if files are formatted
- `src/app/actions.js` - Fixed linting errors (console.log → console.warn, prefer-const)
- `src/app/api/upload/route.js` - Fixed unused import (NextRequest)
- `src/lib/mongodb.js` - Fixed prefer-const violation

**Coding Standards Enforced:**
- ✅ Double quotes for strings
- ✅ Semicolons at end of statements
- ✅ No `var`, only `const` and `let`
- ✅ Template literals for string interpolation
- ✅ camelCase for variables/functions, PascalCase for components, UPPER_CASE for constants
- ✅ Modern ES6+ features
- ✅ Proper error handling

**Status:**
- ✅ All ESLint rules pass with no errors or warnings
- ✅ All files formatted with Prettier
- ✅ VS Code integration configured
- ✅ CI-ready scripts available

**Note:** This project uses `pnpm` as the package manager. Use `pnpm install` instead of `npm install`.

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
