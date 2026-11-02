/* theme.js — Dark/Light mode toggle */

const Theme = {
  KEY: 'nqm-theme',

  init() {
    const saved = localStorage.getItem(this.KEY) || 'light';
    this.apply(saved);
    document.getElementById('theme-toggle')?.addEventListener('click', () => this.toggle());
  },

  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.KEY, theme);
    const moonIcon = document.getElementById('theme-icon-moon');
    const sunIcon  = document.getElementById('theme-icon-sun');
    const label    = document.getElementById('theme-label');
    if (moonIcon && sunIcon) {
      moonIcon.style.display = theme === 'light' ? 'block' : 'none';
      sunIcon.style.display  = theme === 'dark'  ? 'block' : 'none';
    }
    if (label) {
      label.setAttribute('data-i18n', theme === 'light' ? 'theme_dark' : 'theme_light');
      label.textContent = Utils.t(theme === 'light' ? 'theme_dark' : 'theme_light');
    }
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    this.apply(current === 'light' ? 'dark' : 'light');
  },

  current() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }
};

window.Theme = Theme;
