/* app.js — Main application orchestrator */

const TECH_CATEGORIES = [
  {
    name: { en: 'Programming Languages', vi: 'Ngôn Ngữ Lập Trình' },
    items: [
      { name: 'Python (Pandas/Async)', tier: 1, bg: '#3776AB22', color: '#3776AB', abbr: 'Py' },
      { name: 'SQL (PostgreSQL/SQLite)', tier: 1, bg: '#336A9122', color: '#336A91', abbr: 'SQL', small: true },
      { name: 'JavaScript / TypeScript', tier: 2, bg: '#3178C622', color: '#3178C6', abbr: 'TS' },
      { name: 'HTML5 & Modern CSS', tier: 2, bg: '#E3430022', color: '#E34300', abbr: 'H/C' }
    ]
  },
  {
    name: { en: 'Automation & Integration', vi: 'Tự Động Hóa & Tích Hợp Hệ Thống' },
    items: [
      { name: 'REST APIs & Webhooks', tier: 1, bg: '#4285F422', color: '#4285F4', abbr: 'API' },
      { name: 'OAuth 2.0 Self-Healing', tier: 1, bg: '#2563EB22', color: '#2563EB', abbr: 'Auth' },
      { name: 'Playwright & Selenium RPA', tier: 1, bg: '#2EAD3322', color: '#2EAD33', abbr: 'RPA' },
      { name: 'APScheduler & Task Cron', tier: 1, bg: '#F59E0B22', color: '#F59E0B', abbr: 'Cron' },
      { name: 'n8n Workflow Engine', tier: 2, bg: '#EA580C22', color: '#EA580C', abbr: 'n8n' },
      { name: 'Telegram & Discord Bots', tier: 1, bg: '#0284C722', color: '#0284C7', abbr: 'Bot' }
    ]
  },
  {
    name: { en: 'Data Engineering & Document OCR', vi: 'Kỹ Thuật Dữ Liệu & Bóc Tách OCR' },
    items: [
      { name: 'OCR (PaddleOCR/pdfplumber)', tier: 1, bg: '#9333EA22', color: '#9333EA', abbr: 'OCR' },
      { name: 'ETL Pipelines & Ingestion', tier: 1, bg: '#15005922', color: '#4F3CDB', abbr: 'ETL' },
      { name: 'PostgreSQL Database Modeling', tier: 1, bg: '#33699922', color: '#336699', abbr: 'PG' },
      { name: 'Apache Parquet & SQLite', tier: 1, bg: '#E2552222', color: '#E25522', abbr: 'PQ' },
      { name: 'Groq & Whisper AI Speech-to-Text', tier: 2, bg: '#F97C4422', color: '#F97C44', abbr: 'STT' }
    ]
  },
  {
    name: { en: 'Finance Systems & Quant', vi: 'Hệ Thống Tài Chính & Phân Tích' },
    items: [
      { name: 'Financial Reconciliation Logic', tier: 1, bg: '#16A34A22', color: '#16A34A', abbr: 'Rec' },
      { name: 'NAV & Multi-currency Calculations', tier: 1, bg: '#0D948822', color: '#0D9488', abbr: 'NAV' },
      { name: 'Sharpe & Drawdown Risk Models', tier: 1, bg: '#2563EB22', color: '#2563EB', abbr: 'Risk' },
      { name: 'GPU Monte Carlo Simulations', tier: 2, bg: '#EE440022', color: '#EE4400', abbr: 'MC' }
    ]
  },
  {
    name: { en: 'Backend, DevOps & Governance', vi: 'Backend, DevOps & Quản Trị Hệ Thống' },
    items: [
      { name: 'FastAPI Microservices', tier: 1, bg: '#00978522', color: '#009785', abbr: 'FA' },
      { name: 'Node.js & Express API Gateway', tier: 1, bg: '#33993322', color: '#339933', abbr: 'Node' },
      { name: 'Structured Audit Logs & Alerts', tier: 1, bg: '#DC262622', color: '#DC2626', abbr: 'Log' },
      { name: 'Docker Containerization', tier: 2, bg: '#2496ED22', color: '#2496ED', abbr: 'Dock' },
      { name: 'Git & GitHub Actions CI/CD', tier: 2, bg: '#18181822', color: '#666', abbr: 'CI' },
      { name: 'Next.js & Chart.js BI Dashboards', tier: 2, bg: '#61DAFB22', color: '#0284C7', abbr: 'BI' }
    ]
  }
];

