# Centralized Government Opportunity Monitoring, Aggregation & Notification Platform
**Phase 2 Submission & Demonstration Documentation**  
**Academic Year:** 2026-27 (ODD) &bull; Semester V &bull; Bachelor of Engineering in Computer Science and Engineering  
**Institution:** Siddaganga Institute of Technology, Tumakuru-3  
**Project Guide:** Dr. Anupama T A, Assistant Professor  

### Student Authors:
1. **Narendra Kumar Yadav** — `1SI24CS114`
2. **Nongthombam Sanathoi Singh** — `1SI24CS120`
3. **Rahul Dadimana Kshetri** — `1SI24CS136`
4. **Tomthilnganba Soraisham** — `1SI24CS194`

---

## 1. Project Overview & Problem Statement

Government opportunities across India—including recruitments, scholarships, doctoral fellowships, youth internships, and national competitive entrance examinations—are currently dispersed across hundreds of separate central, state, and departmental portals. 

Applicants face:
- Information fragmentation and manual searching across disparate websites.
- Complex and ambiguous eligibility conditions.
- Missed application deadlines due to lack of consolidated monitoring and tracking.

### Phase 2 Milestone Objective (~50% Completion)
To engineer a functional, end-to-end full-stack portal meeting the specifications in the project synopsis PDF:
- **Centralized Normalized Schema:** Standard opportunity model supporting 5 key government categories.
- **Responsive Web Portal:** Modern React interface for browsing, searching, and inspecting opportunities.
- **Multi-Dimensional Filter Engine:** Real-time querying across categories, qualifications, locations, and deadlines.
- **Explainable Rule-Based Eligibility Matching Engine:** Algorithmic comparison of candidate academic background against announcement criteria with transparent score breakdown.
- **Bookmarks & Multi-Stage Application Tracker:** Relational persistence for saved opportunities and lifecycle statuses (*Interested*, *Planning to Apply*, *Applied*, *Not Applying*).

---

## 2. Technology Stack & Architecture

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Frontend** | React + Vite | React 18, Vite 5 | Fast, responsive UI with custom Government Design System |
| **Backend** | Java Spring Boot | Spring Boot 3.3.4, Java 21 | Layered REST API architecture (Controller-Service-Repository) |
| **Database** | PostgreSQL | PostgreSQL 16+ Dialect / Driver | Relational schema with foreign keys, unique constraints, and indexes |
| **Fallback/Dev DB** | H2 (PostgreSQL Mode) | H2 2.2+ | File-persisted local dev engine enabling zero-friction evaluation |
| **Build Tools** | Apache Maven & npm | Maven 3.9.6, Node 20.18, npm 10.8 | Dependency management, bundling, and testing |

### Architecture Diagram
```
  +-------------------------------------------------------------------+
  |                      React 18 Frontend Portal                     |
  | (Dashboard, Catalog, Eligibility Engine, Bookmarks, Kanban Board) |
  +---------------------------------+---------------------------------+
                                    |
                           REST JSON APIs (HTTP)
                                    |
                                    v
  +-------------------------------------------------------------------+
  |                   Spring Boot 3.3.4 REST Backend                  |
  |-------------------------------------------------------------------|
  | Controllers: Opportunity, UserProfile, Matching, Bookmark, Track  |
  | Services: OpportunityService, EligibilityMatchingEngine, Tracking |
  | Repositories: OpportunityRepository, UserRepository, etc.         |
  +---------------------------------+---------------------------------+
                                    |
                               JDBC Driver
                                    |
                                    v
  +-------------------------------------------------------------------+
  |                   PostgreSQL Database Schema                      |
  |-------------------------------------------------------------------|
  |  users  |  user_profiles  |  opportunities  | bookmarks | tracking|
  +-------------------------------------------------------------------+
```

---

## 3. Directory Structure

