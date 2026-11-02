# NQM Engineering Portfolio

**Nguyen Quoc Minh** — Automation Engineer | Financial Engineering | Full-stack Pipeline Builder  
*Portfolio URL (Live / Local):* `http://localhost:8765`  
*GitHub:* [https://github.com/nguyenquocminhtrading-design](https://github.com/nguyenquocminhtrading-design)  
*LinkedIn:* [https://www.linkedin.com/in/minh-nguyen-7a6789353/](https://www.linkedin.com/in/minh-nguyen-7a6789353/)

---

## 🚀 Quick Start (Local Setup)

```powershell
# Navigate to the portfolio project directory
cd "My portfolio"

# Start the local development server (HTTP server required for fetch() JSON requests)
python -m http.server 8765

# Open in your default browser
start http://localhost:8765
```

> ⚠️ **Note:** Do NOT double-click `index.html` via `file://`. Modern browsers block local asynchronous data loading (`fetch()`) when not served over HTTP.

---

## 📁 Repository Structure

```
My portfolio/
├── index.html              # Core SPA shell & router
├── README.md               # Architecture documentation & setup guide
│
├── assets/
│   ├── cv/                 # Downloadable tailored resume PDFs
│   │   ├── Nguyen_Quoc_Minh_Financial_Analyst_CV.pdf
│   │   ├── Nguyen_Quoc_Minh_Data_Analyst_CV.pdf
│   │   └── Nguyen_Quoc_Minh_Business_Analyst_CV.pdf
│   ├── images/
│   │   ├── headshot.jpg    # Verified headshot
│   │   └── projects/       # Verified project UI & output screenshots
│   │       ├── xnk-cashew-overview.png
│   │       ├── xnk-cashew-trends.png
│   │       ├── xnk-cashew-map.png
│   │       └── xnk-cashew-export.png
│   ├── icons/
│   └── diagrams/           # SVG architecture assets
│
├── css/
│   ├── variables.css       # Central design tokens (palette, typography, spacing)
│   ├── reset.css           # Modern CSS reset & accessibility
│   ├── themes.css          # Dark / Light theme token definitions
│   ├── layout.css          # Collapsible sidebar, mobile header, grid systems
│   ├── components.css      # Bento cards, macOS windows, border-beams, badges
│   ├── animations.css      # Pulse packets, particle glows, counters
│   └── responsive.css      # Responsive breakpoints (1440 / 1024 / 768 / 375px)
│
├── js/
│   ├── app.js              # Application bootstrapper & page lifecycle
│   ├── navigation.js       # Client routing, hash updates, CV modal, ESC handler
│   ├── projects.js         # Project card & detail renderer with evidence tabs
│   ├── terminal.js         # Interactive pipeline simulation sandbox (Dry-run)
│   ├── filters.js          # Live keyword search, category filter & sort engine
│   ├── animations.js       # IntersectionObserver, counters, particle flows
│   ├── theme.js            # Dark/Light mode persistence (localStorage)
│   ├── lang.js             # Bilingual switcher (EN / VI)
│   └── utils.js            # Toast notifications, clipboard helpers, sanitization
│
└── data/
    ├── projects.json       # Source of truth: 6 verified engineering projects
    ├── profile.json        # Bio, verified quantitative metrics, and CV catalog
    └── i18n.json           # Complete UI localization strings (EN + VI)
```

---

## 📊 Verified Engineering Metrics (Evidence-Driven)

All headline metrics on the portfolio are grounded in actual codebase facts:
- **6 Featured Systems:** 
  1. *XNK Cashew Data Platform* (Playwright + OCR + 6 Export Formats + Leaflet)
  2. *SEE Content Connector* (Meta Graph API + Permanent Token Engine + Next.js)
  3. *SEE Notion Bot* (Discord.py + FastAPI + APScheduler + GLM LLM)
  4. *AI Meeting Intelligence Assistant* (Groq Whisper + LLM Diarization + Next.js)
  5. *Dragon Capital Fund Analytics* (Selenium + PyTorch GPU Monte Carlo + Parquet)
  6. *Job Market Scraping Pipeline* (5-layer NLP + Playwright + 26K taxonomies)
- **10+ External APIs & Protocols:** Meta Graph, Notion, Discord, Groq Whisper, Telegram, Selenium, Playwright, Leaflet, PostgreSQL, SQLite.
- **84 Months Ingested:** Continuous trade dataset spanning 2020 through 2026.
- **50,000+ Lines of Production Code:** Verified across active Python, TypeScript, JavaScript, and SQL source files (excluding node_modules and vendor files).

---

## ➕ Adding a New Project

Adding another project requires **no HTML/CSS modifications**. Simply append an entry to `data/projects.json`:

```json
{
  "id": "new-pipeline-id",
  "name": { "en": "System Name", "vi": "Tên Hệ Thống" },
  "tagline": { "en": "High impact summary", "vi": "Mô tả giá trị" },
  "category": ["financial-engineering", "automation"],
  "status": "production",
  "year": 2025,
  "thumbnail": "assets/images/projects/your-screenshot.png",
  "github": "https://github.com/...",
  "techStack": ["Python", "FastAPI", "PostgreSQL"],
  "cliCommand": "python run.py --execute",
  "actualArtifacts": [
    "output/report.xlsx (Generated workbook)",
    "data/output.parquet (High-speed database)"
  ],
  "overview": { "en": "...", "vi": "..." },
  "problem": { "en": "...", "vi": "..." },
  "businessObjective": { "en": "...", "vi": "..." }
}
```

The system will dynamically populate the **Project Explorer**, **Category Filters**, **Search Index**, **Detailed Architecture View**, and **Codebase Inspector**.

---

## 🌐 Production Deployment (GitHub Pages)

To publish this portfolio live:
```powershell
git init
git add .
git commit -m "feat: complete evidence-driven personal engineering portfolio"
git branch -M main
git remote add origin https://github.com/nguyenquocminhtrading-design/portfolio.git
git push -u origin main
```
In your GitHub Repository:
1. Navigate to **Settings** → **Pages**.
2. Select **Branch: main** → **/ (root)**.
3. Click **Save**. The portfolio will be available at `https://nguyenquocminhtrading-design.github.io/portfolio/`.

---

*Author: Nguyen Quoc Minh (Automation Engineer · Financial Engineering · Full-stack Pipeline Builder)*
