/* projects.js — Render project cards and detail pages */

const Projects = {
  data: [],
  lang: 'en',

  STATUS_MAP: {
    production:   { label_en: 'Production',   label_vi: 'Sản Xuất',        cls: 'status-production' },
    active:       { label_en: 'Active Dev',    label_vi: 'Đang Phát Triển', cls: 'status-active' },
    completed:    { label_en: 'Completed',     label_vi: 'Hoàn Thành',      cls: 'status-completed' },
    experimental: { label_en: 'Experimental',  label_vi: 'Thử Nghiệm',     cls: 'status-experimental' }
  },

  CAT_MAP: {
    'financial-engineering': { label_en: 'Financial Engineering', label_vi: 'Kỹ Thuật Tài Chính', color: '#1DB97A' },
    'data-engineering':      { label_en: 'Data Engineering',      label_vi: 'Kỹ Thuật Dữ Liệu',   color: '#4285F4' },
    'automation':            { label_en: 'Automation',            label_vi: 'Tự Động Hóa',          color: '#00BCD4' },
    'api-integration':       { label_en: 'API Integration',       label_vi: 'Tích Hợp API',         color: '#FBBF24' },
    'ai-ml':                 { label_en: 'AI & ML',               label_vi: 'AI & ML',              color: '#F472B6' },
    'web-dev':               { label_en: 'Web Development',       label_vi: 'Phát Triển Web',       color: '#A78BFA' }
  },

  ICONS: {
    'xnk-cashew':            `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3h18v18H3z" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
    'see-content-connector': `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 2H3v16h5l3 3 3-3h7V2z"/><path d="M7 8h10M7 12h6"/></svg>`,
    'see-notion':            `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
    'ai-meeting':            `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
    'fund-portfolio':        `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    'job-scraping':          `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`
  },

  ARCH: {
    'xnk-cashew': [
      { label_en: 'TCHQ Website', label_vi: 'Cổng TTDT Tổng Cục Hải Quan', color: '#4285F4' },
      { label_en: 'Playwright Scraper', label_vi: 'Bộ Thu Thập Playwright Tự Động', color: '#00BCD4' },
      { label_en: 'PDF Reports (2X/5X/2N/5N)', label_vi: 'Báo Cáo PDF (2X/5X/2N/5N)', color: '#34D399' },
      { label_en: 'OCR Pipeline + Fallback Math', label_vi: 'Pipeline OCR + Toán Phục Hồi Fallback', color: '#FBBF24' },
      { label_en: 'Master Excel + JSON', label_vi: 'Master Excel (8 Sheets) + JSON', color: '#F472B6' },
      { label_en: 'Web BI Dashboard', label_vi: 'Dashboard Phân Tích Web BI', color: '#4285F4' }
    ],
    'see-content-connector': [
      { label_en: 'OAuth 2.0 (Meta/TikTok/LinkedIn)', label_vi: 'Xác Thực OAuth 2.0 Đa Kênh', color: '#4285F4' },
      { label_en: 'Self-Healing Token Engine', label_vi: 'Engine Token Tự Phục Hồi', color: '#00BCD4' },
      { label_en: 'PostgreSQL (Tokens + Posts)', label_vi: 'PostgreSQL (Lưu Token & Bài Viết)', color: '#34D399' },
      { label_en: 'Sync Worker (every 15 min)', label_vi: 'Tiến Trình Đồng Bộ (Mỗi 15 Phút)', color: '#FBBF24' },
      { label_en: 'Express REST API', label_vi: 'Hệ Thống API REST Express', color: '#F472B6' },
      { label_en: 'Next.js Dashboard + Viral Score', label_vi: 'Next.js Dashboard + Điểm Lan Truyền', color: '#4285F4' }
    ],
    'see-notion': [
      { label_en: 'Discord Command (/task /my)', label_vi: 'Giao Diện Lệnh Discord (/task /my)', color: '#4285F4' },
      { label_en: 'LLM Parser (GLM / Ollama)', label_vi: 'Bộ Phân Tích Ý Định LLM (GLM / Ollama)', color: '#00BCD4' },
      { label_en: 'Validator + Confirmation Preview', label_vi: 'Lớp Kiểm Tra + Bản Xem Trước Xác Nhận', color: '#34D399' },
      { label_en: 'Notion API Gateway', label_vi: 'Gateway Tích Hợp Notion API', color: '#FBBF24' },
      { label_en: 'APScheduler Reminder Engine', label_vi: 'Engine Nhắc Việc Tự Động APScheduler', color: '#F472B6' },
      { label_en: 'SQLite Audit Log + FastAPI', label_vi: 'Nhật Ký Kiểm Toán SQLite + FastAPI', color: '#4285F4' }
    ],
    'ai-meeting': [
      { label_en: 'Audio Capture (Mic / File Upload)', label_vi: 'Thu Âm Thanh (Micro / Tải Tệp Lên)', color: '#4285F4' },
      { label_en: 'WebSocket Streaming', label_vi: 'Truyền Phát Trực Tiếp WebSocket', color: '#00BCD4' },
      { label_en: 'Groq Whisper large-v3-turbo', label_vi: 'Groq Whisper large-v3-turbo (STT)', color: '#34D399' },
      { label_en: 'LLM Diarization Chain (Qwen → Allam)', label_vi: 'Chuỗi Tách Người Nói (Qwen → Allam)', color: '#FBBF24' },
      { label_en: 'AI Report Generation', label_vi: 'Tự Động Sinh Biên Bản & Đầu Việc', color: '#F472B6' },
      { label_en: 'Next.js Dashboard + SQLite', label_vi: 'Dashboard Next.js + Cơ Sở Dữ Liệu SQLite', color: '#4285F4' }
    ],
    'fund-portfolio': [
      { label_en: 'Dragon Capital Portal (LWC)', label_vi: 'Cổng Quỹ Dragon Capital (LWC Salesforce)', color: '#4285F4' },
      { label_en: 'Selenium Scraper', label_vi: 'Trình Thu Thập Dữ Liệu Selenium', color: '#00BCD4' },
      { label_en: '2,000+ Excel Files', label_vi: 'Kho 2.000+ Báo Cáo Quỹ Hàng Ngày', color: '#34D399' },
      { label_en: 'Parallel ETL (ProcessPoolExecutor)', label_vi: 'ETL Song Song Đa Nhân CPU', color: '#FBBF24' },
      { label_en: 'PyTorch GPU Monte Carlo', label_vi: 'PyTorch GPU Mô Phỏng 100K Kịch Bản', color: '#F472B6' },
      { label_en: 'Parquet + Chart.js Dashboard', label_vi: 'Lưu Kho Parquet + Dashboard Chart.js', color: '#4285F4' }
    ],
    'job-scraping': [
      { label_en: 'Config (26K+ keywords.yaml)', label_vi: 'Cấu Hình Từ Điển 26K+ Từ Khóa YAML', color: '#4285F4' },
      { label_en: 'Playwright Multi-source Scraper', label_vi: 'Trình Cào Đa Cổng Tuyển Dụng Playwright', color: '#00BCD4' },
      { label_en: 'NLP Classification + Scoring', label_vi: 'Phân Loại & Chấm Điểm Nhu Cầu NLP', color: '#34D399' },
      { label_en: 'Time-series Analytics', label_vi: 'Phân Tích Xu Hướng Chuỗi Thời Gian', color: '#FBBF24' },
      { label_en: 'PostgreSQL + APScheduler', label_vi: 'Kho Dữ Liệu PostgreSQL + APScheduler', color: '#F472B6' },
      { label_en: 'Ranked Exports + Reports', label_vi: 'Xuất Báo Cáo & Xếp Hạng Kỹ Năng Hot', color: '#4285F4' }
    ]
  },

  init(data) {
    this.data = data;
  },

  getLang() { return document.documentElement.getAttribute('data-lang') || 'en'; },

  field(obj, key) {
    const lang = this.getLang();
    if (!obj || obj[key] === undefined) return '';
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      return obj[key][lang] || obj[key]['en'] || '';
    }
    return obj[key];
  },

  statusBadge(status) {
    const s = this.STATUS_MAP[status] || this.STATUS_MAP.completed;
    const lang = this.getLang();
    const label = lang === 'vi' ? s.label_vi : s.label_en;
    return `<span class="status-badge ${s.cls}">${label}</span>`;
  },

  catBadge(catId) {
    const c = this.CAT_MAP[catId];
    if (!c) return '';
    const lang = this.getLang();
    return `<span class="badge badge-blue" style="background:${c.color}18;color:${c.color};">${lang === 'vi' ? c.label_vi : c.label_en}</span>`;
  },

  techTags(stack) {
    return (stack || []).map(t => `<span class="tech-tag">${Utils.sanitize(t)}</span>`).join('');
  },

  archSVG(projectId) {
    const steps = this.ARCH[projectId] || [];
    if (!steps.length) return '';
    const lang = this.getLang();
    const nodeH = 48, gap = 38, svgW = 540;
    const svgH = steps.length * nodeH + (steps.length - 1) * gap + 40;

    let svg = `<svg viewBox="0 0 ${svgW} ${svgH}" style="width:100%;max-width:${svgW}px;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>`;

    steps.forEach((step, i) => {
      const label = lang === 'vi' ? (step.label_vi || step.label_en) : step.label_en;
      const y = 20 + i * (nodeH + gap);
      const cy = y + nodeH / 2;
      
      // Connector line & animated pulse particle
      if (i < steps.length - 1) {
        const nextY = y + nodeH + gap;
        svg += `
        <!-- Track line -->
        <line x1="270" y1="${y + nodeH}" x2="270" y2="${nextY}" stroke="${step.color}" stroke-width="2" stroke-dasharray="4 4" opacity="0.4"/>
        
        <!-- Animated data packet pulse -->
        <circle cx="270" cy="${y + nodeH + 6}" r="3.5" fill="#FFFFFF" filter="url(#glow)">
          <animate attributeName="cy" from="${y + nodeH}" to="${nextY}" dur="1.8s" begin="${i * 0.3}s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" dur="1.8s" begin="${i * 0.3}s" repeatCount="indefinite" />
        </circle>
        
        <!-- Arrowhead -->
        <polygon points="265,${nextY-4} 275,${nextY-4} 270,${nextY+2}" fill="${step.color}" opacity="0.8"/>`;
      }

      // Node box (hoverable with glass effect & high contrast text)
      svg += `
      <g style="cursor:pointer;" class="arch-node-group">
        <rect x="25" y="${y}" width="490" height="${nodeH}" rx="12" fill="${step.color}1c" stroke="${step.color}" stroke-width="1.8" />
        <circle cx="56" cy="${cy}" r="15" fill="${step.color}" opacity="0.95" />
        <text x="56" y="${cy+4}" text-anchor="middle" font-size="12" font-weight="800" fill="#FFFFFF" font-family="Inter,sans-serif">${i+1}</text>
        <text x="86" y="${cy+5}" font-size="13.5" font-weight="600" fill="#F1F5F9" font-family="Inter,sans-serif" letter-spacing="-0.01em">${label}</text>
        <circle cx="490" cy="${cy}" r="3.5" fill="${step.color}" opacity="0.85">
          <animate attributeName="r" values="3.5;5.5;3.5" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.85;0.3;0.85" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>`;
    });

    svg += `</svg>`;
    return svg;
  },

  renderCard(project) {
    const lang = this.getLang();
    const name = this.field(project, 'name');
    const tagline = this.field(project, 'tagline');
    const cats = (project.category || []).map(c => this.catBadge(c)).join('');
    const tags = this.techTags((project.techStack || []).slice(0, 5));
    const icon = this.ICONS[project.id] || '';

    const thumbHTML = project.thumbnail
      ? `<img src="${project.thumbnail}" alt="${Utils.sanitize(name)}" loading="lazy" style="width:100%;height:100%;object-fit:cover;" onerror="this.remove();" />`
      : `<div class="card-thumbnail-icon" style="color:${(this.ARCH[project.id]?.[0]?.color) || 'var(--color-accent)'};">${icon}</div>`;

    // Tier 1 ROI Badges for Executive Audience
    const roiHTML = (project.roiMetrics || []).map(m => {
      const label = typeof m.label === 'object' ? (m.label[lang] || m.label.en) : m.label;
      const sub = typeof m.sub === 'object' ? (m.sub[lang] || m.sub.en) : m.sub;
      return `
      <div style="background:var(--color-bg-secondary);border:1px solid var(--color-border);border-radius:6px;padding:6px 10px;display:flex;flex-direction:column;gap:1px;">
        <span style="font-size:10px;text-transform:uppercase;color:var(--color-text-muted);font-weight:600;letter-spacing:0.04em;">${Utils.sanitize(label)}</span>
        <span style="font-size:14px;font-weight:700;color:var(--color-accent);">${Utils.sanitize(m.value)}</span>
        <span style="font-size:9.5px;color:var(--color-text-secondary);">${Utils.sanitize(sub)}</span>
      </div>`;
    }).join('');

    return `
    <div class="project-card reveal" data-id="${project.id}" data-categories='${JSON.stringify(project.category)}' data-year="${project.year}" data-name="${Utils.sanitize(name)}">
      <div class="card-accent-line"></div>
      <div class="card-thumbnail">
        <div class="card-thumbnail-overlay"></div>
        ${thumbHTML}
      </div>
      <div class="card-body">
        <div class="card-header">
          <h3 class="card-title">${Utils.sanitize(name)}</h3>
          ${this.statusBadge(project.status)}
        </div>
        <p class="card-description">${Utils.sanitize(tagline)}</p>
        
        <!-- Tier 1 Executive ROI Bar -->
        ${roiHTML ? `<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(90px, 1fr));gap:6px;margin:var(--space-3) 0;">${roiHTML}</div>` : ''}

        <div style="display:flex;flex-wrap:wrap;gap:var(--space-1);margin:var(--space-2) 0;">${cats}</div>
        <div class="card-tags">${tags}</div>
      </div>
      <div class="card-actions">
        <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();navigate('project-detail',{id:'${project.id}'})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          ${Utils.t('view_details')}
        </button>
        ${project.github ? `<a class="btn btn-secondary btn-sm" href="${project.github}" target="_blank" rel="noopener"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>GitHub</a>` : ''}
      </div>
    </div>`;
  },

  renderDetail(id) {
    const project = this.data.find(p => p.id === id);
    if (!project) return;
    const lang = this.getLang();
    const name = this.field(project, 'name');
    const tagline = this.field(project, 'tagline');
    const overview = this.field(project, 'overview');
    const problem = this.field(project, 'problem');
    const objective = this.field(project, 'businessObjective');
    const cats = (project.category || []).map(c => this.catBadge(c)).join('');

    // Workflow steps
    const workflowHTML = (project.workflow || []).map((s, i) => {
      const stepName = typeof s.step === 'object' ? (s.step[lang] || s.step.en) : s.step;
      const stepDesc = typeof s.desc === 'object' ? (s.desc[lang] || s.desc.en) : s.desc;
      return `
      <div class="workflow-step">
        <div class="step-number">${i+1}</div>
        <div class="step-content">
          <div class="step-title">${Utils.sanitize(stepName)}</div>
          <div class="step-desc">${Utils.sanitize(stepDesc)}</div>
        </div>
      </div>`;
    }).join('');

    // Features
    const featuresHTML = (project.features || []).map(f => {
      const featTitle = typeof f.title === 'object' ? (f.title[lang] || f.title.en) : f.title;
      const featDesc = typeof f.desc === 'object' ? (f.desc[lang] || f.desc.en) : f.desc;
      return `
      <div class="feature-item">
        <div class="feature-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div>
          <div class="feature-title">${Utils.sanitize(featTitle)}</div>
          <div class="feature-desc">${Utils.sanitize(featDesc)}</div>
        </div>
      </div>`;
    }).join('');

    // Challenges
    const challengesHTML = (project.challenges || []).map((c, i) => {
      const chTitle = typeof c.title === 'object' ? (c.title[lang] || c.title.en) : c.title;
      const chSolution = typeof c.solution === 'object' ? (c.solution[lang] || c.solution.en) : c.solution;
      return `
      <div class="challenge-item" id="ch-${i}">
        <div class="challenge-header" onclick="Projects.toggleChallenge('ch-${i}')">
          <span class="challenge-title">⚠️ ${Utils.sanitize(chTitle)}</span>
          <svg class="challenge-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
        </div>
        <div class="challenge-body"><p>✅ <strong>${Utils.t('detail_solution_label')}</strong> ${Utils.sanitize(chSolution)}</p></div>
      </div>`;
    }).join('');

    // Results
    const resultsHTML = (project.results || []).map(r => {
      const resText = typeof r === 'object' ? (r[lang] || r.en) : r;
      return `
      <div style="display:flex;align-items:flex-start;gap:var(--space-3);padding:var(--space-3) 0;border-bottom:1px solid var(--color-border);">
        <span style="color:var(--color-success);font-size:18px;flex-shrink:0;margin-top:1px;">✓</span>
        <span style="font-size:var(--text-sm);color:var(--color-text-secondary);">${Utils.sanitize(resText)}</span>
      </div>`;
    }).join('');

    // Future
    const futureHTML = (project.future || []).map(f => {
      const futText = typeof f === 'object' ? (f[lang] || f.en) : f;
      return `
      <div style="display:flex;align-items:flex-start;gap:var(--space-3);padding:var(--space-3) 0;border-bottom:1px solid var(--color-border);">
        <span style="color:var(--color-accent);font-size:18px;flex-shrink:0;margin-top:1px;">→</span>
        <span style="font-size:var(--text-sm);color:var(--color-text-secondary);">${Utils.sanitize(futText)}</span>
      </div>`;
    }).join('');

    // Related
    const relatedHTML = (project.relatedProjects || []).map(rid => {
      const rel = this.data.find(p => p.id === rid);
      if (!rel) return '';
      return `<div class="project-card" style="cursor:pointer;max-width:300px;" onclick="navigate('project-detail',{id:'${rid}'})">
        <div class="card-body">
          <div class="card-title" style="font-size:var(--text-sm);">${Utils.sanitize(this.field(rel, 'name'))}</div>
          <p class="card-description" style="-webkit-line-clamp:2;">${Utils.sanitize(this.field(rel, 'tagline'))}</p>
        </div>
      </div>`;
    }).join('');

    const sectionIcon = (icon) => `<div class="detail-section-title-icon">${icon}</div>`;
    const eyeIcon = sectionIcon(`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`);
    const alertIcon = sectionIcon(`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`);
    const targetIcon = sectionIcon(`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`);
    const archIcon = sectionIcon(`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`);
    const flowIcon = sectionIcon(`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`);
    const starIcon = sectionIcon(`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`);
    const checkIcon = sectionIcon(`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`);
    const arrowIcon = sectionIcon(`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 8 16 12 12 16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`);
    const codeIcon = sectionIcon(`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`);

    const html = `
    <!-- Back Button -->
    <div style="padding:var(--space-5) var(--space-8);border-bottom:1px solid var(--color-border);background:var(--color-bg);">
      <button class="btn btn-ghost btn-sm" onclick="navigate('projects')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        ${Utils.t('back_projects')}
      </button>
    </div>

    <!-- Hero -->
    <div class="detail-hero">
      <div class="detail-category-row">${cats}</div>
      <h1 class="detail-title">${Utils.sanitize(name)}</h1>
      <p class="detail-description">${Utils.sanitize(tagline)}</p>
      <div class="detail-meta">
        <div class="detail-meta-item"><span class="detail-meta-label">${Utils.t('detail_meta_status')}</span><span class="detail-meta-value">${this.statusBadge(project.status)}</span></div>
        <div class="detail-meta-item"><span class="detail-meta-label">${Utils.t('detail_meta_year')}</span><span class="detail-meta-value">${project.year || '—'}</span></div>
        <div class="detail-meta-item"><span class="detail-meta-label">${Utils.t('detail_meta_stack')}</span><span class="detail-meta-value">${(project.techStack||[]).length} ${Utils.t('detail_meta_technologies')}</span></div>
        ${project.github ? `<div class="detail-meta-item"><span class="detail-meta-label">${Utils.t('detail_meta_repo')}</span><a href="${project.github}" target="_blank" rel="noopener" class="detail-meta-value" style="color:rgba(255,255,255,0.9);">${Utils.t('detail_view_repo')}</a></div>` : ''}
      </div>
    </div>

    <!-- Body -->
    <div class="detail-body">

      <!-- Tier 1: Executive Summary & Measurable ROI Bar -->
      <div class="detail-section" style="background:var(--color-bg-secondary);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:var(--space-6);">
        <div style="font-size:12px;font-weight:700;text-transform:uppercase;color:var(--color-accent);letter-spacing:0.06em;margin-bottom:var(--space-3);">
          ${Utils.t('tier1_label') || '1. Executive ROI & Business Impact'}
        </div>
        ${project.roiMetrics && project.roiMetrics.length ? `
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:var(--space-4);margin-bottom:var(--space-4);">
          ${project.roiMetrics.map(m => {
            const label = typeof m.label === 'object' ? (m.label[lang] || m.label.en) : m.label;
            const sub = typeof m.sub === 'object' ? (m.sub[lang] || m.sub.en) : m.sub;
            return `
            <div style="background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:var(--space-4);">
              <div style="font-size:11px;text-transform:uppercase;color:var(--color-text-muted);font-weight:600;">${Utils.sanitize(label)}</div>
              <div style="font-size:24px;font-weight:800;color:var(--color-accent);margin:4px 0;">${Utils.sanitize(m.value)}</div>
              <div style="font-size:11px;color:var(--color-text-secondary);">${Utils.sanitize(sub)}</div>
            </div>`;
          }).join('')}
        </div>` : ''}
        <p style="font-size:var(--text-base);color:var(--color-text-primary);line-height:var(--leading-relaxed);margin:0;">${Utils.sanitize(overview)}</p>
      </div>

      <!-- STAR-M Deep Dive (Situation, Task, Action, Result) -->
      ${project.starFormat ? `
      <div class="detail-section" style="border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:var(--space-6);background:var(--color-surface);">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-5);">
          <h2 class="detail-section-title" style="margin-bottom:0;color:var(--color-text-primary);">
            ${starIcon} Case Study: STAR-M Framework
          </h2>
          <span class="badge" style="background:#16A34A18;color:#16A34A;border:1px solid #16A34A40;font-weight:700;">
            ${Utils.sanitize(project.starFormat.headlineMetric)}
          </span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-5);">
          <div style="background:var(--color-bg-secondary);padding:var(--space-4);border-radius:var(--radius-md);border-left:3px solid #EF4444;">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#EF4444;letter-spacing:0.05em;margin-bottom:4px;">1. Situation (Business Pain Point)</div>
            <p style="font-size:13.5px;color:var(--color-text-secondary);line-height:1.6;margin:0;">
              ${Utils.sanitize(project.starFormat.situation[lang] || project.starFormat.situation.en)}
            </p>
          </div>
          <div style="background:var(--color-bg-secondary);padding:var(--space-4);border-radius:var(--radius-md);border-left:3px solid #F59E0B;">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#F59E0B;letter-spacing:0.05em;margin-bottom:4px;">2. Task (Automation Objective)</div>
            <p style="font-size:13.5px;color:var(--color-text-secondary);line-height:1.6;margin:0;">
              ${Utils.sanitize(project.starFormat.task[lang] || project.starFormat.task.en)}
            </p>
          </div>
          <div style="background:var(--color-bg-secondary);padding:var(--space-4);border-radius:var(--radius-md);border-left:3px solid #2563EB;">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#2563EB;letter-spacing:0.05em;margin-bottom:4px;">3. Action (Engineering Approach)</div>
            <p style="font-size:13.5px;color:var(--color-text-secondary);line-height:1.6;margin:0;">
              ${Utils.sanitize(project.starFormat.action[lang] || project.starFormat.action.en)}
            </p>
          </div>
          <div style="background:var(--color-bg-secondary);padding:var(--space-4);border-radius:var(--radius-md);border-left:3px solid #16A34A;">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#16A34A;letter-spacing:0.05em;margin-bottom:4px;">4. Result & Metrics (ROI Delivered)</div>
            <p style="font-size:13.5px;color:var(--color-text-secondary);line-height:1.6;margin:0;">
              ${Utils.sanitize(project.starFormat.result[lang] || project.starFormat.result.en)}
            </p>
          </div>
        </div>
      </div>` : ''}

      <!-- Problem + Objective in 2-col -->
      <div class="detail-section">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-8);">
          <div>
            <h2 class="detail-section-title">${alertIcon}${Utils.t('detail_problem')}</h2>
            <p style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:var(--leading-relaxed);">${Utils.sanitize(problem)}</p>
          </div>
          <div>
            <h2 class="detail-section-title">${targetIcon}${Utils.t('detail_objective')}</h2>
            <p style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:var(--leading-relaxed);">${Utils.sanitize(objective)}</p>
          </div>
        </div>
      </div>

      <!-- Architecture Diagram with Living Data Packets -->
      <div class="detail-section">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-4);">
          <h2 class="detail-section-title" style="margin-bottom:0;">${archIcon}${Utils.t('detail_architecture')}</h2>
          <span class="badge" style="background:rgba(66,133,244,0.12);color:var(--color-accent);border:1px solid rgba(66,133,244,0.25);">${Utils.t('detail_pulse_badge')}</span>
        </div>
        <div class="arch-diagram" style="background:#090F1C;border-color:rgba(255,255,255,0.08);box-shadow:inset 0 2px 20px rgba(0,0,0,0.5);">${this.archSVG(project.id)}</div>
      </div>

      <!-- Real Visual Evidence Gallery (if available) -->
      ${project.gallery && project.gallery.length ? `
      <div class="detail-section">
        <h2 class="detail-section-title">${eyeIcon}${Utils.t('detail_visual_proof')}</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:var(--space-4);">
          ${project.gallery.map(img => `
            <div style="border-radius:var(--radius-lg);overflow:hidden;border:1px solid var(--color-border);background:#090F1C;box-shadow:var(--shadow-sm);">
              <img src="${img}" alt="System UI Artifact" loading="lazy" style="width:100%;height:190px;object-fit:cover;display:block;transition:transform 0.3s ease;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'" />
            </div>
          `).join('')}
        </div>
      </div>` : ''}

      <!-- Codebase Architecture & Verified CLI Execution (Transparent & Self-verifying) -->
      <div class="detail-section">
        <h2 class="detail-section-title">${codeIcon}${Utils.t('detail_codebase_arch')}</h2>
        <div class="window-frame">
          <div class="window-header">
            <div class="window-controls">
              <span class="window-dot window-dot-red"></span>
              <span class="window-dot window-dot-yellow"></span>
              <span class="window-dot window-dot-green"></span>
            </div>
            <div class="window-title">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
              ${project.id} — execution-environment
            </div>
            ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener" class="btn btn-sm btn-ghost" style="color:#60A5FA;margin-left:auto;font-size:11px;">View Repository ↗</a>` : ''}
          </div>
          <div style="padding:var(--space-5);background:#070C16;color:#E2E8F0;font-family:var(--font-mono);font-size:12px;line-height:1.7;">
            ${project.cliCommand ? `
            <div style="margin-bottom:var(--space-4);padding-bottom:var(--space-3);border-bottom:1px solid rgba(255,255,255,0.08);">
              <div style="color:#64748B;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">${Utils.t('detail_cli_label')}</div>
              <div style="background:rgba(255,255,255,0.04);padding:8px 12px;border-radius:6px;color:#38BDF8;display:flex;align-items:center;justify-content:space-between;">
                <code>$ ${Utils.sanitize(project.cliCommand)}</code>
                <button class="btn btn-sm btn-ghost" style="color:#94A3B8;padding:2px 8px;font-size:11px;" onclick="Utils.copyToClipboard('${project.cliCommand.replace(/'/g, "\\'")}','Copied CLI command!')">Copy</button>
              </div>
            </div>` : ''}

            ${project.actualArtifacts && project.actualArtifacts.length ? `
            <div>
              <div style="color:#64748B;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">${Utils.t('detail_artifacts_label')}</div>
              <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:6px;">
                ${project.actualArtifacts.map(art => `
                  <li style="display:flex;align-items:center;gap:8px;color:#CBD5E1;">
                    <span style="color:#34D399;">✔</span> <code>${Utils.sanitize(art)}</code>
                  </li>
                `).join('')}
              </ul>
            </div>` : ''}
          </div>
        </div>
      </div>

      <!-- Workflow -->
      ${workflowHTML ? `<div class="detail-section">
        <h2 class="detail-section-title">${flowIcon}${Utils.t('detail_workflow')}</h2>
        <div class="workflow-steps">${workflowHTML}</div>
      </div>` : ''}

      <!-- Tech Stack -->
      <div class="detail-section">
        <h2 class="detail-section-title">${codeIcon}${Utils.t('detail_tech')}</h2>
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-2);">${this.techTags(project.techStack || [])}</div>
      </div>

      <!-- Features -->
      ${featuresHTML ? `<div class="detail-section">
        <h2 class="detail-section-title">${starIcon}${Utils.t('detail_features')}</h2>
        <div class="feature-list">${featuresHTML}</div>
      </div>` : ''}

      <!-- Challenges -->
      ${challengesHTML ? `<div class="detail-section">
        <h2 class="detail-section-title">${alertIcon}${Utils.t('detail_challenges')}</h2>
        <div style="display:flex;flex-direction:column;gap:var(--space-3);">${challengesHTML}</div>
      </div>` : ''}

      <!-- Results -->
      ${resultsHTML ? `<div class="detail-section">
        <h2 class="detail-section-title">${checkIcon}${Utils.t('detail_results')}</h2>
        <div>${resultsHTML}</div>
      </div>` : ''}

      <!-- Future -->
      ${futureHTML ? `<div class="detail-section">
        <h2 class="detail-section-title">${arrowIcon}${Utils.t('detail_future')}</h2>
        <div>${futureHTML}</div>
      </div>` : ''}

      <!-- Related -->
      ${relatedHTML ? `<div class="detail-section">
        <h2 class="detail-section-title">${arrowIcon}${Utils.t('detail_related')}</h2>
        <div style="display:flex;gap:var(--space-4);flex-wrap:wrap;">${relatedHTML}</div>
      </div>` : ''}

    </div>`;

    const container = document.getElementById('project-detail-content');
    if (container) container.innerHTML = html;
  },

  toggleChallenge(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('open');
  },

  renderList(containerId, projects) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (!projects.length) {
      container.innerHTML = `<div style="text-align:center;padding:var(--space-16);color:var(--color-text-muted);">${Utils.t('no_results')}</div>`;
      return;
    }
    container.innerHTML = projects.map(p => this.renderCard(p)).join('');
    // Click on card body navigates to detail
    container.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn') || e.target.closest('a')) return;
        navigate('project-detail', { id: card.dataset.id });
      });
    });
    if (window.Animations) Animations.observeReveal();
  }
};

window.Projects = Projects;
