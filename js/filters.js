/* filters.js — Search, category filter, sort, view toggle */

const Filters = {
  activeCategory: 'all',
  searchQuery: '',
  sortOrder: 'newest',

  CATEGORIES: [
    { id: 'all',                  label_en: 'All Projects',          label_vi: 'Tất Cả' },
    { id: 'financial-engineering',label_en: 'Financial Engineering',  label_vi: 'Kỹ Thuật Tài Chính' },
    { id: 'automation',           label_en: 'Automation',            label_vi: 'Tự Động Hóa' },
    { id: 'data-engineering',     label_en: 'Data Engineering',      label_vi: 'Kỹ Thuật Dữ Liệu' },
    { id: 'ai-ml',                label_en: 'AI & Machine Learning', label_vi: 'AI & ML' },
    { id: 'web-dev',              label_en: 'Web Development',       label_vi: 'Phát Triển Web' },
    { id: 'api-integration',      label_en: 'API Integration',       label_vi: 'Tích Hợp API' }
  ],

  init() {
    this.renderChips();
    this._initSearch();
    this._initSort();
    this._initViewToggle();
  },

  renderChips() {
    const container = document.getElementById('filter-chips');
    if (!container) return;
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    container.innerHTML = this.CATEGORIES.map(cat => `
      <button class="filter-chip ${cat.id === this.activeCategory ? 'active' : ''}"
              data-cat="${cat.id}">
        ${cat['label_' + lang] || cat.label_en}
      </button>`).join('');
    container.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeCategory = btn.dataset.cat;
        this.renderChips();
        this.apply();
      });
    });
  },

  _initSearch() {
    const input = document.getElementById('project-search');
    if (!input) return;
    input.addEventListener('input', Utils.debounce(() => {
      this.searchQuery = input.value.toLowerCase().trim();
      this.apply();
    }, 250));
  },

  _initSort() {
    const select = document.getElementById('project-sort');
    if (!select) return;
    select.addEventListener('change', () => {
      this.sortOrder = select.value;
      this.apply();
    });
  },

  _initViewToggle() {
    const gridBtn = document.getElementById('view-grid-btn');
    const listBtn = document.getElementById('view-list-btn');
    const container = document.getElementById('projects-grid');
    if (!gridBtn || !listBtn || !container) return;

    gridBtn.addEventListener('click', () => {
      gridBtn.classList.add('active');
      listBtn.classList.remove('active');
      container.classList.remove('list-view');
    });
    listBtn.addEventListener('click', () => {
      listBtn.classList.add('active');
      gridBtn.classList.remove('active');
      container.classList.add('list-view');
    });
  },

  apply() {
    const all = Projects.data || [];
    let filtered = [...all];

    // Category filter
    if (this.activeCategory !== 'all') {
      filtered = filtered.filter(p => (p.category || []).includes(this.activeCategory));
    }

    // Search
    if (this.searchQuery) {
      const q = this.searchQuery;
      const lang = document.documentElement.getAttribute('data-lang') || 'en';
      filtered = filtered.filter(p => {
        const name    = (p.name?.[lang] || p.name?.en || '').toLowerCase();
        const tagline = (p.tagline?.[lang] || p.tagline?.en || '').toLowerCase();
        const tech    = (p.techStack || []).join(' ').toLowerCase();
        const cats    = (p.category || []).join(' ').toLowerCase();
        return name.includes(q) || tagline.includes(q) || tech.includes(q) || cats.includes(q);
      });
    }

    // Sort
    filtered.sort((a, b) => {
      if (this.sortOrder === 'newest') return (b.year || 0) - (a.year || 0);
      if (this.sortOrder === 'oldest') return (a.year || 0) - (b.year || 0);
      if (this.sortOrder === 'az') {
        const lang = document.documentElement.getAttribute('data-lang') || 'en';
        return (a.name?.[lang] || '').localeCompare(b.name?.[lang] || '');
      }
      return 0;
    });

    // Render
    Projects.renderList('projects-grid', filtered);
    const noResults = document.getElementById('no-results');
    if (noResults) noResults.style.display = filtered.length === 0 ? 'block' : 'none';
  },

  refresh() {
    this.renderChips();
    this.apply();
  }
};

window.Filters = Filters;
