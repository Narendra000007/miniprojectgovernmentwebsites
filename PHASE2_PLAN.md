# PHASE 2 IMPLEMENTATION PLAN & SPECIFICATION
**Project Title:** Centralized Government Opportunity Monitoring, Aggregation & Notification Platform  
**Academic Institution:** Siddaganga Institute of Technology, Tumakuru-3  
**Department:** Computer Science and Engineering  
**Academic Year:** 2026-27 (ODD)  
**Students:**  
- Narendra Kumar Yadav (1SI24CS114)  
- Nongthombam Sanathoi Singh (1SI24CS120)  
- Rahul Dadimana Kshetri (1SI24CS136)  
- Tomthilnganba Soraisham (1SI24CS194)  
**Project Guide:** Dr. Anupama T A, Assistant Professor  

---

## 1. Executive Summary & Synopsis Analysis

Based on the official project synopsis PDF, the platform addresses the critical challenge faced by Indian students and job seekers:
- Government opportunities (recruitments, scholarships, fellowships, internships, competitive examinations) are scattered across hundreds of central, state, and departmental portals.
- Applicants suffer from information overload, disjointed application schedules, missed deadlines, and ambiguous eligibility criteria.

### 4 Core Synopsis Objectives:
1. **Data Aggregation:** Centralize opportunities into a unified, normalized schema.
2. **Search & Filtering:** Multi-dimensional querying by qualification, category, location, and deadlines.
3. **Profile-Based Eligibility Matching:** Compare applicant qualifications and interests with announcement criteria to calculate match scores and explain eligibility requirements.
4. **Notifications & Application Tracking:** Manage deadlines, bookmark opportunities, and track application lifecycles (*Interested*, *Planning to Apply*, *Applied*, *Not Applying*).

---

## 2. Workspace Assessment & Current Implementation Status

- **Workspace Path:** `c:\Users\naren\OneDrive\Desktop\miniproject`
- **Initial State:** Empty directory (no prior code or legacy dependencies present).
- **Installed Runtimes:**
  - Java: OpenJDK / Oracle JDK 21 (`C:\Program Files\Java\jdk-21`)
  - Build Tool: Apache Maven 3.9.6 (`C:\Users\naren\.tools\maven`)
  - Node.js & npm: Node v20.18.0 & npm 10.8.2 (`C:\Users\naren\.tools\node`)
  - Database: PostgreSQL (with dual-profile support for standard PostgreSQL 5432 and embedded PostgreSQL mode for self-contained execution)

---

## 3. Technology Stack Alignment

| Layer | Synopsis Specification | Implementation Choice | Rationale |
|---|---|---|---|
| **Frontend** | React | React 18 + Vite + Vanilla CSS / CSS Modules | Fast builds, ultra-responsive modern UI, zero bloat, native browser standards |
| **Backend** | Java Spring Boot | Spring Boot 3.3.x (Java 21) | Enterprise-grade REST architecture, strong JPA/Hibernate support, high performance |
| **Database** | PostgreSQL | PostgreSQL 16+ dialect & JPA Hibernate | Full relational integrity, ACID compliance, structured JSON support where needed |
| **Communication**| REST APIs (JSON) | Spring Web MVC + Jackson | Standardized RESTful JSON contracts, DTO pattern, proper HTTP status codes |
| **Design** | Modern Gov Portal | Curated Gov Tech Theme (National Blue, Slate, Emerald) | Meets the prompt's high UI standards, accessible, clean typography, responsive |

---

## 4. Phase 2 Scope vs. Phase 3 (Future) Boundary

### In Scope for Phase 2 (~50% Milestone Target):
- [x] **Module A: Responsive Frontend Web Portal**
  - Unified Navbar & Footer with branding and active navigation.
  - Interactive Dashboard with opportunity metrics, deadlines countdown, and quick actions.
  - Opportunities Directory with dynamic live search, category tabs, and multi-filter drawers.
  - Comprehensive Opportunity Detail View with official external portal links, key dates, eligibility breakdown, and official disclaimers.
  - User Profile Management (degree, specialization, pass-out year, category, state, CGPA/percentage, skills).
  - Rule-Based Match Scoring & Breakdown Modal (shows score %, matching criteria, missing requirements).
  - Bookmarks & Saved Opportunities Page.
  - Multi-stage Application Tracker (Kanban / Status List with 4 lifecycle stages: *Interested*, *Planning to Apply*, *Applied*, *Not Applying*).
