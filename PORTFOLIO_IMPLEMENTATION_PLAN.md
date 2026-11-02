# 🏗️ NGUYEN QUOC MINH — Personal Engineering Portfolio
## Full Implementation Plan

> **Scope locked on:** 2026-11-02  
> **Built with:** HTML5 · CSS3 · Vanilla JavaScript · SVG · JSON  
> **Output location:** `C:\Users\Acer\Desktop\My carrer\My portfolio\`

---

## 🔍 PART 1 — PROJECT INVENTORY (Phase 1 Audit)

### Confirmed Projects (5 Featured)

| # | Project | Category | Status | Tech Stack | README Quality |
|---|---------|----------|--------|------------|---------------|
| 1 | **XNK Cashew Data Intelligence Platform** | Financial Engineering + Data | ✅ Production | Python, Playwright, OCR (pdfplumber/PaddleOCR), Chart.js, Leaflet, jsPDF, ExcelJS | ⭐⭐⭐⭐⭐ Excellent |
| 2 | **SEE Content Connector** | Automation + API Integration | ✅ Production | Node.js, Express, Next.js 14, React, TypeScript, Tailwind, PostgreSQL, Docker, Render | ⭐⭐⭐⭐⭐ Excellent |
| 3 | **SEE Notion** | Automation + Productivity | ✅ Production | Python, FastAPI, Discord.py, APScheduler, SQLite, GLM LLM, SMTP | ⭐⭐⭐⭐ Very Good |
| 4 | **AI Meeting Intelligence Assistant** | AI + Automation | ✅ Production | Python, FastAPI, Next.js, Groq Whisper STT, WebSocket, SQLite, Docker | ⭐⭐⭐⭐⭐ Excellent |
| 5 | **Job Web Scraping Pipeline** | Data Engineering + AI | 🔄 Active Dev | Python, Playwright, multi-layer NLP pipeline, PostgreSQL | ⭐⭐⭐⭐ Very Good |

### Technology Matrix

| Technology | Projects |
|-----------|---------|
| Python | XNK, SEE Notion, Speech-to-Text, Job Scraping |
| Node.js / JavaScript | SEE Content Connector, XNK (web dashboard) |
| TypeScript | SEE Content Connector frontend, Bot Survey |
| FastAPI | SEE Notion, Speech-to-Text |
| Next.js / React | SEE Content Connector, Speech-to-Text |
| Playwright | XNK, Job Scraping |
| PostgreSQL | SEE Content Connector, Job Scraping |
| SQLite | SEE Notion, Speech-to-Text |
| Docker / Render | SEE Content Connector, Speech-to-Text |
| Meta Graph API | SEE Content Connector |
| Notion API | SEE Notion |
| Discord API | SEE Notion |
| Groq / LLM | Speech-to-Text |
| OCR (PDFPlumber, PaddleOCR) | XNK |
| Chart.js / Leaflet | XNK |

### Engineering Statistics (Verified Estimates)

| Metric | Value |
|--------|-------|
| Featured Projects | 5 |
| APIs Integrated | 8+ (Meta, Notion, Discord, Groq, Playwright, TCHQ, LinkedIn, TikTok) |
| Languages Used | Python, TypeScript, JavaScript, SQL |
| OCR Records Processed | 757+ (Vinacas dataset) + custom TCHQ PDF pipeline |
| LLM Models Integrated | 4 (Whisper large-v3-turbo, Qwen, GPT-oss, Allam) |
| Data Periods Covered | 2020–2026 (XNK) |
| Lines of Code (approx.) | 50,000+ (source files only, excl. node_modules) |

---

## 🎨 PART 2 — DESIGN DECISIONS (Confirmed)

| Decision | Choice |
|----------|--------|
| **Default Theme** | Light mode with dark mode toggle |
| **Language** | Bilingual — English / Vietnamese toggle |
| **Navigation** | SPA with JS client-side routing (no full page reloads) |
| **Photo** | Professional headshot at `C:\Users\Acer\Desktop\CV\headshot.jpg` |
| **GitHub** | https://github.com/nguyenquocminhtrading-design |
| **LinkedIn** | https://www.linkedin.com/in/minh-nguyen-7a6789353/ |
| **Email** | nguyenquocminh.trading@gmail.com |
| **Deployment** | Local `file://` first (paths designed for easy GitHub Pages upgrade) |
| **GitHub links** | Optional — only shown when URL is provided in `projects.json` |
| **Architecture diagrams** | Inline SVG-based flowcharts |
| **Engineering stats** | Estimated from codebase, clearly labeled as approximate |

---

## 📁 PART 3 — FILE STRUCTURE