```
miniproject/
├── PHASE2_PLAN.md                     # Phase 2 implementation specification & plan
├── README.md                          # Project documentation and demo guide
├── database/
│   ├── schema.sql                     # PostgreSQL DDL table definitions
│   └── seed_data.sql                  # Verified sample data across 5 categories
├── backend/                           # Java Spring Boot REST API
│   ├── pom.xml                        # Maven dependencies & build config
│   ├── src/main/java/com/govopps/platform/
│   │   ├── PlatformApplication.java  # Main application entry point
│   │   ├── config/
│   │   │   ├── CorsConfig.java        # Cross-Origin Resource Sharing setup
│   │   │   └── DataLoader.java        # Auto-seeding component for realistic demo records
│   │   ├── controller/
│   │   │   ├── OpportunityController.java
│   │   │   ├── UserProfileController.java
│   │   │   ├── MatchingController.java
│   │   │   ├── BookmarkController.java
│   │   │   ├── TrackingController.java
│   │   │   └── StatsController.java
│   │   ├── dto/
│   │   │   ├── ApiResponse.java       # Standard envelope DTO
│   │   │   ├── MatchResultDto.java    # Explainable match breakdown DTO
│   │   │   ├── UserProfileDto.java
│   │   │   ├── BookmarkRequest.java
│   │   │   └── TrackingUpdateRequest.java
│   │   ├── exception/
│   │   │   ├── ResourceNotFoundException.java
│   │   │   ├── DuplicateResourceException.java
│   │   │   └── GlobalExceptionHandler.java
│   │   ├── model/
│   │   │   ├── Opportunity.java       # Core entity with 5 categories
│   │   │   ├── Category.java          # RECRUITMENT, SCHOLARSHIP, etc.
│   │   │   ├── User.java
│   │   │   ├── UserProfile.java       # Academic & demographic attributes
│   │   │   ├── Bookmark.java          # Saved opportunities with unique index
│   │   │   ├── ApplicationTracking.java
│   │   │   └── ApplicationStatus.java # INTERESTED, PLANNING_TO_APPLY, APPLIED, NOT_APPLYING
│   │   ├── repository/
│   │   │   ├── OpportunityRepository.java
│   │   │   ├── UserRepository.java
│   │   │   ├── UserProfileRepository.java
│   │   │   ├── BookmarkRepository.java
│   │   │   └── ApplicationTrackingRepository.java
│   │   └── service/
│   │       ├── OpportunityService.java
│   │       ├── EligibilityMatchingEngine.java
│   │       ├── UserProfileService.java
│   │       └── ApplicationTrackingService.java
│   └── src/main/resources/
│       ├── application.properties     # Default application configuration
│       └── application-postgres.properties # Native PostgreSQL configuration profile
└── frontend/                          # React + Vite Web Application
    ├── package.json
    ├── vite.config.js                 # Proxy config for port 5173 -> 8080
    ├── index.html                     # HTML5 entry with fonts & SEO
    └── src/
        ├── index.css                  # Custom Government Portal Design System
        ├── main.jsx
        ├── App.jsx                    # Root state & modal router
        ├── api/
        │   └── api.js                 # Unified asynchronous REST client
        ├── components/
        │   ├── Navbar.jsx             # National tricolor topbar & route badges
        │   ├── Footer.jsx             # SIT institutional credits & disclaimer
        │   ├── HeroStats.jsx          # Live metric cards for 5 categories
        │   ├── FilterBar.jsx          # Multi-filter search & category pill bar
        │   ├── OpportunityCard.jsx    # Opportunity card with urgency deadline pill
        │   ├── OpportunityModal.jsx   # Detailed view with official links & tracking
        │   ├── MatchModal.jsx         # Transparent rule-based score breakdown
        │   └── NotificationToast.jsx  # User action alerts
        └── pages/
            ├── DashboardPage.jsx      # Top recommendations & urgent deadlines
            ├── OpportunitiesPage.jsx  # Full catalog with dynamic querying
            ├── MatchingPage.jsx       # Ranked eligibility match list
            ├── BookmarksPage.jsx      # Saved opportunities hub
            ├── TrackingPage.jsx       # 4-stage Kanban tracking board
            └── ProfilePage.jsx        # Academic background editor & re-evaluation
```

---

