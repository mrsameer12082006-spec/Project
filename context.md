# SchemeSathi 🇮🇳 — System Context & Architecture Guide (`context.md`)

> **Project Goal:** Multilingual, zero-friction civic welfare eligibility discovery platform. Citizens and CSC (Common Service Centre) village kiosk operators answer 4 simple questions and receive deterministic, verified government scheme eligibility, required documents, and a printable kiosk slip.
>
> ⚠️ **Key Architectural Constraint:** **NO AUTHENTICATION**. No user registration, no passwords, no login, no JWT tokens, and no Aadhaar OTP barriers. The entire workflow is anonymous, fast, and accessible.

---

## 📑 Table of Contents
1. [Platform Workflow & User Journeys](#1-platform-workflow--user-journeys)
2. [Frontend Component Architecture & Detailed Responsibilities](#2-frontend-component-architecture--detailed-responsibilities)
3. [Frontend Buttons & Exact Functional Specifications](#3-frontend-buttons--exact-functional-specifications)
4. [Database Design & Schema (No-Auth Architecture)](#4-database-design--schema-no-auth-architecture)
5. [Database Engineer: Exact Scope of Work & Deliverables](#5-database-engineer-exact-scope-of-work--deliverables)
6. [Backend Engineer: Exact Scope of Work & Deliverables](#6-backend-engineer-exact-scope-of-work--deliverables)
7. [Frontend ↔ Backend ↔ Database Integration Contract](#7-frontend--backend--database-integration-contract)

---

## 1. Platform Workflow & User Journeys

```
                    ┌────────────────────────────────────────┐
                    │               USER ARRIVES             │
                    │       (Citizen or CSC Operator)        │
                    └───────────────────┬────────────────────┘
                                        │
             ┌──────────────────────────┴──────────────────────────┐
             ▼                                                     ▼
┌─────────────────────────┐                             ┌─────────────────────────┐
│     DIRECT CHECK PATH   │                             │   EXPLORATION PATH      │
│  (Hero Section Console) │                             │   (Verified Schemes)    │
└────────────┬────────────┘                             └────────────┬────────────┘
             │                                                     │
             ▼                                                     ▼
┌─────────────────────────┐                             ┌─────────────────────────┐
│ Question 1: Land Status │                             │ Scheme Explorer Page    │
│ (Yes / No / Tenant)     │                             │ Search, Category Filter │
└────────────┬────────────┘                             └────────────┬────────────┘
             │                                                     │
             ▼                                                     │
┌─────────────────────────────────────────┐                        │
│ Guided Interview Modal (Steps 2 to 4)   │                        │
│ - Step 2: Income Tax Payer status       │                        │
│ - Step 3: Govt Employee/Pensioner       │                        │
│ - Step 4: House Type (Kutcha / Pucca)   │                        │
└────────────────────┬────────────────────┘                        │
                     │                                             │
                     ▼                                             │
┌─────────────────────────────────────────┐                        │
│ Review Answers Screen                   │                        │
│ (Allows editing any single step inline) │                        │
└────────────────────┬────────────────────┘                        │
                     │ User clicks "View Eligibility Results"      │
                     ▼                                             │
┌─────────────────────────────────────────┐                        │
│ Rule Evaluation Engine (Local/Backend)  │                        │
│ Compares answers against scheme criteria│                        │
└────────────────────┬────────────────────┘                        │
                     │                                             │
                     ▼                                             │
┌─────────────────────────────────────────┐                        │
│ Eligibility Results Screen              │                        │
│ - Scheme Qualified Count                │                        │
│ - Filter: All vs Eligible Schemes       │                        │
│ - Passed vs Failed vs Missing Rules     │                        │
└───────────┬───────────────────┬─────────┘                        │
            │                   │                                  │
            ▼                   ▼                                  ▼
┌──────────────────────┐ ┌────────────────────────────────────────────────────────┐
│ Print CSC Slip       │ │ Scheme Guide Page                                      │
│ Thermal receipt,     │ │ - Interactive Document Checklist                       │
│ Print, WhatsApp Share│ │ - Step-by-step Official Application Process            │
│                      │ │ - Link to official Govt Ministry Portal                │
└──────────────────────┘ └────────────────────────────────────────────────────────┘
```

### Flow Breakdown:
1. **Entry**: User lands on `Home.jsx`. No popup, no sign-in modal.
2. **Interactive Daylight Hook**: The Hero section itself presents **Question 1** (`has_cultivable_land`). Selecting an option instantly initializes the questionnaire state and moves to Step 2.
3. **Linear Interview**: User answers 3 subsequent questions (Tax, Govt job, House type). Voice read-aloud (TTS) and Numpad keyboard shortcuts (`1`, `2`, `3`) are available.
4. **Answer Audit**: Before running evaluation, user reviews their answers in `ReviewAnswers.jsx` and can jump back to change any answer.
5. **Evaluation**: Answers are evaluated against official government rules.
6. **Outcomes & Actionables**:
   - **Citizen**: Reads simple benefits and shares document checklist directly to WhatsApp.
   - **CSC Operator**: Hits "Print Slip" to print an official physical receipt for the villager.

---

## 2. Frontend Component Architecture & Detailed Responsibilities

| Component | File Path | Main Responsibility |
|---|---|---|
| **App** | `frontend/src/App.jsx` | Root state container. Manages active `screen`, `previousScreen`, `answers`, `results`, `selectedScheme`, and Lenis smooth scrolling. |
| **Navbar** | `components/layout/Navbar.jsx` | Sticky civic header with platform branding, "Verified Schemes" navigation link, and "Check Eligibility" primary CTA. |
| **Home** | `pages/Home.jsx` | Hero banner with integrated Question 1 interactive console, audio guide player, featured scheme cards, and household entitlement bento. |
| **HouseholdEntitlementBento** | `components/home/HouseholdEntitlementBento.jsx` | Interactive compound benefit visualizer displaying potential annual financial benefits (₹6,000 + ₹1.3L + ₹5L) with count-up animation. |
| **SpatialSchemeCard** | `components/home/SpatialSchemeCard.jsx` | 3D interactive tilt cards showing scheme highlights, ministry badge, and quick entry into eligibility testing. |
| **GuidedInterview** | `pages/GuidedInterview.jsx` | Step-by-step questionnaire wrapper with animated progress bar, step counter, back button, and kiosk numpad listeners. |
| **QuestionCard** | `components/questionnaire/QuestionCard.jsx` | Focus card for individual questions with clickable options, keyboard numbers (`1`, `2`, `3`), audio read-aloud button, and mic input trigger. |
| **ReviewAnswers** | `pages/ReviewAnswers.jsx` | Review screen holding `CheckAnswersTable`. |
| **CheckAnswersTable** | `components/review/CheckAnswersTable.jsx` | Table displaying each question, selected answer, "Change" button, and confirmation CTA. |
| **EligibilityResults** | `pages/EligibilityResults.jsx` | Results view displaying summary metrics, filter tabs ("All", "Eligible"), and list of `ResultCard` items. |
| **ResultCard** | `components/results/ResultCard.jsx` | Detailed result card showing scheme status badge (`Potentially Eligible`, `Needs Information`, `Not Eligible`), benefits, passed/failed rules, documents, and action buttons. |
| **RuleAuditTrace** | `components/results/RuleAuditTrace.jsx` | Collapsible developer/inspector audit box showing transparent rule matching logic and evaluation reasons. |
| **SchemeExplorer** | `pages/SchemeExplorer.jsx` | Full directory of verified schemes with live search, category filter chips (Farmer, Housing, Health), and cards. |
| **SchemeGuide** | `pages/SchemeGuide.jsx` | Detailed walkthrough for a chosen scheme including document checklist with interactive checkboxes and application steps. |
| **CscPrintSlip** | `components/results/CscPrintSlip.jsx` | Thermal receipt / CSC slip view. Printable (`@media print`), WhatsApp shareable, formatted with official reference code. |
| **Footer** | `components/layout/Footer.jsx` | Minimal footer with civic disclaimer, quick links, and sample slip button. |

---

## 3. Frontend Buttons & Exact Functional Specifications

Here is the exact behavior (*Kaise chahiye*) for every button across the application:

### 3.1. Navigation Bar (`Navbar.jsx`)
* **Brand Logo / Name ("SchemeSathi")**:
  - *Click Action:* Navigates back to `screen = 'home'`. Smoothly scrolls viewport to top (`window.scrollTo({ top: 0, behavior: 'smooth' })`).
* **"Verified Schemes" Button**:
  - *Click Action:* Navigates to `screen = 'explorer'`. Opens the searchable schemes directory.
  - *Active State:* Highlights with dark background when user is currently viewing the explorer.
* **"Check Eligibility" Button**:
  - *Click Action:* Resets or starts the questionnaire from Step 0 (`handleStartInterview({}, 0)`). Navigates to `screen = 'interview'`.

---

### 3.2. Home Page (`Home.jsx`)
* **Audio Guide Pill Button ("Audio Guide / Stop Audio")**:
  - *Click Action:* Starts/stops Web Speech API Text-to-Speech (TTS). Reads out bilingual welcome prompt explaining how to use SchemeSathi.
  - *Visual Behavior:* Animates oscillating equalizer bars when audio is playing.
* **Audio Language Switcher ("EN" / "HI")**:
  - *Click Action:* Switches audio accent and prompt language between English and Hindi.
* **Daylight Console Option Cards (Option 1: Yes, Option 2: No)**:
  - *Click Action:* User clicks either card. Updates `answers.has_land` with `{ value: true/false, label: '...' }`, plays subtle tactile transition, and moves user directly to `screen = 'interview'` at Step 2 (skipping Question 1 since it's already answered).
* **Keyboard Hotkeys (`1`, `2`, `Enter`)**:
  - Pressing `1` selects Yes; pressing `2` selects No; pressing `Enter` proceeds.
* **Scheme Cards "Check Eligibility →" Buttons**:
  - *Click Action:* Navigates to `screen = 'interview'` to test user eligibility for that specific scheme domain.
* **Scheme Cards "Official Portal" External Link (`ExternalLink` icon)**:
  - *Click Action:* Opens official government portal (e.g., `https://pmkisan.gov.in`) in a new tab (`target="_blank" rel="noreferrer"`).

---

### 3.3. Guided Interview Screen (`GuidedInterview.jsx` & `QuestionCard.jsx`)
* **"Back" Button (Top-Left)**:
  - *Click Action:* Decrements `currentStep` by 1. If at Step 0, returns user to `Home`.
* **Option Buttons (1, 2, 3 Keycap Buttons)**:
  - *Click Action:*
    1. Records user's answer into `answers[field] = { value, label }`.
    2. If `currentStep < totalQuestions - 1`: increments `currentStep` to advance to next question with a smooth slide transition.
    3. If `currentStep === totalQuestions - 1`: triggers `playSuccessChime()` and transitions `screen = 'review'`.
* **Question Audio Button ("Listen to question")**:
  - *Click Action:* Speaks out the current question prompt and options via browser speech synthesis.
* **Voice Simulation / Mic Button ("Tap to speak response")**:
  - *Click Action:* Toggles listening state. Simulates voice capture and automatically selects matching option for accessibility/demo.
* **CSC Operator Numpad / Keyboard Listener**:
  - Pressing keys `1`, `2`, or `3` directly selects option 1, 2, or 3 respectively without requiring mouse clicks.

---

### 3.4. Review Answers Screen (`CheckAnswersTable.jsx`)
* **"Change" Button (Per Question Row)**:
  - *Click Action:* Sets `interviewStep` to that specific question's index (0, 1, 2, or 3) and switches `screen = 'interview'`. Allows the user to modify an answer without losing other responses.
* **"Back to questions" Button**:
  - *Click Action:* Returns user to the last question step (Step 3) in `screen = 'interview'`.
* **"View Eligibility Results" Button**:
  - *Click Action:*
    1. Extracts answers profile: `{ has_cultivable_land, is_income_tax_payer, is_govt_employee_or_pensioner, house_type }`.
    2. Runs evaluation logic (local evaluation or triggers POST `/api/eligibility/evaluate`).
    3. Plays success chime.
    4. Sets `screen = 'results'`.

---

### 3.5. Eligibility Results Screen (`EligibilityResults.jsx` & `ResultCard.jsx`)
* **"Edit Answers" Button (Top Right)**:
  - *Click Action:* Navigates back to `screen = 'review'` so citizen can adjust their data.
* **Filter Tabs ("All Schemes" vs "Eligible")**:
  - *Click Action:* Filters displayed cards between all evaluated schemes and only schemes where `status === 'potentially_eligible'`.
* **"Print CSC Slip" Button (Inside Eligible ResultCard)**:
  - *Click Action:* Sets `selectedScheme = scheme`, sets `screen = 'slip'`, and loads the printable kiosk slip.
* **"Application Guide" Button**:
  - *Click Action:* Sets `selectedScheme = scheme`, sets `screen = 'guide'`, and displays the full checklist & procedure.
* **"View Rule Audit Trace" Accordion Toggle**:
  - *Click Action:* Expands/collapses the technical JSON audit showing exact rules passed, failed, and missing.
* **Official Website External Link**:
  - *Click Action:* Opens official government portal in a new tab.

---

### 3.6. Scheme Guide Screen (`SchemeGuide.jsx`)
* **"Back to Results" Button**:
  - *Click Action:* Invokes `handleSmartBack()`, returning user to `screen = 'results'` or `screen = 'explorer'`.
* **"View CSC Slip" Button**:
  - *Click Action:* Switches to `screen = 'slip'` for the current scheme.
* **Document Checkbox Items (`<input type="checkbox">`)**:
  - *Click Action:* Toggles checked/unchecked state for each required document so the user can verify what papers they currently possess.

---

### 3.7. CSC Print Slip Screen (`CscPrintSlip.jsx`)
* **"Back" Button**:
  - *Click Action:* Returns to previous screen.
* **"Print Slip" Button**:
  - *Click Action:* Triggers native browser print dialog `window.print()`. The page utilizes `@media print` CSS rules: header, footer, and buttons are hidden (`.no-print`), leaving only the clean 80mm/A4 thermal receipt.
* **"WhatsApp" Share Button**:
  - *Click Action:* Encodes scheme name, benefit amount, and required documents list into a `https://api.whatsapp.com/send?text=...` URI and opens WhatsApp in a new tab so the citizen has the list on their phone.

---

### 3.8. Scheme Explorer Screen (`SchemeExplorer.jsx`)
* **"Back to Home" Button**:
  - *Click Action:* Navigates to `screen = 'home'`.
* **Search Input & Clear**:
  - *Typing Action:* Real-time filter matching scheme name, ministry, or benefit keywords.
* **Category Filter Pills ("All", "Farmer Support", "Rural Housing", "Free Healthcare")**:
  - *Click Action:* Filters the directory cards by scheme domain.
* **"Check Eligibility" CTA**:
  - *Click Action:* Launches questionnaire interview directly.
* **Scheme Cards**:
  - *Click Action:* Opens `SchemeGuide.jsx` for the clicked scheme.

---

## 4. Database Design & Schema (No-Auth Architecture)

### 4.1. Architectural Philosophy: Why NO Authentication?
1. **Zero Friction for Rural Beneficiaries:** Beneficiaries and kiosk walk-ins must not be stopped by phone OTPs, passwords, or login walls.
2. **Privacy by Design:** No Personally Identifiable Information (PII) like full name, phone number, or Aadhaar number is saved to the database.
3. **Stateless Assessment:** Every eligibility check can run independently. Assessments can be recorded anonymously using a UUID session ID for analytical reporting.

### 4.2. Database Technology
* **Recommended Engine:** PostgreSQL 15+ (or SQLite 3 for local hackathon demo).
* **ORM / Query Builder:** Prisma, Drizzle ORM, SQLAlchemy, or raw SQL migrations.

### 4.3. Entity-Relationship (ER) Overview
```
┌─────────────────────────┐         ┌─────────────────────────┐
│         schemes         │1       *│      scheme_rules       │
│─────────────────────────│─────────│─────────────────────────│
│ id (PK, VARCHAR)        │         │ id (PK, VARCHAR)        │
│ name (VARCHAR)          │         │ scheme_id (FK)          │
│ english_name (VARCHAR)  │         │ field (VARCHAR)         │
│ ministry (VARCHAR)      │         │ operator (VARCHAR)      │
│ scope (VARCHAR)         │         │ target_value (VARCHAR)  │
│ benefit_summary (TEXT)  │         │ description (TEXT)      │
│ highlight_amount (TEXT) │         └─────────────────────────┘
│ official_url (VARCHAR)  │
│ is_active (BOOLEAN)     │         ┌─────────────────────────┐
└────────────┬────────────┘1       *│    scheme_documents     │
             ├──────────────────────│─────────────────────────│
             │                      │ id (PK, SERIAL)         │
             │                      │ scheme_id (FK)          │
             │                      │ document_name (VARCHAR) │
             │                      │ note (TEXT)             │
             │                      │ is_mandatory (BOOLEAN)  │
             │                      └─────────────────────────┘
             │
             │                      ┌─────────────────────────┐
             │1                    *│ scheme_application_steps│
             └──────────────────────│─────────────────────────│
                                    │ id (PK, SERIAL)         │
                                    │ scheme_id (FK)          │
                                    │ step_number (INT)       │
                                    │ instruction (TEXT)      │
                                    └─────────────────────────┘

┌─────────────────────────┐         ┌─────────────────────────┐
│  anonymous_assessments  │1       *│   assessment_results    │
│─────────────────────────│─────────│─────────────────────────│
│ id (PK, UUID)           │         │ id (PK, SERIAL)         │
│ answers_payload (JSONB) │         │ assessment_id (FK)      │
│ created_at (TIMESTAMP)  │         │ scheme_id (FK)          │
│ operator_mode (VARCHAR) │         │ status (VARCHAR)        │
│ ip_hash (VARCHAR)       │         │ passed_rules (JSONB)    │
└─────────────────────────┘         │ failed_rules (JSONB)    │
                                    └─────────────────────────┘
```

---

### 4.4. Complete DDL SQL Schema (Ready to Execute)

```sql
-- =================================================================
-- SchemeSathi DDL Schema (PostgreSQL 15+)
-- No Authentication Required
-- =================================================================

-- 1. SCHEMES MASTER TABLE
CREATE TABLE schemes (
    id VARCHAR(50) PRIMARY KEY,                  -- e.g., 'pm-kisan', 'pm-awas-gramin'
    name VARCHAR(255) NOT NULL,                  -- Localized or common name
    english_name VARCHAR(255) NOT NULL,          -- Standard English Name
    ministry VARCHAR(255) NOT NULL,              -- Sponsoring Ministry
    english_ministry VARCHAR(255),
    scope VARCHAR(50) DEFAULT 'Central Welfare', -- 'Central Welfare', 'State', etc.
    official_url VARCHAR(500) NOT NULL,          -- Official portal URL
    last_verified DATE NOT NULL DEFAULT CURRENT_DATE,
    highlight_amount VARCHAR(100),              -- e.g., '₹6,000'
    highlight_frequency VARCHAR(150),           -- e.g., 'per year in 3 installments'
    tag VARCHAR(100),                            -- e.g., 'Farmer Income Support'
    benefit_summary TEXT NOT NULL,
    english_benefit_summary TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. SCHEME ELIGIBILITY RULES TABLE (Deterministic Rule Engine)
CREATE TABLE scheme_rules (
    id VARCHAR(100) PRIMARY KEY,                 -- e.g., 'RULE_PMKISAN_LAND'
    scheme_id VARCHAR(50) NOT NULL REFERENCES schemes(id) ON DELETE CASCADE,
    field VARCHAR(100) NOT NULL,                 -- e.g., 'has_cultivable_land', 'is_income_tax_payer'
    operator VARCHAR(10) NOT NULL,               -- '==', '!=', '>=', '<=', 'IN'
    target_value VARCHAR(100) NOT NULL,          -- 'true', 'false', 'kutcha', '200000'
    description TEXT NOT NULL,                   -- Description for user / audit
    english_description TEXT,
    rule_order INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. SCHEME REQUIRED DOCUMENTS TABLE
CREATE TABLE scheme_documents (
    id SERIAL PRIMARY KEY,
    scheme_id VARCHAR(50) NOT NULL REFERENCES schemes(id) ON DELETE CASCADE,
    document_name VARCHAR(255) NOT NULL,         -- e.g., 'Aadhaar Card'
    note TEXT,                                   -- e.g., 'Name must match bank passbook'
    is_mandatory BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INT DEFAULT 1
);

-- 4. SCHEME APPLICATION PROCESS STEPS
CREATE TABLE scheme_application_steps (
    id SERIAL PRIMARY KEY,
    scheme_id VARCHAR(50) NOT NULL REFERENCES schemes(id) ON DELETE CASCADE,
    step_number INT NOT NULL,                    -- 1, 2, 3...
    instruction TEXT NOT NULL,
    portal_link VARCHAR(500)
);

-- 5. ANONYMOUS ASSESSMENT LOGS (For Kiosk analytics & statistics, Zero PII)
CREATE TABLE anonymous_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    answers_payload JSONB NOT NULL,              -- Full JSON: { has_cultivable_land: true, ... }
    mode VARCHAR(20) DEFAULT 'citizen',          -- 'citizen' or 'operator'
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. EVALUATION OUTCOME LOGS
CREATE TABLE assessment_results (
    id SERIAL PRIMARY KEY,
    assessment_id UUID NOT NULL REFERENCES anonymous_assessments(id) ON DELETE CASCADE,
    scheme_id VARCHAR(50) NOT NULL REFERENCES schemes(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,                 -- 'potentially_eligible', 'needs_information', 'not_eligible'
    passed_rules JSONB DEFAULT '[]'::jsonb,
    failed_rules JSONB DEFAULT '[]'::jsonb,
    missing_rules JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. PERFORMANCE INDEXES
CREATE INDEX idx_scheme_rules_scheme_id ON scheme_rules(scheme_id);
CREATE INDEX idx_scheme_docs_scheme_id ON scheme_documents(scheme_id);
CREATE INDEX idx_scheme_steps_scheme_id ON scheme_application_steps(scheme_id);
CREATE INDEX idx_assessments_created_at ON anonymous_assessments(created_at);
CREATE INDEX idx_results_status ON assessment_results(status);
```

---

## 5. Database Engineer: Exact Scope of Work & Deliverables

The **Database Guy** is responsible for database provisioning, schema deployment, seed data curation, and query optimization.

### 5.1. Task Checklist for Database Engineer
- [ ] **1. Setup Database Instance**:
  - Spin up PostgreSQL instance locally (via Docker / local Postgres) or cloud (Supabase / Neon / Render Postgres).
  - Create database named `schemesathi_db`.
- [ ] **2. Execute DDL Schema**:
  - Run the table creation scripts above. Ensure foreign keys and cascade rules work cleanly.
- [ ] **3. Populate Seed Data (`seed.sql`)**:
  - Insert all verified schemes, rules, documents, and application steps for MVP launch:
    1. **PM Kisan Samman Nidhi (`pm-kisan`)**
    2. **PM Awas Yojana Gramin (`pm-awas-gramin`)**
    3. **Ayushman Bharat PM-JAY (`pm-jay-ayushman`)**
    4. Optional: PM Ujjwala Yojana (`pm-ujjwala`), PM Mudra Yojana (`pm-mudra`).
- [ ] **4. Build Analytical Queries / Views**:
  - Create a view `view_active_schemes_summary` that joins schemes with their document counts and rule counts.
  - Create a summary query to calculate how many citizens checked eligibility today and top qualifying schemes.
- [ ] **5. Prepare Database Client & Connection String**:
  - Export standard connection URL:
    `DATABASE_URL=postgresql://user:password@localhost:5432/schemesathi_db`
  - Provide this to the Backend Engineer.

### 5.2. Verified Seed Script Sample (`seed.sql`)
```sql
-- Insert PM-KISAN
INSERT INTO schemes (id, name, english_name, ministry, english_ministry, scope, official_url, last_verified, highlight_amount, highlight_frequency, tag, benefit_summary, english_benefit_summary)
VALUES (
    'pm-kisan',
    'PM Kisan Samman Nidhi',
    'PM Kisan Samman Nidhi',
    'Ministry of Agriculture & Farmers Welfare',
    'Ministry of Agriculture & Farmers Welfare',
    'Central Welfare',
    'https://pmkisan.gov.in',
    '2026-11-01',
    '₹6,000',
    'per year (in 3 equal installments)',
    'Farmer Welfare',
    'Direct financial income support of ₹6,000 per year transferred via Direct Benefit Transfer (DBT) in 3 equal installments of ₹2,000 to eligible landholding farmer families.',
    'Direct financial income support of ₹6,000 per year transferred via Direct Benefit Transfer (DBT) in 3 equal installments of ₹2,000 to eligible landholding farmer families.'
);

-- Rules for PM-KISAN
INSERT INTO scheme_rules (id, scheme_id, field, operator, target_value, description, english_description) VALUES
('RULE_PMKISAN_LAND', 'pm-kisan', 'has_cultivable_land', '==', 'true', 'Family must own cultivable agricultural land in revenue records.', 'Family must own cultivable agricultural land in revenue records.'),
('RULE_PMKISAN_TAX', 'pm-kisan', 'is_income_tax_payer', '==', 'false', 'No family member should be an Income Tax payer.', 'No family member should be an Income Tax payer.'),
('RULE_PMKISAN_GOVT', 'pm-kisan', 'is_govt_employee_or_pensioner', '==', 'false', 'No family member in regular government service or receiving ₹10,000+ monthly pension.', 'No family member in regular government service or receiving ₹10,000+ monthly pension.');

-- Documents for PM-KISAN
INSERT INTO scheme_documents (scheme_id, document_name, note, is_mandatory) VALUES
('pm-kisan', 'Aadhaar Card', 'Name on Aadhaar must match bank passbook records.', true),
('pm-kisan', 'Bank Passbook', 'Account must be Aadhaar-seeded with active DBT.', true),
('pm-kisan', 'Land Revenue Record (Khasra / Khatauni)', 'Certified land title from Patwari or state land revenue portal.', true);

-- Application Steps for PM-KISAN
INSERT INTO scheme_application_steps (scheme_id, step_number, instruction) VALUES
('pm-kisan', 1, 'Visit your nearest Common Service Centre (CSC Kiosk) or open pmkisan.gov.in.'),
('pm-kisan', 2, 'Select "New Farmer Registration" and choose Rural or Urban Farmer category.'),
('pm-kisan', 3, 'Enter Aadhaar number and registered mobile number for OTP verification.'),
('pm-kisan', 4, 'Submit land survey/Khasra numbers and verified bank account details.'),
('pm-kisan', 5, 'Retain the generated acknowledgement receipt for tracking your DBT status.');
```

---

## 6. Backend Engineer: Exact Scope of Work & Deliverables

The **Backend Guy** is responsible for building the HTTP server, deterministic rule evaluation engine, and RESTful API endpoints that communicate with PostgreSQL and serve the React frontend.

### 6.1. Task Checklist for Backend Engineer
- [ ] **1. Project Setup**:
  - Initialize Node.js (Express / Fastify) or Python (FastAPI).
  - Configure CORS middleware (`cors({ origin: '*' })` or Vite origin `http://localhost:5173`).
  - Configure environment variables (`PORT=5000`, `DATABASE_URL`).
- [ ] **2. Database Connection**:
  - Connect to PostgreSQL using connection pool (`pg` or `asyncpg` or Prisma/Drizzle).
  - Implement health check route `GET /api/health`.
- [ ] **3. Implement REST Endpoints**:
  - `GET /api/schemes`: Returns list of all active schemes.
  - `GET /api/schemes/:id`: Returns scheme details, rules, documents, and steps.
  - `POST /api/eligibility/evaluate`: Accepts user responses payload, evaluates criteria, logs anonymous assessment, and returns results.
  - `GET /api/questions`: (Optional) Dynamically serves the 4 interview questions from DB or config.
- [ ] **4. Build Backend Deterministic Rule Engine**:
  - Write evaluation logic matching operators:
    - `==`: Direct equality (`Boolean` or `String`).
    - `>=`: Numeric comparison (`value >= rule.target_value`).
    - `<=`: Numeric comparison (`value <= rule.target_value`).
    - `IN`: Value exists in allowed set.
  - Classify outcome:
    - If any rule **fails** ➔ `not_eligible`.
    - If no rule fails but some rules are **missing/unknown** ➔ `needs_information`.
    - If all rules **pass** ➔ `potentially_eligible`.
- [ ] **5. Error Handling & Validation**:
  - Validate JSON payload with Pydantic or Zod.
  - Return clear HTTP error codes (`400 Bad Request`, `500 Internal Server Error`).

---

## 7. Frontend ↔ Backend ↔ Database Integration Contract

### 7.1. API Specification

#### Endpoint 1: Health Check
* **Route:** `GET /api/health`
* **Response:**
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2026-11-13T18:00:00Z"
}
```

---

#### Endpoint 2: Get All Schemes (Directory / Explorer)
* **Route:** `GET /api/schemes`
* **Query Parameters:** `?search=kisan&category=farmer` (optional)
* **Response (200 OK):**
```json
[
  {
    "id": "pm-kisan",
    "name": "PM Kisan Samman Nidhi",
    "englishName": "PM Kisan Samman Nidhi",
    "ministry": "Ministry of Agriculture & Farmers Welfare",
    "scope": "Central Welfare",
    "highlightAmount": "₹6,000",
    "highlightFrequency": "per year (in 3 equal installments)",
    "officialUrl": "https://pmkisan.gov.in",
    "lastVerified": "2026-11-01",
    "benefitSummary": "Direct financial income support of ₹6,000 per year...",
    "documentsCount": 3,
    "rulesCount": 3
  }
]
```

---

#### Endpoint 3: Evaluate Eligibility (Core Engine)
* **Route:** `POST /api/eligibility/evaluate`
* **Headers:** `Content-Type: application/json`
* **Request Body:**
```json
{
  "profile": {
    "has_cultivable_land": true,
    "is_income_tax_payer": false,
    "is_govt_employee_or_pensioner": false,
    "house_type": "kutcha"
  },
  "mode": "citizen"
}
```

* **Response (200 OK):**
```json
{
  "assessmentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "timestamp": "2026-11-13T18:05:00Z",
  "totalEvaluated": 3,
  "qualifiedCount": 2,
  "results": [
    {
      "schemeId": "pm-kisan",
      "schemeName": "PM Kisan Samman Nidhi",
      "englishName": "PM Kisan Samman Nidhi",
      "ministry": "Ministry of Agriculture & Farmers Welfare",
      "scope": "Central Welfare",
      "highlightAmount": "₹6,000",
      "highlightFrequency": "per year (in 3 equal installments)",
      "officialUrl": "https://pmkisan.gov.in",
      "lastVerified": "2026-11-01",
      "status": "potentially_eligible",
      "passed": [
        {
          "ruleId": "RULE_PMKISAN_LAND",
          "field": "has_cultivable_land",
          "description": "Family must own cultivable agricultural land in revenue records."
        },
        {
          "ruleId": "RULE_PMKISAN_TAX",
          "field": "is_income_tax_payer",
          "description": "No family member should be an Income Tax payer."
        },
        {
          "ruleId": "RULE_PMKISAN_GOVT",
          "field": "is_govt_employee_or_pensioner",
          "description": "No family member in regular government service."
        }
      ],
      "failed": [],
      "missing": [],
      "documents": [
        { "name": "Aadhaar Card", "note": "Must match bank passbook records." },
        { "name": "Bank Passbook", "note": "Account must be Aadhaar-seeded." },
        { "name": "Land Revenue Record (Khasra / Khatauni)", "note": "Certified land title." }
      ],
      "applicationSteps": [
        "Visit your nearest Common Service Centre (CSC Kiosk) or open pmkisan.gov.in.",
        "Select 'New Farmer Registration' and choose Rural or Urban Farmer category.",
        "Enter Aadhaar number and registered mobile number for OTP verification.",
        "Submit land survey/Khasra numbers and verified bank account details.",
        "Retain the generated acknowledgement receipt for tracking your DBT status."
      ]
    }
  ]
}
```

---

### 7.2. Summary of Responsibilities Matrix

| Requirement Area | Frontend Team | Backend Engineer | Database Engineer |
|---|---|---|---|
| **User Authentication** | ❌ None (No login screens) | ❌ None (No JWT/Auth middleware) | ❌ None (No `users` / `passwords` table) |
| **Questionnaire Flow** | Manages step transitions, Lenis scroll, TTS, and Numpad hotkeys | Serves question definitions (if dynamic) | Stores question registry metadata (optional) |
| **Eligibility Logic** | Client-side fallback via `evaluateEligibilityLocally` | Server-side authoritative evaluation via `POST /api/eligibility/evaluate` | Maintains verified rule criteria in `scheme_rules` |
| **Official Documentation** | Renders checklist with interactive checkboxes | Returns document checklist linked to scheme | Cures document guidelines in `scheme_documents` |
| **CSC Slip Generation** | Formats printable receipt & WhatsApp link | Generates assessment ID & returns payload | Stores anonymous assessment log |

---

*Document compiled for the SchemeSathi CodeSprint team. Keep this reference synchronized with all codebase commits.*
