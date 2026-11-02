/* utils.js — Shared helpers */

const Utils = {
  /** Show toast notification */
  toast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const icons = {
      success: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
      error:   '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      info:    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
    };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `${icons[type] || icons.info}<span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  /** Copy text to clipboard */
  async copyToClipboard(text, successMsg = 'Copied!') {
    try {
      await navigator.clipboard.writeText(text);
      this.toast(successMsg, 'success');
    } catch {
      this.toast('Copy failed', 'error');
    }
  },

  /** Sanitize HTML to prevent XSS */
  sanitize(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(String(str || '')));
    return div.innerHTML;
  },

  /** Debounce function */
  debounce(fn, delay = 300) {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
  },

  /** Format number with suffix */
  formatNum(n) { return n >= 1000 ? (n/1000).toFixed(0)+'K' : String(n); },

  /** Get current language */
  getLang() { return document.documentElement.getAttribute('data-lang') || 'en'; },

  /** Get translated text from i18n */
  t(key) {
    const lang = this.getLang();
    return (window.I18N && window.I18N[lang] && window.I18N[lang][key]) || key;
  },

  /** Get project field in current language */
  field(obj, key) {
    const lang = this.getLang();
    if (!obj || !obj[key]) return '';
    if (typeof obj[key] === 'object') return obj[key][lang] || obj[key]['en'] || '';
    return obj[key];
  }
};

window.Utils = Utils;