## 4. 5 Government Opportunity Categories Supported

1. **Government Recruitment:**
   - ISRO Scientist/Engineer 'SC' (URSC / VSSC)
   - UPSC Civil Services Examination (IAS, IPS, IFS)
   - DRDO RAC Scientist 'B' (Computer Science)
   - State Bank of India (SBI) Probationary Officer
   - Karnataka Public Service Commission (KPSC) Assistant Executive Engineer
2. **Scholarships:**
   - National Scholarship Portal (NSP) Central Sector Scheme
   - AICTE Pragati Scholarship for Girl Students
   - Karnataka State Post-Matric Scholarship Portal (SSP)
3. **Fellowships:**
   - Prime Minister's Research Fellowship (PMRF)
   - CSIR-UGC Junior Research Fellowship (JRF) & Lectureship
4. **Internships:**
   - NITI Aayog Policy & Technical Internship Scheme
   - National Informatics Centre (NIC) e-Governance Internship
   - Ministry of External Affairs (MEA) Summer Internship
5. **Competitive Examinations:**
   - Graduate Aptitude Test in Engineering (GATE 2027)
   - Combined Defence Services (CDS I 2027)
   - UGC National Eligibility Test (UGC NET)

---

## 5. REST API Documentation

### Base URL: `http://localhost:8080/api`

| Endpoint | Method | Description | Sample Query / Body |
|---|---|---|---|
| `/stats/dashboard` | `GET` | Aggregated opportunity counts by category & deadline urgency | `None` |
| `/opportunities` | `GET` | Multi-filter opportunity search | `?keyword=ISRO&category=RECRUITMENT&qualification=B.E./B.Tech` |
| `/opportunities/{id}` | `GET` | Retrieve full opportunity record | `Path: id=1` |
| `/matching/{userId}` | `GET` | Calculate rule-based match scores across all opportunities | `Path: userId=1` |
| `/matching/{userId}/opportunity/{oppId}` | `GET` | Explainable match evaluation for specific opportunity | `Path: userId=1, oppId=1` |
| `/bookmarks/{userId}` | `GET` | List all saved bookmarks for user | `Path: userId=1` |
| `/bookmarks` | `POST` | Save bookmark (prevents duplicates with HTTP 409) | `{"userId": 1, "opportunityId": 2}` |
| `/bookmarks/{userId}/{oppId}` | `DELETE` | Remove opportunity bookmark | `Path: userId=1, oppId=2` |
| `/tracking/{userId}` | `GET` | List application tracking entries | `Path: userId=1` |
| `/tracking` | `POST` | Update application stage (`INTERESTED`, `PLANNING_TO_APPLY`, `APPLIED`, `NOT_APPLYING`) | `{"userId": 1, "opportunityId": 1, "status": "APPLIED", "notes": "Submitted"}` |
| `/users/{userId}/profile` | `GET` | Fetch student academic profile | `Path: userId=1` |
| `/users/{userId}/profile` | `PUT` | Update academic qualifications & re-trigger matching | `{"highestQualification": "B.E./B.Tech", "percentageOrCgpa": 8.45, ...}` |

---

## 6. How to Run the Application Locally

### Prerequisites
- Java JDK 21+ (`java -version`)
- Apache Maven 3.9+ (`mvn -version`)
- Node.js 20+ & npm (`node -v`, `npm -v`)
- PostgreSQL (optional: application defaults to embedded PostgreSQL-compatible engine with persistent storage in `./data/`)

### Starting the Spring Boot Backend (Port 8080)
```powershell
cd backend
mvn spring-boot:run
```
*The backend will automatically start Tomcat on port 8080, run schema migrations, and seed initial demonstration records.*

To run with an external PostgreSQL server on port 5432:
```powershell
mvn spring-boot:run -Dspring-boot.run.profiles=postgres
```

