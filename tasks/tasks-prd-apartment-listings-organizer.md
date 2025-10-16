# Tasks: Apartment Listings Organizer

## SCRUM Sprint Overview

This project is organized into 2-week sprints following the SCRUM methodology. Each sprint delivers a fully functional MVP that provides immediate value to the user.

### Sprint 1 (2 weeks): Core Listing Management MVP
**Value Delivered:** User can manually add listings, view them, mark them as seen, and add notes.
**Goal:** Enable basic apartment curation workflow without Craigslist integration.

### Sprint 2 (2 weeks): Craigslist Integration & Photo Management MVP
**Value Delivered:** User can automatically import listings from Craigslist URLs with photos.
**Goal:** Automate listing entry and enhance information with visual data.

### Sprint 3 (2 weeks): Visit Plans & Enhanced Management MVP
**Value Delivered:** User can create visit plans, edit/delete listings, and filter views.
**Goal:** Complete the apartment hunting workflow with visit planning.

---

## Relevant Files

### Sprint 1 Files
- `backend/server.js` - Main Express server setup
- `backend/models/Listing.js` - MongoDB schema for apartment listings
- `backend/routes/listings.js` - API routes for listing CRUD operations
- `backend/routes/listings.test.js` - API route tests
- `backend/config/database.js` - MongoDB connection configuration
- `frontend/src/App.jsx` - Main React application component
- `frontend/src/components/ListingCard.jsx` - Individual listing card component
- `frontend/src/components/ListingCard.test.jsx` - ListingCard component tests
- `frontend/src/components/ListingsList.jsx` - Container for all listing cards
- `frontend/src/components/ListingsList.test.jsx` - ListingsList component tests
- `frontend/src/components/DetailsPanel.jsx` - Listing details and notes panel
- `frontend/src/components/DetailsPanel.test.jsx` - DetailsPanel component tests
- `frontend/src/components/AddListingModal.jsx` - Modal for manual listing entry
- `frontend/src/components/AddListingModal.test.jsx` - AddListingModal component tests
- `frontend/src/services/api.js` - API service layer for backend communication
- `frontend/src/App.css` - Main application styles
- `package.json` - Backend dependencies
- `frontend/package.json` - Frontend dependencies
- `.env.example` - Environment variables template

### Sprint 2 Files
- `backend/services/craigslistParser.js` - Craigslist URL parsing and data extraction
- `backend/services/craigslistParser.test.js` - Parser service tests
- `backend/routes/upload.js` - API route for Craigslist URL uploads
- `backend/routes/upload.test.js` - Upload route tests
- `frontend/src/components/UploadModal.jsx` - Modal for Craigslist URL upload
- `frontend/src/components/UploadModal.test.jsx` - UploadModal component tests
- `frontend/src/components/PhotoGallery.jsx` - Photo display component
- `frontend/src/components/PhotoGallery.test.jsx` - PhotoGallery component tests

### Sprint 3 Files
- `backend/models/VisitPlan.js` - MongoDB schema for visit plans
- `backend/routes/visitPlans.js` - API routes for visit plan CRUD operations
- `backend/routes/visitPlans.test.js` - Visit plan route tests
- `frontend/src/components/VisitPlansSection.jsx` - Visit plans display and management
- `frontend/src/components/VisitPlansSection.test.jsx` - VisitPlansSection component tests
- `frontend/src/components/CreateVisitPlanModal.jsx` - Modal for creating visit plans
- `frontend/src/components/CreateVisitPlanModal.test.jsx` - CreateVisitPlanModal component tests
- `frontend/src/components/FilterBar.jsx` - Filter controls for seen/unseen listings
- `frontend/src/components/FilterBar.test.jsx` - FilterBar component tests
- `frontend/src/components/ConfirmDialog.jsx` - Reusable confirmation dialog
- `frontend/src/components/ConfirmDialog.test.jsx` - ConfirmDialog component tests

### Notes
- Unit tests should be placed alongside the code files they are testing
- Integration tests for API routes should test database interactions
- Component tests should use React Testing Library
- E2E tests will be added at the end of each sprint to validate the full user workflow

---

## Sprint 1: Core Listing Management MVP

**Sprint Goal:** Deliver a functional application where users can manually add apartment listings, view them in a list, select individual listings to see details, mark them as seen, and add personal notes.