const App = {
  profile: null,
  i18n: null,

  async init() {
    try {
      // Load data
      const [profileRes, projectsRes, i18nRes] = await Promise.all([
        fetch('data/profile.json'),
        fetch('data/projects.json'),
        fetch('data/i18n.json')
      ]);

      this.profile = await profileRes.json();
      const projectsData = await projectsRes.json();
      this.i18n = await i18nRes.json();

      // Make i18n global
      window.I18N = this.i18n;

      // Init projects
      Projects.init(projectsData.projects);

      // Init all modules
      Theme.init();
      Lang.init();
      Navigation.init();
      Filters.init();
      Animations.init();
      if (window.Terminal) Terminal.init();

      // Render initial content
      this.renderHome();
      this.renderAbout();
      this.renderContact();

      // Initial page render
      this.onPageShow('home');

    } catch (err) {
      console.error('App init error:', err);
      document.body.innerHTML += `<div style="position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#EF4444;color:white;padding:12px 24px;border-radius:8px;z-index:9999;font-size:14px;">⚠️ Failed to load data. Please use a local HTTP server (not file://).</div>`;
    }
  },

  onPageShow(page) {
    switch(page) {
      case 'home':       this.renderHome();           break;
      case 'projects':   this.renderProjectsPage();   break;
      case 'lab':        this.renderLabPage();         break;
      case 'finance':    this.renderFinancePage();     break;
      case 'automation': this.renderAutomationPage();  break;
      case 'tech':       this.renderTechPage();        break;
      case 'about':      this.renderAbout();           break;
      case 'contact':    this.renderContact();         break;
    }
    if (window.Animations) setTimeout(() => Animations.observeReveal(), 50);
    if (window.Lang) Lang.applyAll();
  },

  rerenderCurrent() {
    const current = Navigation.currentPage;
    this.onPageShow(current);
    if (current === 'projects') Filters.refresh();
    if (current === 'project-detail') {
      const hash = window.location.hash || '';
      const projId = hash.replace('#project-', '');
      if (projId && window.Projects) {
        Projects.renderDetail(projId);
      }
    }
  },

  /* ── HOME ──────────────────────────────────────────────── */
  renderHome() {
    this._renderHeroStats();
    this._renderFeaturedProjects();
    this._renderStatsGrid();
    this._renderTechStrip();
  },

  _renderHeroStats() {
    const container = document.getElementById('hero-stats');
    if (!container || !this.profile) return;
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    container.innerHTML = this.profile.stats.map(s => `
      <div style="display:flex;flex-direction:column;gap:4px;">
        <span style="font-size:clamp(1.8rem,3vw,2.5rem);font-weight:800;color:white;line-height:1;"
              class="counter-value" data-count="${s.value}" data-suffix="${s.suffix}">
          0${s.suffix}
        </span>
        <span style="font-size:var(--text-xs);color:rgba(255,255,255,0.55);font-weight:500;text-transform:uppercase;letter-spacing:0.08em;">
          ${s.label[lang] || s.label.en}
        </span>
      </div>`).join('');
    if (window.Animations) setTimeout(() => Animations.observeReveal(), 100);
  },

  _renderFeaturedProjects() {
    const container = document.getElementById('featured-projects');
    if (!container) return;
    const featured = Projects.data.slice(0, 3);
    Projects.renderList('featured-projects', featured);
    setTimeout(() => Animations.staggerCards('featured-projects'), 100);
  },

  _renderStatsGrid() {
    const container = document.getElementById('stats-grid');
    if (!container || !this.profile) return;
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    const icons = [
      `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
      `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>`,
      `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
    ];
    container.innerHTML = this.profile.stats.map((s, i) => `
      <div class="stat-card reveal" style="transition-delay:${i * 0.1}s">
        <div class="stat-icon">${icons[i] || icons[0]}</div>
        <div class="stat-number counter-value" data-count="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</div>
        <div class="stat-label">${s.label[lang] || s.label.en}</div>
      </div>`).join('');
    if (window.Animations) setTimeout(() => Animations.observeReveal(), 50);
  },

  _renderTechStrip() {
    const container = document.getElementById('tech-strip');
    if (!container) return;
    const allTech = TECH_CATEGORIES.flatMap(cat => cat.items);
    container.innerHTML = allTech.map(t => `
      <span class="tech-tag hover-lift" style="font-size:var(--text-sm);padding:6px 14px;">${t.name}</span>`).join('');
  },

  /* ── PROJECTS PAGE ──────────────────────────────────────── */
  renderProjectsPage() {
    Filters.apply();
    setTimeout(() => Animations.staggerCards('projects-grid'), 100);
  },

  /* ── LAB PAGE ───────────────────────────────────────────── */
  renderLabPage() {
    const labProjects = Projects.data.filter(p => ['active', 'experimental'].includes(p.status));
    Projects.renderList('lab-projects', labProjects);
    setTimeout(() => Animations.staggerCards('lab-projects'), 100);
  },

  /* ── FINANCE PAGE ───────────────────────────────────────── */
  renderFinancePage() {
    const finProjects = Projects.data.filter(p => (p.category||[]).includes('financial-engineering'));
    Projects.renderList('finance-projects', finProjects);
    setTimeout(() => Animations.staggerCards('finance-projects'), 100);
  },

  /* ── AUTOMATION PAGE ────────────────────────────────────── */
  renderAutomationPage() {
    const autoProjects = Projects.data.filter(p => (p.category||[]).includes('automation'));
    Projects.renderList('automation-projects', autoProjects);
    setTimeout(() => Animations.staggerCards('automation-projects'), 100);
  },

  /* ── TECH STACK PAGE ────────────────────────────────────── */
  renderTechPage() {
    const container = document.getElementById('tech-full-grid');
    if (!container) return;
    const lang = document.documentElement.getAttribute('data-lang') || 'en';

    // Tier Badges Legend
    const legendHTML = `
      <div style="background:var(--color-bg-secondary);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:var(--space-4);margin-bottom:var(--space-6);display:flex;gap:var(--space-4);flex-wrap:wrap;align-items:center;">
        <span style="font-size:12px;font-weight:700;color:var(--color-text-secondary);text-transform:uppercase;">Proficiency Levels:</span>
        <span class="badge" style="background:#16A34A20;color:#16A34A;border:1px solid #16A34A40;">
          ● Tier 1 — Production-Ready (Immediate execution, zero warm-up)
        </span>
        <span class="badge" style="background:#D9770620;color:#D97706;border:1px solid #D9770640;">
          ○ Tier 2 — Working Knowledge (Solid implementation, edge-case docs)
        </span>
        <span class="badge" style="background:var(--color-bg-tertiary);color:var(--color-text-muted);border:1px solid var(--color-border);">
          ◇ Tier 3 — Exploring (Active research & lab experiments)
        </span>
      </div>
    `;

    const groupsHTML = TECH_CATEGORIES.map((cat, ci) => {
      const catTitle = typeof cat.name === 'object' ? (cat.name[lang] || cat.name.en) : cat.name;
      return `
      <div class="reveal" style="transition-delay:${ci * 0.08}s;margin-bottom:var(--space-6);">
        <h3 style="font-size:var(--text-lg);font-weight:var(--fw-semibold);color:var(--color-text-primary);margin-bottom:var(--space-3);display:flex;align-items:center;gap:8px;">
          <span>${catTitle}</span>
        </h3>
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-3);">
          ${cat.items.map(t => {
            const tierBadge = t.tier === 1 
              ? `<span style="font-size:9.5px;padding:2px 6px;border-radius:4px;background:#16A34A22;color:#16A34A;font-weight:700;border:1px solid #16A34A44;">Production</span>`
              : `<span style="font-size:9.5px;padding:2px 6px;border-radius:4px;background:#D9770622;color:#D97706;font-weight:600;border:1px solid #D9770644;">Working</span>`;

            return `
            <div class="tech-item" style="border:1px solid var(--color-border);background:var(--color-surface);padding:8px 12px;border-radius:var(--radius-md);display:flex;align-items:center;gap:10px;">
              <div class="tech-item-icon" style="background:${t.bg};color:${t.color};width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:6px;">
                <span style="font-size:${t.small ? '10px' : '11px'};font-weight:700;">${t.abbr}</span>
              </div>
              <div>
                <div class="tech-item-name" style="font-size:13px;font-weight:600;margin-bottom:2px;">${t.name}</div>
                ${tierBadge}
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>`;
    }).join('');

    container.innerHTML = legendHTML + groupsHTML;
    if (window.Animations) setTimeout(() => Animations.observeReveal(), 50);
  },

  /* ── ABOUT PAGE ─────────────────────────────────────────── */
  renderAbout() {
    const container = document.getElementById('about-content');
    if (!container || !this.profile) return;
    const lang = document.documentElement.getAttribute('data-lang') || 'en';

    const skillsHTML = this.profile.skills.map(s => `
      <div class="skill-item">
        <div class="skill-dot"></div>
        <span class="skill-name">${Utils.sanitize(s.name)}</span>
      </div>`).join('');

    container.innerHTML = `
      <div class="section-heading reveal">
        <div class="section-label" data-i18n="about_label">Background</div>
        <h1 class="section-title" data-i18n="about_title">About Me</h1>
      </div>

      <div class="about-grid">
        <div class="about-photo-wrapper reveal-left">
          <div class="about-photo">
            <img src="${this.profile.photo}" alt="${this.profile.name[lang] || this.profile.name.en}" loading="lazy"
                 onerror="this.parentElement.style.background='linear-gradient(135deg,var(--color-brand-deep),var(--color-brand-dark))';this.remove();" />
          </div>
          <div style="margin-top:var(--space-4);display:flex;flex-direction:column;gap:var(--space-2);">
            <a href="${this.profile.github}" target="_blank" rel="noopener" class="contact-card" style="padding:var(--space-3) var(--space-4);">
              <div class="contact-icon" style="background:#18181820;color:#333;width:36px;height:36px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </div>
              <div><div class="contact-title">GitHub</div><div class="contact-value" style="font-size:11px;">@nguyenquocminhtrading-design</div></div>
            </a>
          </div>
        </div>

        <div class="reveal-right">
          <div style="margin-bottom:var(--space-8);">
            <h2 style="font-size:var(--text-3xl);font-weight:var(--fw-bold);color:var(--color-text-primary);margin-bottom:var(--space-2);">${this.profile.name[lang] || this.profile.name.en}</h2>
            <p style="font-size:var(--text-base);color:var(--color-accent);font-weight:var(--fw-medium);margin-bottom:var(--space-5);">${this.profile.title[lang] || this.profile.title.en}</p>
            <p style="font-size:var(--text-base);color:var(--color-text-secondary);line-height:var(--leading-relaxed);">${this.profile.bio[lang] || this.profile.bio.en}</p>
          </div>

          <div>
            <div class="section-label" style="margin-bottom:var(--space-4);" data-i18n="about_skills">Core Competencies</div>
            <div class="skills-grid">${skillsHTML}</div>
          </div>
        </div>
      </div>`;
    if (window.Animations) setTimeout(() => Animations.observeReveal(), 50);
    if (window.Lang) Lang.applyAll();
  },

  /* ── CONTACT PAGE ───────────────────────────────────────── */
  renderContact() {
    const container = document.getElementById('contact-cards');
    if (!container || !this.profile) return;
    const lang = document.documentElement.getAttribute('data-lang') || 'en';

    container.innerHTML = `
      <!-- Availability & Response Expectations Badge -->
      <div style="background:var(--color-bg-secondary);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:var(--space-5);margin-bottom:var(--space-4);">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:var(--space-2);">
          <span style="width:10px;height:10px;background:#16A34A;border-radius:50%;box-shadow:0 0 10px #16A34A;display:inline-block;"></span>
          <span style="font-weight:700;font-size:var(--text-sm);color:var(--color-text-primary);">
            ${lang === 'vi' ? 'Đang sẵn sàng nhận việc · Toàn thời gian / Hợp đồng' : 'Open to Roles · Full-time / Contract'}
          </span>
        </div>
        <p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 8px 0;line-height:1.5;">
          ${lang === 'vi' ? '⏱ Thường phản hồi trong vòng 24 giờ. Ưu tiên liên hệ qua LinkedIn Direct Message hoặc Email.' : '⏱ Typically reply within 24 hours. Preferred contact via LinkedIn DM or Email.'}
        </p>
        <div style="display:flex;gap:var(--space-4);flex-wrap:wrap;font-size:12px;color:var(--color-text-muted);">
          <span>📍 Ho Chi Minh City, GMT+7</span>
          <span>🗣 Vietnamese (Native) · English (Professional)</span>
        </div>
      </div>

      <!-- Actionable Contact Cards -->
      <div style="display:flex;flex-direction:column;gap:var(--space-3);">
        <!-- Email with Copy button -->
        <div class="contact-card reveal" style="display:flex;align-items:center;justify-content:space-between;padding:var(--space-4);">
          <a href="mailto:${this.profile.email}" style="display:flex;align-items:center;gap:var(--space-4);text-decoration:none;color:inherit;flex:1;">
            <div class="contact-icon" style="background:var(--color-info-bg);color:var(--color-info);">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div>
              <div class="contact-title">Email</div>
              <div class="contact-value">${Utils.sanitize(this.profile.email)}</div>
            </div>
          </a>
          <button class="btn btn-sm btn-ghost" style="color:var(--color-accent);" onclick="Utils.copyToClipboard('${this.profile.email}', 'Copied email to clipboard!')" title="Copy email">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span style="font-size:11px;">Copy</span>
          </button>
        </div>

        <!-- LinkedIn Card -->
        <a href="${this.profile.linkedin}" target="_blank" rel="noopener" class="contact-card reveal" style="padding:var(--space-4);">
          <div class="contact-icon" style="background:rgba(10,102,194,0.12);color:#0A66C2;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </div>
          <div>
            <div class="contact-title">LinkedIn (Direct Message)</div>
            <div class="contact-value">linkedin.com/in/minh-nguyen-7a6789353</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left:auto;color:var(--color-text-muted);"><path d="M7 17 17 7M7 7h10v10"/></svg>
        </a>

        <!-- GitHub Card -->
        <a href="${this.profile.github}" target="_blank" rel="noopener" class="contact-card reveal" style="padding:var(--space-4);">
          <div class="contact-icon" style="background:rgba(255,255,255,0.06);color:var(--color-text-primary);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
          </div>
          <div>
            <div class="contact-title">GitHub Codebase</div>
            <div class="contact-value">github.com/nguyenquocminhtrading-design</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left:auto;color:var(--color-text-muted);"><path d="M7 17 17 7M7 7h10v10"/></svg>
        </a>
      </div>`;
    if (window.Animations) setTimeout(() => Animations.observeReveal(), 50);
  }
};

// Boot
document.addEventListener('DOMContentLoaded', () => App.init());
window.App = App;
