/**
 * Client-side search across documentation pages.
 * Fetches page list and searches titles + content; shows dropdown with matches.
 */
(function () {
  'use strict';

  var pages = [
    { path: 'index.html', title: 'Home' },
    { path: 'pages/preface.html', title: 'Preface' },
    { path: 'pages/problem-context.html', title: 'Problem Context' },
    { path: 'pages/system-overview.html', title: 'System Overview' },
    { path: 'pages/system-architecture.html', title: 'System Architecture' },
    { path: 'pages/ai-platform.html', title: 'AI Platform' },
    { path: 'pages/data-architecture.html', title: 'Data Architecture' },
    { path: 'pages/financial-data-processing.html', title: 'Financial Data Processing' },
    { path: 'pages/model-strategy.html', title: 'Model Strategy' },
    { path: 'pages/agent-architecture.html', title: 'Agent Architecture' },
    { path: 'pages/recommendation-engine.html', title: 'Recommendation Engine' },
    { path: 'pages/document-intelligence.html', title: 'Document Intelligence' },
    { path: 'pages/compliance.html', title: 'Compliance' },
    { path: 'pages/triggers.html', title: 'Triggers' },
    { path: 'pages/monitoring.html', title: 'Monitoring' },
    { path: 'pages/infrastructure.html', title: 'Infrastructure' },
    { path: 'pages/security.html', title: 'Security' },
    { path: 'pages/future-extensions.html', title: 'Future Extensions' }
  ];

  var base = '';
  function getBase() {
    if (base) return base;
    var path = window.location.pathname;
    if (path.indexOf('/pages/') !== -1) base = path.replace(/\/pages\/[^/]+$/, '/');
    else if (path.indexOf('/multiplus-ai-architecture') !== -1) base = path.replace(/\/[^/]*$/, '/');
    else base = './';
    return base;
  }

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function highlight(str, query) {
    if (!query || !str) return escapeHtml(str || '');
    var q = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var re = new RegExp('(' + q + ')', 'gi');
    return escapeHtml(str).replace(re, '<mark>$1</mark>');
  }

  function getPagePath(p) {
    var b = getBase();
    if (b === './' || b === '/') return p;
    return b + p;
  }

  var searchInput = document.getElementById('search-input');
  var resultsContainer = document.getElementById('search-results');
  if (!searchInput || !resultsContainer) return;

  var cache = {};
  var searchDebounce = null;

  function fetchPage(path) {
    if (cache[path]) return Promise.resolve(cache[path]);
    var full = getPagePath(path);
    return fetch(full)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var main = doc.querySelector('.main-content');
        var text = main ? main.innerText || main.textContent : '';
        cache[path] = { title: doc.querySelector('title') ? doc.querySelector('title').textContent : path, text: text };
        return cache[path];
      })
      .catch(function () { return { title: path, text: '' }; });
  }

  function runSearch(query) {
    query = (query || '').trim().toLowerCase();
    if (query.length < 2) {
      resultsContainer.classList.remove('visible');
      resultsContainer.innerHTML = '';
      return;
    }

    var promises = pages.map(function (p) { return fetchPage(p.path).then(function (data) { return { path: p.path, title: p.title, data: data }; }); });
    Promise.all(promises).then(function (results) {
      var out = [];
      results.forEach(function (r) {
        var title = r.data.title || r.title;
        var text = (r.data.text || '').toLowerCase();
        var titleLower = (title || '').toLowerCase();
        var inTitle = titleLower.indexOf(query) !== -1;
        var idx = text.indexOf(query);
        var snippet = '';
        if (idx !== -1) {
          var start = Math.max(0, idx - 40);
          var end = Math.min(text.length, idx + 80);
          snippet = (start > 0 ? '…' : '') + text.slice(start, end).replace(/\s+/g, ' ') + (end < text.length ? '…' : '');
        }
        if (inTitle || idx !== -1) {
          out.push({
            path: r.path,
            title: title,
            snippet: snippet,
            inTitle: inTitle
          });
        }
      });

      if (out.length === 0) {
        resultsContainer.innerHTML = '<div class="search-results-title">No results</div>';
      } else {
        resultsContainer.innerHTML = out.slice(0, 12).map(function (item) {
          var titleH = highlight(item.title, searchInput.value.trim());
          var snippetH = highlight(item.snippet, searchInput.value.trim());
          return '<a class="search-result-item" href="' + escapeHtml(getPagePath(item.path)) + '">' +
            '<strong>' + titleH + '</strong>' +
            (snippetH ? '<br><span class="search-snippet">' + snippetH + '</span>' : '') +
            '</a>';
        }).join('');
      }
      resultsContainer.classList.add('visible');
    });
  }

  searchInput.addEventListener('input', function () {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(function () { runSearch(searchInput.value); }, 200);
  });
  searchInput.addEventListener('focus', function () {
    if (searchInput.value.trim().length >= 2) runSearch(searchInput.value);
  });
  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var first = resultsContainer.querySelector('.search-result-item');
      if (first) { e.preventDefault(); first.click(); }
    }
  });

  document.addEventListener('click', function (e) {
    if (!resultsContainer.contains(e.target) && e.target !== searchInput) {
      resultsContainer.classList.remove('visible');
    }
  });
})();
