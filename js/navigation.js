/* navigation.js — Sidebar, routing, scroll */

const Navigation = {
  currentPage: 'home',

  init() {
    this._initSidebar();
    this._initScrollBehavior();
    this._initNavItems();
    this._initMobileHeader();
  },

  _initSidebar() {
    const sidebar  = document.getElementById('sidebar');
    const main     = document.getElementById('main-content');
    const toggle   = document.getElementById('sidebar-toggle');
    const overlay  = document.getElementById('sidebar-overlay');
    const isMobile = () => window.innerWidth < 1024;

    // Restore collapsed state on desktop
    const collapsed = localStorage.getItem('nqm-sidebar-collapsed') === 'true';
    if (!isMobile() && collapsed) {
      sidebar.classList.add('collapsed');
      main.classList.add('sidebar-collapsed');
    }

    toggle?.addEventListener('click', () => {
      if (isMobile()) {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
      } else {
        const isCollapsed = sidebar.classList.toggle('collapsed');
        main.classList.toggle('sidebar-collapsed', isCollapsed);
        localStorage.setItem('nqm-sidebar-collapsed', isCollapsed);
        // Flip chevron
        const icon = toggle.querySelector('svg');
        if (icon) icon.style.transform = isCollapsed ? 'rotate(180deg)' : '';
      }
    });

    overlay?.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('active');
    });

    window.addEventListener('resize', () => {
      if (!isMobile()) {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
        main.style.paddingTop = '';
        const isCollapsed = sidebar.classList.contains('collapsed');
        main.classList.toggle('sidebar-collapsed', isCollapsed);
      }
    });
  },

  _initMobileHeader() {
    const hamburger = document.getElementById('hamburger-btn');
    const sidebar   = document.getElementById('sidebar');
    const overlay   = document.getElementById('sidebar-overlay');
    hamburger?.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
      overlay.classList.toggle('active');
    });
  },

  _initNavItems() {
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
      item.addEventListener('click', () => {
        const page = item.dataset.page;
        navigate(page);
        // Close mobile sidebar
        if (window.innerWidth < 1024) {
          document.getElementById('sidebar')?.classList.remove('mobile-open');
          document.getElementById('sidebar-overlay')?.classList.remove('active');
        }
      });
    });
  },

  _initScrollBehavior() {
    const progress  = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');
    const main      = document.getElementById('main-content');

    const onScroll = () => {
      const scrollEl = document.scrollingElement || document.documentElement;
      const pct = (scrollEl.scrollTop / (scrollEl.scrollHeight - scrollEl.clientHeight)) * 100;
      if (progress) progress.style.width = Math.min(pct, 100) + '%';
      if (backToTop) backToTop.classList.toggle('visible', scrollEl.scrollTop > 400);
    };

    document.addEventListener('scroll', onScroll, { passive: true });
    // Also listen on main content
    main?.addEventListener('scroll', onScroll, { passive: true });
  },

  setActive(page) {
    this.currentPage = page;
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
      item.classList.toggle('active', item.dataset.page === page);
    });
  },

  showPage(page) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`page-${page}`);
    if (target) {
      target.classList.add('active');
      // Scroll to top
      document.scrollingElement.scrollTop = 0;
    }
    this.setActive(page);
    window.location.hash = page;
  }
};

/** Global navigate function */
function navigate(page, params = {}) {
  // Special case: project detail
  if (page === 'project-detail') {
    Navigation.currentPage = 'project-detail';
    Navigation.showPage('project-detail');
    Navigation.setActive('projects');
    if (params.id && window.Projects) {
      Projects.renderDetail(params.id);
      window.location.hash = `project-${params.id}`;
    }
    return;
  }
  Navigation.showPage(page);
  // Trigger page-specific render
  if (window.App) App.onPageShow(page);
}

// Global CV Dropdown Toggle
function toggleCVDropdown(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById('cv-dropdown-menu');
  if (menu) {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  }
}

// Global Click listener & Escape key listener
document.addEventListener('click', (e) => {
  const menu = document.getElementById('cv-dropdown-menu');
  if (menu && !e.target.closest('#cv-dropdown-wrapper')) {
    menu.style.display = 'none';
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const menu = document.getElementById('cv-dropdown-menu');
    if (menu) menu.style.display = 'none';
    
    // If on project detail page, press Escape to go back
    if (Navigation.currentPage === 'project-detail' || document.getElementById('page-project-detail')?.classList.contains('active')) {
      navigate('projects');
    }
  }
});

window.Navigation = Navigation;
window.navigate   = navigate;
