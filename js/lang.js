/* lang.js — Bilingual EN/VI toggle */

const Lang = {
  KEY: 'nqm-lang',
  current: 'en',

  init() {
    this.current = localStorage.getItem(this.KEY) || 'en';
    document.documentElement.setAttribute('data-lang', this.current);
    this.applyAll();
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => this.set(btn.dataset.lang));
    });
  },

  set(lang) {
    this.current = lang;
    localStorage.setItem(this.KEY, lang);
    document.documentElement.setAttribute('data-lang', lang);
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    this.applyAll();
    // Re-render dynamic content
    if (window.App) App.rerenderCurrent();
  },

  applyAll() {
    const strings = window.I18N && window.I18N[this.current] ? window.I18N[this.current] : {};
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (strings[key]) el.textContent = strings[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (strings[key]) el.placeholder = strings[key];
    });
  },

  t(key) {
    return (window.I18N && window.I18N[this.current] && window.I18N[this.current][key]) || key;
  }
};

window.Lang = Lang;