**Definition of Done:**
- User can manually add a listing with title, location, price, and bedrooms
- User can view all listings in a scrollable list
- User can click a listing to see details in the right panel
- User can mark a listing as seen/unseen via checkbox
- User can add and edit notes for a listing
- All changes persist to MongoDB
- All unit tests pass
- E2E test validates the complete workflow
- Application is responsive on desktop and mobile

---

## Sprint 1 Tasks

- [ ] 1.0 Project Setup & Infrastructure
  - [ ] 1.1 Initialize Node.js backend project with Express, MongoDB, and necessary dependencies
  - [ ] 1.2 Initialize React frontend project with Create React App and necessary dependencies
  - [ ] 1.3 Set up MongoDB database connection and configuration
  - [ ] 1.4 Create project folder structure (backend/frontend separation)
  - [ ] 1.5 Set up environment variables configuration (.env files)
  - [ ] 1.6 Configure ESLint and Prettier for code formatting
  - [ ] 1.7 Set up basic CI/CD pipeline or deployment configuration

- [ ] 2.0 Backend API Development
  - [ ] 2.1 Create Listing model schema in MongoDB (title, location, price, bedrooms, notes, seen, dateAdded)
  - [ ] 2.2 Implement POST /api/listings endpoint for creating new listings
  - [ ] 2.3 Implement GET /api/listings endpoint for retrieving all listings
  - [ ] 2.4 Implement PUT /api/listings/:id endpoint for updating listing details and seen status
  - [ ] 2.5 Implement DELETE /api/listings/:id endpoint for deleting listings
  - [ ] 2.6 Add input validation and error handling for all endpoints
  - [ ] 2.7 Set up CORS configuration for frontend-backend communication
  - [ ] 2.8 Write unit tests for all API endpoints using Jest and Supertest

- [ ] 3.0 Frontend Application Structure
  - [ ] 3.1 Create main App component with two-panel layout structure
  - [ ] 3.2 Set up React Router (if needed) and basic navigation
  - [ ] 3.3 Create API service layer for backend communication
  - [ ] 3.4 Implement global state management (Context API or simple state)
  - [ ] 3.5 Set up responsive CSS framework and base styles matching mockup design
  - [ ] 3.6 Create reusable UI components (buttons, modals, form inputs)
  - [ ] 3.7 Implement error handling and loading states for API calls

- [ ] 4.0 Listing Display & Interaction
  - [ ] 4.1 Create ListingCard component displaying title, location, price, bedrooms, and seen checkbox
  - [ ] 4.2 Create ListingsList component to render all listing cards in scrollable container
  - [ ] 4.3 Create DetailsPanel component showing selected listing details and notes textarea
  - [ ] 4.4 Implement listing selection functionality (click to show details)
  - [ ] 4.5 Create AddListingModal component for manual listing entry form
  - [ ] 4.6 Implement toggle seen/unseen functionality with checkbox interaction
  - [ ] 4.7 Implement notes editing and saving functionality
  - [ ] 4.8 Add visual distinction between seen and unseen listings (styling)
  - [ ] 4.9 Implement responsive design for mobile and tablet devices

- [ ] 5.0 Testing & Deployment
  - [ ] 5.1 Write unit tests for all React components using React Testing Library
  - [ ] 5.2 Write integration tests for API endpoints with database interactions
  - [ ] 5.3 Create end-to-end test for complete user workflow (add listing → mark seen → add notes)
  - [ ] 5.4 Perform manual testing on different devices and browsers
  - [ ] 5.5 Set up production build configuration for both frontend and backend
  - [ ] 5.6 Deploy application to chosen hosting platform (Heroku, Vercel, etc.)
  - [ ] 5.7 Validate deployed application meets Sprint 1 acceptance criteria
  - [ ] 5.8 Document setup and deployment instructions

---

## Sprint 2: Craigslist Integration & Photo Management MVP

**Sprint Goal:** Enhance the application with automatic Craigslist URL parsing and photo management capabilities.

**Definition of Done:**
- User can paste Craigslist URLs and automatically import listing data
- User can view photos associated with listings
- Photos are properly stored and displayed
- Craigslist parser handles errors gracefully
- All previous Sprint 1 functionality remains intact
- All unit tests pass
- E2E test validates Craigslist import workflow

## Sprint 2 Tasks

