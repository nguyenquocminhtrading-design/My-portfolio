MASTER IMPLEMENTATION PLAN: ENGINEERING PORTFOLIO REPOSITIONING & OPTIMIZATION

Target Positioning: Junior Business Process Automation Engineer
Core Statement: "I transform manual business and financial workflows into reliable, measurable, and maintainable automated systems."
Audience Alignment: C-Level / CFO (Business ROI) · HR / Talent Acquisition (Capabilities & Impact) · Engineering Managers (Architecture & Technical Rigor)

1. Visual Design & Theme System Overhaul
   1.1 Palette Alignment

Replace dark / neon / gaming aesthetic with corporate technology palette:

Primary background: Pure White (#FFFFFF)
Secondary background: Light Grey (#F1F3F5)
Card background: White (#FFFFFF)
Primary text: Deep Charcoal (#202938)
Secondary text: Slate Grey (#64748B)
Primary accent: Professional Blue (#2563EB)
Soft accent: Pale Blue (#DCEBFA)
Border: Light Grey (#E2E8F0)
Status / Verification: Muted Green (#16A34A), Amber (#D97706), Red (#DC2626)
1.2 Typography & Spacing
Font family: Inter / Clean sans-serif hierarchy (H1: 44–52px, H2: 30–36px, H3: 20–24px, Body: 15–16px).
Strict 8px spacing grid system with clean borders (1px solid #E2E8F0) and subtle elevation shadows (0 1px 3px rgba(0,0,0,0.05)).
Max-width container: 1240px centered. 2. Information Architecture (Single-Page Executive Flow)

Transition from separate tab routing to a Single-Page Scroll Dashboard with sidebar quick-jump anchor links and smooth scroll tracking:

Executive Hero Section (#overview)

Professional identity: Junior Business Process Automation Engineer (Finance-oriented).
Core Value Proposition: Cost reduction, error mitigation, hours saved, and auditable pipelines.
Executive Metrics Bar (e.g., Hours Saved/Month, Data Accuracy Rate, Integrated Workflows, Processed Transactions).
Direct Executive CTAs: Download CVs (Automation / Systems Analyst), Schedule Call, View Case Studies.

Core Competencies & Value Pillars (#capabilities)

Cross-Functional Bridge: Finance, Operations & IT integration.
Financial Workflow Automation: Reconciliations, invoice extraction, ledger sync, reporting bots.
Systems & Data Engineering: REST APIs, web scrapers, ETL pipelines, PostgreSQL/SQL, webhook handlers.
Reliability & Auditing: Idempotent runs, logging, retry policies, alert notifications, schema validation.

Executive Case Studies (#projects) — 3-Tier Layered Architecture

Tier 1 (Executive Summary): Business problem, manual bottleneck, quantifiable ROI (hours cut, error rate drop).
Tier 2 (Process & Functional Architecture): Before-and-after workflow diagram, data flow.
Tier 3 (Technical Rigor / Expandable): Tech stack, API specs, schema/database design, failover handling, GitHub / Live Demo links.

Engineering Lab & System Automation Demos (#lab)

Refactor current lab into interactive automation pipeline simulations (e.g., OCR extraction flow, financial reconciliation simulator, automated notification pipeline).

Operational Methodology & Quality Standards (#methodology)

Step-by-step automation delivery framework: Discover & Map Process → Design Architecture → Implement & Test → Deploy & Monitor.

Professional Background & Contact (#contact)

Clean, executive contact channels with direct links (LinkedIn, GitHub, Email, CV downloads). 3. Data & Content Updates (profile.json, projects.json, i18n.json)
data/profile.json:
Update title, bio, stats, and competency taxonomy to reflect Business Process Automation & Financial Engineering.
data/projects.json:
Re-frame all projects with executive metrics (Problem, Solution, Business Impact / ROI, Architecture, Tech Stack).
data/i18n.json:
Synchronize all new headers, value propositions, and metrics in both English and Vietnamese. 4. Execution Steps
Step 1: CSS & Tokens Overhaul (css/variables.css, themes.css, components.css)
Apply corporate palette tokens (#FFF, #202938, #2563EB, #F1F3F5, #E2E8F0).
Clean up card styling, typography, buttons, and badges.
Step 2: Update Core Data (profile.json, projects.json, i18n.json)
Reposition bio, titles, metrics, project descriptions with ROI & architecture focus in EN & VI.
Step 3: Refactor HTML Layout & Navigation (index.html)
Structure single-page sections with smooth anchor scrolling and active navigation indicators.
Implement the 3-Tier layered project display format.
Step 4: JavaScript Optimization (js/)
Update scroll spy navigation, smooth scrolling, modal/collapsible technical detail views.
Step 5: Quality Audit & Verification
Responsive check (Desktop, Tablet, Mobile).
Bilingual language toggle verification.
Visual inspection for clean corporate financial aestheti

# NQM Engineering Portfolio

**Nguyen Quoc Minh** — Automation Engineer | Financial Engineering | Full-stack Pipeline Builder

## 🚀 Quick Start

```powershell
# Navigate to the portfolio folder
cd "C:\Users\Acer\Desktop\My carrer\My portfolio"

# Start the local server (required — do NOT open index.html directly)
python -m http.server 8765

# Open in browser
start http://localhost:8765
```

> ⚠️ **Must use HTTP server.** Opening `index.html` directly via `file://` will fail because the browser blocks `fetch()` calls for local JSON files.

---

## 📁 Project Structure

```
My portfolio/
├── index.html              # SPA shell (single entry point)
├── README.md
│
├── assets/
│   ├── images/
│   │   ├── headshot.jpg    # Profile photo
│   │   └── projects/       # Optional project screenshots
│   ├── icons/
│   └── diagrams/
│
├── css/
│   ├── variables.css       # All design tokens (colors, spacing, fonts)
│   ├── reset.css           # Normalize + base styles
│   ├── themes.css          # Dark mode overrides
│   ├── layout.css          # Sidebar, main content, grid
│   ├── components.css      # Cards, buttons, badges, forms
│   ├── animations.css      # Scroll reveal, counters, parallax
│   └── responsive.css      # Breakpoints: 1440/1024/768/375px
│
├── js/
│   ├── app.js              # Main orchestrator, page renderers
│   ├── navigation.js       # Sidebar, routing, scroll
│   ├── projects.js         # Project card + detail page renderer
│   ├── filters.js          # Search, category filter, sort, view toggle
│   ├── animations.js       # IntersectionObserver, counters, parallax
│   ├── theme.js            # Dark/Light mode toggle
│   ├── lang.js             # EN/VI bilingual toggle
│   └── utils.js            # Toast, clipboard, sanitize, debounce
│
└── data/
    ├── projects.json       # All project data (edit here to add projects)
    ├── profile.json        # Personal info, stats, skills, social links
    └── i18n.json           # UI strings in English and Vietnamese
```

---

## ➕ Adding a New Project

1. Open `data/projects.json`
2. Add a new object to the `"projects"` array following this schema:

```json
{
  "id": "my-new-project",
  "name": { "en": "My New Project", "vi": "Dự Án Mới" },
  "tagline": { "en": "Short description", "vi": "Mô tả ngắn" },
  "category": ["automation", "data-engineering"],
  "status": "production",
  "year": 2025,
  "thumbnail": null,
  "github": "https://github.com/...",
  "techStack": ["Python", "FastAPI", "PostgreSQL"],
  "overview": { "en": "...", "vi": "..." },
  "problem": { "en": "...", "vi": "..." },
  "businessObjective": { "en": "...", "vi": "..." },
  "workflow": [{ "step": "Step Name", "desc": "Description" }],
  "features": [{ "title": "Feature", "desc": "Description" }],
  "challenges": [{ "title": "Challenge", "solution": "Solution" }],
  "results": ["Result 1", "Result 2"],
  "future": ["Future improvement 1"],
  "relatedProjects": ["xnk-cashew"]
}
```

3. **No other files need to be changed.** The project will appear automatically in:
   - Projects Explorer (with search/filter)
   - Engineering Lab (if `status: active`)
   - Finance & Quant (if category includes `financial-engineering`)
   - Automation (if category includes `automation`)

### Valid Category IDs

| ID                      | Label                 |
| ----------------------- | --------------------- |
| `financial-engineering` | Financial Engineering |
| `automation`            | Automation            |
| `data-engineering`      | Data Engineering      |
| `ai-ml`                 | AI & Machine Learning |
| `web-dev`               | Web Development       |
| `api-integration`       | API Integration       |

### Valid Status Values

| Value          | Badge           |
| -------------- | --------------- |
| `production`   | 🟢 Production   |
| `active`       | 🔵 Active Dev   |
| `completed`    | ⚫ Completed    |
| `experimental` | 🟡 Experimental |

---

## 🔧 Updating Profile Info

Edit `data/profile.json` to update:

- Name, title, bio (EN + VI)
- GitHub, LinkedIn, email links
- Stats counters (projects, APIs, lines of code, years)
- Skills list

---

## 🌐 Deployment (GitHub Pages)

1. Push the portfolio folder to a GitHub repository
2. Go to Settings → Pages → Deploy from branch → `main` → `/root`
3. Your portfolio will be live at `https://yourusername.github.io/repo-name/`

> Note: All paths are relative, so GitHub Pages deployment works without changes.

---

## 🛠️ Tech Stack

| Layer      | Technology                           |
| ---------- | ------------------------------------ |
| HTML       | Semantic HTML5, SPA routing          |
| CSS        | Custom properties, CSS Grid, Flexbox |
| JavaScript | Vanilla ES6+, no frameworks          |
| Data       | JSON files (projects, profile, i18n) |
| Fonts      | Inter via Google Fonts               |

---

## ✅ Features Implemented

- [x] Collapsible sidebar with icon-rail collapse
- [x] Mobile hamburger navigation
- [x] Light/Dark mode toggle with persistence
- [x] EN/VI bilingual toggle
- [x] SPA routing (no page reloads)
- [x] Project Explorer with grid/list view
- [x] Real-time search across all projects
- [x] Category filter chips
- [x] Sort (Newest / Oldest / A-Z)
- [x] Project Detail page with full content
- [x] SVG architecture diagrams per project
- [x] Workflow step visualization
- [x] Expandable challenges/solutions accordion
- [x] Scroll reveal animations
- [x] Animated counters
- [x] Parallax hero blobs
- [x] Scroll progress bar
- [x] Back-to-top button
- [x] Toast notification system
- [x] Responsive: 1440 / 1024 / 768 / 375px
- [x] prefers-reduced-motion support
- [x] XSS-safe dynamic rendering
- [x] No credentials or private paths exposed

---

_Portfolio v1.0 — Nguyen Quoc Minh_