```
C:\Users\Acer\Desktop\My carrer\My portfolio\
│
├── index.html                    # SPA shell + router
├── README.md                     # Setup & add-project guide
│
├── assets/
│   ├── images/
│   │   ├── headshot.jpg          # Copied from CV folder
│   │   ├── logo.svg              # NQM monogram
│   │   └── projects/             # Per-project thumbnails/screenshots
│   ├── icons/                    # SVG icon set
│   └── diagrams/                 # SVG architecture diagrams per project
│
├── css/
│   ├── variables.css             # Design tokens (colors, spacing, type)
│   ├── reset.css                 # Normalize + base reset
│   ├── layout.css                # Grid, sidebar, main content area
│   ├── components.css            # Cards, badges, modals, buttons
│   ├── animations.css            # Scroll reveal, counters, transitions
│   ├── responsive.css            # Breakpoints: 1440 / 1024 / 768 / 375
│   └── themes.css                # Light/dark token overrides
│
├── js/
│   ├── app.js                    # Router + page bootstrapper
│   ├── navigation.js             # Sidebar state, active link, mobile toggle
│   ├── projects.js               # Load + render project cards & detail views
│   ├── filters.js                # Category filter, search, sort, grid/list toggle
│   ├── animations.js             # IntersectionObserver, counters, parallax
│   ├── theme.js                  # Light/dark toggle + persistence
│   ├── lang.js                   # EN/VI bilingual string switcher
│   └── utils.js                  # Toast, clipboard, helpers
│
├── data/
│   ├── projects.json             # All 5 projects (structured schema)
│   ├── technologies.json         # Tech badges + descriptions
│   ├── profile.json              # Name, bio, links, stats (EN + VI)
│   └── i18n.json                 # All UI strings in EN + VI
│
└── pages/
    ├── home.html                 # Hero + overview section template
    ├── projects.html             # Project explorer grid template
    ├── project-detail.html       # Individual project detail template
    ├── engineering-lab.html      # Experimental work section
    ├── finance-quant.html        # Financial engineering section
    ├── about.html                # About + contact section
    └── tech-stack.html           # Full technology showcase
```

---

## 📋 PART 4 — PROJECT DATA SCHEMA (`projects.json`)

Each project entry follows this schema:

```json
{
  "id": "xnk-cashew",
  "name": { "en": "XNK Cashew Intelligence Platform", "vi": "Nền Tảng Dữ Liệu XNK Hạt Điều" },
  "tagline": { "en": "...", "vi": "..." },
  "category": ["financial-engineering", "data-engineering", "automation"],
  "status": "production",
  "year": 2024,
  "thumbnail": "assets/images/projects/xnk-cashew.png",
  "github": null,
  "techStack": ["Python", "Playwright", "OCR", "Chart.js", "Leaflet"],
  "overview": { "en": "...", "vi": "..." },
  "problem": { "en": "...", "vi": "..." },
  "architecture": "assets/diagrams/xnk-cashew.svg",
  "features": [...],
  "workflow": [...],
  "challenges": [...],
  "results": [...],
  "future": [...]
}
```

---

## 🗺️ PART 5 — NAVIGATION MAP

```
┌─────────────────────────────────────────────┐
│  SIDEBAR (collapsible, icon rail on collapse)│
│  ──────────────────────────────────────────  │
│  [NQM Logo / Monogram]                       │
│                                              │
│  01  🏠  Overview                            │
│  02  🗂️  Projects                            │
│  03  🔬  Engineering Lab                     │
│  04  📊  Finance & Quant                     │
│  05  ⚡  Automation                          │
│  06  🛠️  Technology Stack                    │
│  07  👤  About                               │
│  08  📬  Contact                             │
│                                              │
│  ──────────────────────────────────────────  │
│  [🌙 Theme Toggle]  [⭐ GitHub]              │
│  [EN | VI]                                   │
└─────────────────────────────────────────────┘
```

---

## 🎯 PART 6 — SECTION CONTENT PLAN

### Section 01: Overview / Hero

| Element | Content |
|---------|---------|
| Headline | "Engineering Finance into Intelligent Systems." |
| Subheadline | "I design and build automation pipelines, financial systems, data-driven applications, and intelligent integrations that transform complex workflows into scalable solutions." |
| CTA Buttons | [Explore Projects] [View GitHub] |
| Hero Visual | Animated SVG showing interconnected pipeline: Data → Extract → Process → API → Output |
| Stats Counter | 5 Projects · 8+ APIs · 4 Languages · 50K+ Lines of Code |
| Featured Projects | 3 selected cards (XNK, SEE Content Connector, AI Meeting) |
| Tech Stack Strip | Scrolling logos/badges |

### Section 02: Projects Explorer

| Feature | Implementation |
|---------|---------------|
| View Toggle | Grid / List |
| Filters | All · Financial Engineering · Automation · Data Engineering · AI & ML · API Integration |
| Search | Real-time JS keyword match on name + tags + description |
| Sort | Newest · Oldest · Name A–Z |
| Cards | Thumbnail · Name · Tagline · Category badges · Status pill · Tech badges · [Details] [GitHub?] |