- [ ] 6.0 Craigslist Integration Backend
  - [ ] 6.1 Research and implement Craigslist HTML parsing library (Cheerio/Puppeteer)
  - [ ] 6.2 Create craigslistParser service to extract listing data from URLs
  - [ ] 6.3 Implement URL validation for Craigslist listings
  - [ ] 6.4 Add photo URL extraction and storage logic
  - [ ] 6.5 Create POST /api/upload endpoint for Craigslist URL processing
  - [ ] 6.6 Implement error handling for invalid URLs and parsing failures
  - [ ] 6.7 Write unit tests for Craigslist parser service
  - [ ] 6.8 Update Listing model to include photos array and source URL

- [ ] 7.0 Photo Management Frontend
  - [ ] 7.1 Create PhotoGallery component for displaying listing photos
  - [ ] 7.2 Implement thumbnail view with 4 photo slots as per mockup
  - [ ] 7.3 Add full-size photo modal for enlarged viewing
  - [ ] 7.4 Update DetailsPanel to include PhotoGallery component
  - [ ] 7.5 Add photo loading states and error handling
  - [ ] 7.6 Optimize image loading and display performance
  - [ ] 7.7 Write unit tests for photo-related components

- [ ] 8.0 Upload Interface
  - [ ] 8.1 Create UploadModal component for Craigslist URL input
  - [ ] 8.2 Add "Upload Listings" button to main interface
  - [ ] 8.3 Implement multiple URL input support (textarea)
  - [ ] 8.4 Add upload progress indicators and success/error messages
  - [ ] 8.5 Update ListingCard to show "Pic Set" indicator for photo count
  - [ ] 8.6 Integrate upload functionality with existing listing management

- [ ] 9.0 Sprint 2 Testing & Validation
  - [ ] 9.1 Write integration tests for Craigslist URL upload workflow
  - [ ] 9.2 Test photo display and gallery functionality
  - [ ] 9.3 Create E2E test for complete Craigslist import workflow
  - [ ] 9.4 Validate all Sprint 1 functionality still works
  - [ ] 9.5 Deploy Sprint 2 features and validate production deployment

---

## Sprint 3: Visit Plans & Enhanced Management MVP

**Sprint Goal:** Complete the apartment hunting workflow with visit planning, listing management, and filtering capabilities.

**Definition of Done:**
- User can create, edit, and delete visit plans
- User can add/remove listings from visit plans
- User can edit and delete individual listings
- User can filter listings by seen/unseen status
- Confirmation dialogs prevent accidental deletions
- Complete feature set from PRD is functional
- All tests pass and application is production-ready

## Sprint 3 Tasks

- [ ] 10.0 Visit Plans Backend
  - [ ] 10.1 Create VisitPlan model schema (name, listings array, dateCreated)
  - [ ] 10.2 Implement CRUD API endpoints for visit plans
  - [ ] 10.3 Add relationship management between listings and visit plans
  - [ ] 10.4 Write unit tests for visit plan endpoints
  - [ ] 10.5 Update database indexes for optimal querying

- [ ] 11.0 Visit Plans Frontend
  - [ ] 11.1 Create VisitPlansSection component for bottom panel
  - [ ] 11.2 Create CreateVisitPlanModal for new visit plan creation
  - [ ] 11.3 Implement visit plan list display with basic details
  - [ ] 11.4 Add functionality to add/remove listings from visit plans
  - [ ] 11.5 Implement visit plan editing and deletion
  - [ ] 11.6 Write unit tests for visit plan components

- [ ] 12.0 Enhanced Listing Management
  - [ ] 12.1 Add edit functionality to existing listings
  - [ ] 12.2 Create ConfirmDialog component for deletion confirmations
  - [ ] 12.3 Implement listing deletion with confirmation
  - [ ] 12.4 Add FilterBar component for seen/unseen filtering
  - [ ] 12.5 Implement filtering logic in listing display
  - [ ] 12.6 Update UI to show filter states clearly

- [ ] 13.0 Final Polish & Production
  - [ ] 13.1 Comprehensive testing of all features
  - [ ] 13.2 Performance optimization and code cleanup
  - [ ] 13.3 Final responsive design adjustments
  - [ ] 13.4 Complete E2E testing suite covering all workflows
  - [ ] 13.5 Production deployment and documentation
  - [ ] 13.6 User acceptance testing and feedback collection

