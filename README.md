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