### Section 03: Project Detail Pages (per project)

Each detail page includes all 13 sections from the master prompt, rendered from `projects.json`:

1. Project Overview
2. Problem Statement
3. Business Objective
4. Technical Architecture (SVG diagram)
5. System Workflow (step-by-step visual)
6. Technology Stack (categorized badges)
7. Core Features (expandable cards)
8. Implementation Details (code snippets where appropriate)
9. Data Flow (visual pipeline)
10. Challenges & Solutions
11. Results & Achievements
12. Future Improvements
13. GitHub Repository (if provided)

### Section 04: Engineering Lab

Projects grouped by status:
- 🟢 **Production** — XNK, SEE Content Connector
- 🔵 **Completed** — SEE Notion, AI Meeting Assistant
- 🟡 **Active Development** — Job Scraping Pipeline

### Section 05: Finance & Quant

Focuses on XNK platform + financial modeling skills.  
Topics: Trade Balance Analytics, OCR Financial Extraction, Multi-source Data Reconciliation, Custom BI Dashboard.

### Section 06: About & Contact

- Professional bio (EN + VI)
- Skills matrix by domain
- GitHub, LinkedIn, Email
- Contact form (client-side, `mailto:` handler)

---

## 🎨 PART 7 — DESIGN SYSTEM

### Color Tokens

```css
/* Light Mode */
--color-bg-primary: #FFFFFF;
--color-bg-secondary: #F5F7FA;
--color-surface: #FFFFFF;
--color-border: #E1E6ED;
--color-text-primary: #172033;
--color-text-secondary: #64748B;
--color-accent: #4285F4;
--color-accent-dark: #174EA6;
--color-accent-deep: #102A56;
--color-accent-light: #DCEBFF;

/* Dark Mode */
--color-bg-primary: #0B1220;
--color-bg-secondary: #121D30;
--color-surface: #162038;
--color-border: #1E2D45;
--color-text-primary: #E8EEFA;
--color-text-secondary: #8FA3C0;
```

### Typography

```css
--font-primary: 'Google Sans', 'Inter', 'Roboto', Arial, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

--text-hero: clamp(2.5rem, 5vw, 4.5rem) / bold;
--text-h1: clamp(1.8rem, 3vw, 2.5rem) / semibold;
--text-h2: clamp(1.3rem, 2vw, 1.75rem) / semibold;
--text-body: 1rem / 1.6 / regular;
--text-small: 0.875rem / 1.5;
--text-code: 0.875rem / mono;
```

### Spacing & Layout

```css
--sidebar-width-expanded: 260px;
--sidebar-width-collapsed: 64px;
--content-max-width: 1280px;
--gap-section: 5rem;
--gap-card: 1.5rem;
--radius-card: 12px;
--radius-badge: 6px;
--shadow-card: 0 1px 4px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.06);
```

---

## ⚡ PART 8 — INTERACTIONS & ANIMATIONS

| Feature | Implementation |
|---------|---------------|
| Scroll Reveal | `IntersectionObserver` — fade + slide up on enter |
| Staggered Cards | CSS animation delay on `.project-card:nth-child(n)` |
| Animated Counters | JS counter from 0 to target on viewport enter |
| Sidebar Transition | CSS `width` + `opacity` transition, 300ms ease |
| Hover Elevation | `transform: translateY(-2px)` + shadow increase |
| Theme Switch | CSS class toggle on `<html>` + `localStorage` |
| Language Switch | `data-i18n` attribute lookup + JSON swap |
| Architecture Diagrams | SVG with CSS animation on hover/scroll |
| Toast Notifications | Slide-in from bottom-right, auto-dismiss 3s |
| Progress Bar | Scroll % indicator at top of page |
| Back to Top | Fade-in button after 400px scroll |
| Prefers-Reduced-Motion | All animations wrapped with `@media (prefers-reduced-motion: reduce)` |

---

## 🔨 PART 9 — EXECUTION PHASES

### ✅ Phase 1 — Repository Audit  `[COMPLETE — this document]`

- [x] Read all 5 READMEs
- [x] Inspect repository structures
- [x] Build project inventory
- [x] Identify technology matrix
- [x] Identify project statuses
- [x] Capture engineering statistics
- [x] Define content plan per project

### 🔲 Phase 2 — Design System

**Output:** `css/variables.css`, `css/reset.css`, `css/themes.css`  
Visual prototype of sidebar + card + hero layout.  
**Approval gate before Phase 3.**

### 🔲 Phase 3 — Frontend Foundation

