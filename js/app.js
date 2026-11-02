/* app.js — Main application orchestrator */

const TECH_CATEGORIES = [
  {
    name: 'Languages',
    items: [
      { name: 'Python',      bg: '#3776AB22', color: '#3776AB', abbr: 'Py' },
      { name: 'JavaScript',  bg: '#F7DF1E22', color: '#B8A60A', abbr: 'JS' },
      { name: 'TypeScript',  bg: '#3178C622', color: '#3178C6', abbr: 'TS' },
      { name: 'SQL',         bg: '#336A9122', color: '#336A91', abbr: 'SQL', small: true },
      { name: 'HTML/CSS',    bg: '#E3430022', color: '#E34300', abbr: 'H/C' }
    ]
  },
  {
    name: 'Backend & APIs',
    items: [
      { name: 'FastAPI',    bg: '#00978522', color: '#009785', abbr: 'FA' },
      { name: 'Node.js',   bg: '#33993322', color: '#339933', abbr: 'No' },
      { name: 'Express',   bg: '#00000022', color: '#666',    abbr: 'Ex' },
      { name: 'WebSocket', bg: '#4285F422', color: '#4285F4', abbr: 'WS' }
    ]
  },
  {
    name: 'Frontend',
    items: [
      { name: 'Next.js',      bg: '#00000022', color: '#888',    abbr: 'Nx' },
      { name: 'React',        bg: '#61DAFB22', color: '#20A4C4', abbr: 'Re' },
      { name: 'Chart.js',     bg: '#FF638422', color: '#FF6384', abbr: 'Ch' },
      { name: 'Tailwind CSS', bg: '#06B6D422', color: '#06B6D4', abbr: 'Tw' },
      { name: 'Leaflet',      bg: '#199A1222', color: '#199A12', abbr: 'Le' }
    ]
  },
  {
    name: 'Data & AI',
    items: [
      { name: 'pandas',      bg: '#15005922', color: '#4F3CDB', abbr: 'pd' },
      { name: 'PyTorch',     bg: '#EE440022', color: '#EE4400', abbr: 'PT' },
      { name: 'Playwright',  bg: '#2EAD3322', color: '#2EAD33', abbr: 'Pl' },
      { name: 'Selenium',    bg: '#43B02A22', color: '#43B02A', abbr: 'Se' },
      { name: 'Groq/LLM',   bg: '#F97C4422', color: '#F97C44', abbr: 'AI' },
      { name: 'OCR/NLP',    bg: '#9333EA22', color: '#9333EA', abbr: 'NL' }
    ]
  },
  {
    name: 'Databases',
    items: [
      { name: 'PostgreSQL', bg: '#33699922', color: '#336699', abbr: 'PG' },
      { name: 'SQLite',     bg: '#0F80CC22', color: '#0F80CC', abbr: 'SQ' },
      { name: 'Parquet',    bg: '#E2552222', color: '#E25522', abbr: 'Pa' }
    ]
  },
  {
    name: 'DevOps & Cloud',
    items: [
      { name: 'Docker',  bg: '#2496ED22', color: '#2496ED', abbr: 'Do' },
      { name: 'Render',  bg: '#46E3B722', color: '#20C79A', abbr: 'Rn' },
      { name: 'GitHub',  bg: '#18181822', color: '#666',    abbr: 'Gh' }
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
      // Re-render with current project if any
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
    container.innerHTML = TECH_CATEGORIES.map((cat, ci) => `
      <div class="reveal" style="transition-delay:${ci * 0.1}s">
        <h3 style="font-size:var(--text-lg);font-weight:var(--fw-semibold);color:var(--color-text-primary);margin-bottom:var(--space-4);">${cat.name}</h3>
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-3);">
          ${cat.items.map(t => `
          <div class="tech-item">
            <div class="tech-item-icon" style="background:${t.bg};color:${t.color};">
              <span style="font-size:${t.small ? '10px' : '12px'};font-weight:700;">${t.abbr}</span>
            </div>
            <div>
              <div class="tech-item-name">${t.name}</div>
            </div>
          </div>`).join('')}
        </div>
      </div>`).join('');
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
    const contacts = [
      {
        href: `mailto:${this.profile.email}`,
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
        bg: 'var(--color-info-bg)', color: 'var(--color-info)',
        title: 'Email',
        value: this.profile.email
      },
      {
        href: this.profile.github,
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
        bg: '#18181815', color: '#333',
        title: 'GitHub',
        value: 'nguyenquocminhtrading-design'
      },
      {
        href: this.profile.linkedin,
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
        bg: '#0A66C215', color: '#0A66C2',
        title: 'LinkedIn',
        value: 'minh-nguyen-7a6789353'
      }
    ];

    container.innerHTML = contacts.map(c => `
      <a href="${c.href}" target="_blank" rel="noopener" class="contact-card reveal">
        <div class="contact-icon" style="background:${c.bg};color:${c.color};">${c.icon}</div>
        <div>
          <div class="contact-title">${c.title}</div>
          <div class="contact-value">${Utils.sanitize(c.value)}</div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left:auto;color:var(--color-text-muted);"><path d="M7 17 17 7M7 7h10v10"/></svg>
      </a>`).join('');
    if (window.Animations) setTimeout(() => Animations.observeReveal(), 50);
  }
};

// Boot
document.addEventListener('DOMContentLoaded', () => App.init());
window.App = App;
