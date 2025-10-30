# PRD: Apartment Listings Organizer

## Introduction/Overview

The Apartment Listings Organizer is a web application designed to help young professionals efficiently curate and manage apartment rental listings during their apartment hunting process. The primary problem it solves is the overwhelming task of tracking multiple apartment listings from various sources (primarily Craigslist), keeping notes, and organizing which listings have been reviewed and which still need attention.

The goal is to create a fast, responsive web application that allows users to quickly upload listings, mark them as seen, add personal notes, attach photos, and create visit plans—all in one centralized place.

## Goals

1. Enable users to quickly upload and organize multiple apartment listings from Craigslist
2. Provide a clear visual distinction between seen and unseen listings
3. Allow users to add personal notes and additional information to each listing
4. Support photo management for each listing
5. Enable creation of visit plans to group multiple apartments for scheduled viewings
6. Deliver a fast, responsive user experience optimized for quick curation

## User Stories

1. **As a young professional apartment hunter:**
   I want to upload a list of listings I found on Craigslist so that I can curate them in the system without manual data entry

2. **As a young professional apartment hunter:**
   I want to mark apartments as seen and add my notes to them so that I don't have to review them again and can remember my thoughts

3. **As a young professional apartment hunter:**
   I want to see all the apartments that I haven't seen so that I can choose the next one to check

4. **As a young professional apartment hunter:**
   I want to edit or delete a listing so that I can keep only the relevant ones and update information as needed

5. **As a young professional apartment hunter:**
   I want to create a visiting plan containing multiple listings so that I can schedule a visit to them all

6. **As a young professional apartment hunter:**
   I want to view detailed information about each listing including photos so that I can make informed decisions

## Functional Requirements

### FR1: Listing Upload

1.1. The system must provide an "Upload Listings" button/interface
1.2. The system must automatically fetch and parse listing data from Craigslist URLs
1.3. The system must extract key information including: title, price, number of bedrooms, location, and available photos
1.4. The system must handle multiple listings in a single upload operation
1.5. The system must validate that URLs are valid Craigslist listings before processing

### FR2: Listing Display

2.1. The system must display all listings in a scrollable list view
2.2. Each listing card must show: checkbox (for marking as seen), title, location, price, number of bedrooms, photo count, and note indicator
2.3. The system must display a "Pic Set" indicator showing the number of available photos
2.4. The system must visually indicate which listings have been marked as seen (checked)
2.5. The system must provide a way to filter between "all listings," "seen," and "unseen" listings

### FR3: Listing Details

3.1. The system must provide a details panel that opens when a listing is selected
3.2. The details panel must display the listing title at the top
3.3. The details panel must include a checkbox to mark the listing as seen/unseen
3.4. The details panel must provide a notes text area for adding/editing personal notes
3.5. The details panel must display thumbnail images of available photos (4 visible slots based on mockup)
3.6. The system must allow users to view full-size photos when clicking thumbnails

### FR4: Listing Management

4.1. The system must allow users to edit listing information (title, notes, etc.)
4.2. The system must allow users to delete listings
4.3. The system must persist all changes to the database
4.4. The system must provide confirmation before deleting a listing

### FR5: Visit Plans

5.1. The system must provide a "Visit Plans" section in the interface
5.2. The system must allow users to create new visit plans
5.3. The system must allow users to add multiple listings to a visit plan
5.4. The system must display all created visit plans in a list
5.5. The system must allow users to view the details of each visit plan including all associated listings
5.6. The system must allow users to edit and delete visit plans

### FR6: User Interface

6.1. The system must be responsive and work on desktop, tablet, and mobile devices
6.2. The system must provide fast loading times optimized for quick curation
6.3. The system must use checkboxes for marking listings as seen
6.4. The system must follow a clean, minimal design aesthetic as shown in the mockup

## Non-Goals (Out of Scope)

1. **Multi-user support:** This is a personal application for individual use only
2. **Route optimization:** Visit plans will not include automatic route optimization or travel time calculations (future enhancement)
3. **Calendar integration:** No integration with external calendar applications
4. **Communication tracking:** No tracking of communication history with landlords
5. **Automated notifications:** No email or push notifications for new listings
6. **Multiple source support:** Initial version focuses on Craigslist only (no Zillow, Apartments.com, etc.)
7. **User authentication:** Since this is personal use, complex user management is not required initially
8. **Advanced filtering:** No complex filtering by price range, amenities, etc. (keep it simple)
9. **Sharing functionality:** No ability to share listings or visit plans with others

## Design Considerations

### UI/UX Requirements

- Follow the design mockup provided (mockup.png)
- Use checkboxes for marking listings as seen (simple, fast interaction)
- Implement a two-panel layout: listing list on the left, details panel on the right
- Visit plans section at the bottom of the interface
- Ensure responsive design that adapts to different screen sizes
- Use clear visual hierarchy to distinguish seen vs unseen listings
- Minimize clicks required to mark listings as seen or add notes

### Component Structure

- Main application container with three sections: listings list, details panel, visit plans
- Listing card component (repeatable)
- Details panel component
- Photo gallery component
- Visit plan list component
- Upload listings modal/dialog

## Technical Considerations

### Technology Stack

- **Frontend:** React (functional components with hooks)
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Styling:** Responsive CSS (mobile-first approach)

### Key Technical Requirements

- Implement Craigslist URL parsing and data extraction
- Handle asynchronous listing uploads with loading states
- Optimize image loading and display (thumbnails vs full-size)
- Ensure fast query performance for listing retrieval
- Implement proper error handling for failed uploads or parsing errors

### Data Model Considerations

- Listing schema should include: title, URL, price, bedrooms, location, photos array, notes, seen status, date added
- Visit plan schema should include: name, listing references, date created
- Index listings by "seen" status for fast filtering

## Success Metrics

1. **Speed of curation:** Users can process and mark 20+ listings in under 5 minutes
2. **User efficiency:** Reduction in time spent apartment hunting by centralizing information
3. **Data completeness:** Successfully parse and import 90%+ of Craigslist listings without errors
4. **User satisfaction:** User reports faster, less stressful apartment hunting experience
5. **Feature adoption:** Visit plans feature is used for at least 50% of apartment searches

## Open Questions

1. **Photo storage:** Should photos be downloaded and stored locally, or just reference Craigslist URLs? (Consider Craigslist links may expire)
2. **Listing expiration:** Should old listings be automatically archived or deleted after a certain time period?
3. **Data export:** Would it be useful to export listings data to CSV or PDF?
4. **Categories/Tags:** The initial PRD mentioned categories—should we implement custom tags for listings (e.g., "favorite," "too expensive," "good location")?
5. **Sorting:** What sorting options are most important? (date added, price, location, seen/unseen status?)
6. **Visit plan details:** Should visit plans include date/time fields, or just be groupings of listings?

## Implementation Priority

### Phase 1 (MVP)

- Listing upload from Craigslist URLs
- Display listings in a list view
- Mark listings as seen/unseen
- Add notes to listings
- View listing details

### Phase 2

- Photo display and management
- Edit/delete listings
- Basic visit plans (grouping only)

### Phase 3 (Future Enhancements)

- Advanced visit plans with route optimization
- Additional filtering and sorting options
- Data export functionality
- Custom tags/categories
