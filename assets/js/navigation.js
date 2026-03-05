/**
 * Sidebar navigation: active page highlighting and collapsible behavior.
 * Run after DOM is ready.
 */
(function () {
  'use strict';

  function getCurrentPage() {
    var path = window.location.pathname;
    if (path.endsWith('/') || path === '' || path.endsWith('/index.html')) return 'index';
    var base = path.split('/').pop();
    return base.replace(/\.html$/, '') || 'index';
  }

  function initSidebar() {
    var nav = document.querySelector('.sidebar-nav');
    if (!nav) return;
    var current = getCurrentPage();
    nav.querySelectorAll('a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var page = href.replace(/^.*\//, '').replace(/\.html$/, '') || 'index';
      if (page === current) a.classList.add('active');
      else a.classList.remove('active');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
  } else {
    initSidebar();
  }
})();