- [x] **Module B: Government Opportunity Management**
  - 5 official categories:
    1. Government Recruitment (e.g. UPSC CSE, SSC CGL, RRB, ISRO, DRDO, State PSCs)
    2. Scholarships (e.g. NSP Post-Matric, AICTE Pragati, PMSS)
    3. Fellowships (e.g. Prime Minister's Research Fellowship - PMRF, CSIR-JRF, ICMR)
    4. Internships (e.g. NITI Aayog Internship, NIC e-Gov Internship, MEA)
    5. Competitive Examinations (e.g. GATE 2026, UGC NET, CAT, CDS)
  - Realistic, verified sample dataset with complete metadata, official URLs, and explicit sample/demonstration labels.
  - REST endpoints for listing, filtering, detail retrieval, and administrative addition.
- [x] **Module C: Search and Multi-Filter Engine**
  - Case-insensitive search on title, organization, description, and keywords.
  - Multi-filtering: Category, Qualification, Location (All India / State), Application Status (Open / Closing Soon / Closed).
  - Active filter badges with one-click clear.
- [x] **Module D: User Profile & Rule-Based Eligibility Engine**
  - Stored profile schema for academic and demographic background.
  - Deterministic, explainable matching rules evaluating minimum qualification, discipline, and location eligibility.
  - Match score (0–100%) with positive match reasons and unmet conditions.
  - Mandatory disclaimer urging candidates to read the official gazette/notification PDF.
- [x] **Module E: Bookmarks & Application Tracker**
  - Relational mapping between User and Opportunities.
  - Duplicate-safe bookmarking (add/remove toggle).
  - Status progression tracking with timestamped notes.
- [x] **Module F: Spring Boot Backend & PostgreSQL Integration**
  - Layered architecture: Controllers, Services, Repositories, Entities, DTOs, Exceptions.
  - PostgreSQL DDL migrations (`schema.sql`) and initial data loader (`data.sql`).
  - CORS configuration enabling seamless local React integration.
  - Global Exception Handler returning standardized JSON error envelopes.

### Reserved for Phase 3 (Subsequent Phase):
- Automated multi-portal web scrapers (Playwright/Selenium scheduled workers).
- RSS/Atom feed polling pipelines.
- Automated de-duplication across multi-state gazette releases.
- Automated email/SMS/WhatsApp notification dispatchers.
- AI/BERT-based deep semantic matching and natural language resume parsing.
- Production cloud deployment (GCP/AWS) with OAuth2/SSO.

---

## 5. Architectural Diagram & Data Flow

```
                      +------------------------------------------+
                      |         React Web Application            |
                      |  (Dashboard, Explorer, Profile, Tracker) |
                      +--------------------+---------------------+
                                           |
                                  HTTP REST / JSON
                                           |
                                           v
                      +------------------------------------------+
                      |       Spring Boot 3.3.x REST API        |
                      |------------------------------------------|
                      |  OpportunityController  | UserProfileCtrl|
                      |  BookmarkController     | TrackerCtrl    |
                      |------------------------------------------|
                      |               Service Layer              |
                      |   - OpportunityService                   |
                      |   - EligibilityMatchingEngine            |
                      |   - ApplicationTrackerService            |
                      |------------------------------------------|
                      |            Spring Data JPA               |
                      +--------------------+---------------------+
                                           |
                                      JDBC Driver
                                           |
                                           v
                      +------------------------------------------+
                      |           PostgreSQL Database            |
                      |------------------------------------------|
                      |  - users                                 |
                      |  - user_profiles                         |
                      |  - opportunities                         |
                      |  - bookmarks                             |
                      |  - application_tracking                  |
                      +------------------------------------------+
```

---

## 6. Implementation Sequence & Milestones

1. **Phase 2 Plan & Workspace Structure** (this document)
2. **Database Design & Entities**
   - Tables: `users`, `user_profiles`, `opportunities`, `bookmarks`, `application_tracking`.
   - SQL DDL & Seed scripts with 20+ realistic government opportunities.
3. **Spring Boot Backend Implementation**
   - Setup Maven `pom.xml` with Spring Boot 3.3, Spring Data JPA, Spring Web, Validation, PostgreSQL driver, and H2 test/fallback.
   - Domain Entities, Repositories, DTOs, and Services.
   - `EligibilityMatchingEngine` implementing explainable scoring.
   - REST Controllers and Global Exception Handling.
   - CORS & application properties configuration.
4. **React Frontend Portal Implementation**
   - Modern Vite + React project setup with custom design system.
   - Component hierarchy:
     - Navigation Bar & Footer with SIT mini-project metadata.
     - Metrics & Summary Hero Dashboard.
     - Opportunities Directory with real-time filters and search.
     - Opportunity Detail Modal with Official Links & Eligibility breakdown.
     - User Profile Form with instant re-matching.
     - Bookmarks Hub.
     - Application Kanban & Status Tracking Manager.
   - API Client layer linking all UI actions to Spring Boot endpoints.
5. **Testing, Build & Verification**
   - Backend compilation & test suite execution.
   - Frontend production build & local dev server launch.
   - End-to-end user journey validation with Browser Subagent.
6. **Documentation & Faculty Demo Walkthrough**
   - Step-by-step demo script matching Section 8 requirements.