**Output:** `index.html`, `css/layout.css`, `js/app.js`, `js/navigation.js`, `js/theme.js`, `js/lang.js`  
Working sidebar + routing + hero section + responsive layout.

### 🔲 Phase 4 — Project Data Engine

**Output:** `data/projects.json` (all 5 projects), `js/projects.js`, `js/filters.js`  
Fully functional project explorer with filtering, search, sorting.  
All project detail pages rendering from JSON.

### 🔲 Phase 5 — Advanced Interactions & SVG Diagrams

**Output:** `js/animations.js`, `assets/diagrams/` (5 SVG architecture diagrams)  
Counter animations, scroll reveal, hover states, toast system, dark mode.

### 🔲 Phase 6 — Quality Assurance

- All navigation links verified
- All project filters tested
- Search tested on all 5 projects
- Theme switching tested
- Sidebar: desktop expand/collapse + mobile hamburger
- Responsive at 1440 / 1024 / 768 / 375
- Console error check
- No broken images or missing assets

### 🔲 Phase 7 — Final Delivery

Deliver complete source + `README.md` with:
- Local setup instructions
- How to add a new project (JSON only, no HTML changes)
- Deployment instructions for GitHub Pages upgrade

---

## 📌 PART 10 — OPEN ITEMS & FLAGGED DECISIONS

> [!IMPORTANT]
> These items need resolution before or during Phase 4:

| # | Item | Status |
|---|------|--------|
| 1 | GitHub URLs for individual projects not yet provided | Pending — will show no GitHub button if absent |
| 2 | SEE Content Connector README contains `META_APP_SECRET` in plain text — **must NOT appear in portfolio** | ⚠️ Will be sanitized — only architecture info extracted |
| 3 | Project screenshots/thumbnails — none provided yet | Will use generated SVG placeholder thumbnails |
| 4 | `speech to text` README is in Vietnamese — English translation needed for EN portfolio mode | Will be translated via `i18n.json` |
| 5 | Bot Survey project was not selected — confirm exclusion | Excluded unless you say otherwise |
| 6 | `Job_web_scraping` has a `MASTER_PLAN.md` and `AI.md` — should classified as "In Progress" | ✅ Confirmed in Phase 1 |

---

## 📐 PART 11 — PER-PROJECT ARCHITECTURE DIAGRAMS

### XNK Cashew — Data Flow

```
TCHQ Website
    ↓ [Playwright scraper.py]
PDF Reports (2X/5X/2N/5N × SB/DC/CT)
    ↓ [ocr_pipeline.py: PDFPlumber + PaddleOCR]
Structured Tabular Data + Fallback Math
    ↓ [data_builder.py]
Master Excel Workbook (8 sheets) + JSON
    ↓ [serve_dashboard.py]
Web Dashboard (Chart.js + Leaflet + ExcelJS)
```

### SEE Content Connector — System Flow

```
OAuth 2.0 (Meta / TikTok / LinkedIn)
    ↓ [Self-Healing Token Engine]
Permanent Access Tokens (PostgreSQL)
    ↓ [Sync Worker: every 15 min]
Posts + Metrics (Reach, Impressions, Likes)
    ↓ [REST API: Express.js]
Next.js Dashboard (Recharts + Tailwind)
    → Top Viral Score Algorithm
    → Asset Detail Modal
    → Token Management UI
```

### SEE Notion — Bot Architecture

```
Discord Command (/task, /my)
    ↓ [discord_client.py]
NLP Parser → LLM (GLM / Ollama) → Validator
    ↓ [Confirmation Preview]
Notion API Gateway (rate-limit + retry)
    ↓ [APScheduler Cron: every 5 min]
Reminder Engine → Discord DM / Email (SMTP)
    ↓ [SQLite: audit_log + notification_log]
FastAPI REST (/api/v1/tasks + /api/v1/audit)
```

### AI Meeting Assistant — Processing Pipeline

```
Audio Input (Microphone / File Upload)
    ↓ [WebSocket ws://.../ws/live]
FastAPI Background Worker
    ↓ [Groq: whisper-large-v3-turbo]
Raw Transcript
    ↓ [LLM Diarization: Qwen / GPT-oss / Allam]
Speaker-Labeled Transcript
    ↓ [AI Report Generator]
Meeting Minutes + Action Items
    ↓ [SQLite Storage]
Next.js Frontend Dashboard
```

### Job Web Scraping Pipeline — Layer Architecture

```
Layer 1: Input (keywords.yaml + roles.yaml)
    ↓
Layer 2: Scraping (Playwright multi-source)
    ↓
Layer 3: NLP Processing (keyword match + scoring)
    ↓
Layer 4: Analytics (timeseries + flagged tracking)
    ↓
Layer 5: Output (PostgreSQL + exports + scheduler)
```

---

*Plan version 1.0 — Ready for Phase 2 execution upon approval.*