### Starting the React Frontend (Port 5173)
```powershell
cd frontend
npm install
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

---

## 7. Phase 2 Demonstration Step-by-Step Script for Faculty

1. **Dashboard & Metric Overview:**
   - Open `http://localhost:5173/`.
   - Show the header with national branding and SIT CSE academic credits.
   - Show the 5 category metric cards (Recruitment, Scholarship, Fellowship, Internship, Competitive Exam).
   - Point out the "Recommended for Your Profile" and "Urgent Deadlines" sections.
2. **Search & Multi-Filtering:**
   - Click **Explore Opportunities** in the navbar.
   - Filter by clicking the **👔 Recruitments** pill. Notice the catalog immediately filters to recruitments.
   - In the search bar, type `ISRO`. Observe instant matching on title/organization.
   - Test qualification dropdown (e.g. select `B.E./B.Tech`).
   - Click **Reset All Filters** to clear.
3. **Opportunity Detail & Official Links:**
   - Click **View Details** on any opportunity (e.g., ISRO or PMRF).
   - Show the required qualifications, allowed disciplines, percentage cutoff, and deadline.
   - Point out the **Apply on Official Portal** button linking to `isro.gov.in` and **Notification PDF** link.
   - Point out the official verification disclaimer.
4. **Application Tracking Updates:**
   - Inside the modal, change the tracking dropdown to **APPLIED**, enter notes (`Submitted registration`), and click **Save Status**.
   - Notice the green confirmation message.
   - Close modal and navigate to the **Application Tracker** tab in the navbar.
   - Observe the opportunity now appearing under the **✅ Applied** Kanban column with the saved notes.
5. **Rule-Based Eligibility Matching Engine:**
   - Click **Eligibility Matches** in the navbar.
   - Show the calculated compatibility scores (e.g., 100% for ISRO and KPSC, 80% for PMRF).
   - Click **Why this score?** to open the rule breakdown dialog:
     - Show the green checkmarks: degree fulfillment, discipline alignment, score cutoff satisfaction, age limit compliance, and location match.
     - Show missing requirements if any criteria are unmet.
6. **User Profile & Dynamic Re-Evaluation:**
   - Click **My Profile** in the navbar.
   - Demonstrate modifying the CGPA (e.g., from `8.45` to `9.2`) or changing qualification.
   - Click **Save Profile & Re-Evaluate Matches**.
   - Show the instant re-computation and the live match results updating in real time.
7. **Saved Bookmarks:**
   - Click **Saved Bookmarks** in the navbar to show persisted bookmarks.
   - Toggle bookmark icon on/off to verify immediate update.
8. **Persistence Verification:**
   - Refresh the browser (`F5`).
   - Verify all updated tracking statuses, bookmarks, and profile values remain intact.

---

## 8. Milestone Summary: Phase 2 Completed vs Phase 3 Roadmap

### Implemented in Phase 2 (~50% Target Met)
- [x] Full Spring Boot 3.3 REST API with layered architecture.
- [x] PostgreSQL relational schema with foreign keys, unique constraints, and indexes.
- [x] Dual-profile database support (external PostgreSQL 5432 + persistent local mode).
- [x] Unified normalized opportunity model supporting all 5 synopsis categories.
- [x] Verified dataset with 16 realistic government announcements and official links.
- [x] Responsive React frontend portal with custom Government Design System.
- [x] Multi-filter search engine (keyword, category, qualification, location, status).
- [x] Rule-based eligibility matching engine with explainable score breakdown.
- [x] Duplicate-safe bookmarking system.
- [x] 4-stage application lifecycle tracking board (*Interested*, *Planning to Apply*, *Applied*, *Not Applying*).
- [x] Candidate academic profile editor with live re-matching feedback.
- [x] Global exception handling and validation.

### Reserved for Phase 3 (Future Advanced Scope)
- [ ] Automated web scrapers and crawlers for state/central government gazettes.
- [ ] RSS/Atom feed automatic polling engine.
- [ ] Cross-portal de-duplication across multi-state employment news releases.
- [ ] Automated SMS, Email, and WhatsApp deadline reminder alerts.
- [ ] Machine-learning/BERT semantic matching on unstructured PDF notifications.
- [ ] Production Cloud deployment (AWS/GCP) with OAuth2 / DigiLocker integration.
