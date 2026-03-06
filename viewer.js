(function () {
  'use strict';

  var sidebar = document.getElementById('sidebar');
  var content = document.getElementById('content');
  var searchInput = document.getElementById('search');
  var nav = document.getElementById('nav');

  if (!sidebar || !content || !nav) return;

  // ---- Search: filter sidebar by text ----
  function filterSidebar(query) {
    var q = (query || '').trim().toLowerCase();
    var groups = nav.querySelectorAll('.sidebar-group');
    groups.forEach(function (group) {
      var label = group.querySelector('.label');
      var links = group.querySelectorAll('.tree-node .label');
      var match = !q || (label && label.textContent.toLowerCase().indexOf(q) !== -1) ||
        Array.prototype.some.call(links, function (l) { return l.textContent.toLowerCase().indexOf(q) !== -1; });
      group.style.display = match ? '' : 'none';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () { filterSidebar(searchInput.value); });
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { searchInput.value = ''; filterSidebar(''); searchInput.blur(); }
    });
  }

  // ---- Accordion: only one group expanded at a time ----
  function collapseAll() {
    nav.querySelectorAll('.sidebar-group').forEach(function (group) {
      var container = group.querySelector('.children-container');
      var toggle = group.querySelector('.toggle');
      if (container) container.classList.add('collapsed');
      if (toggle) toggle.classList.remove('expanded');
      var children = group.querySelector('.children');
      if (children) children.classList.add('collapsed');
    });
  }

  function expandGroup(group) {
    var container = group.querySelector('.children-container');
    var toggle = group.querySelector('.toggle');
    var children = group.querySelector('.children');
    if (container) container.classList.remove('collapsed');
    if (toggle) toggle.classList.add('expanded');
    if (children) children.classList.remove('collapsed');
  }

  nav.addEventListener('click', function (e) {
    var toggle = e.target.closest('.sidebar-group .toggle');
    if (!toggle) return;
    e.preventDefault();
    var group = toggle.closest('.sidebar-group');
    if (!group) return;
    var container = group.querySelector('.children-container');
    if (!container) return;
    var isExpanded = !container.classList.contains('collapsed');
    collapseAll();
    if (!isExpanded) expandGroup(group);
  });

  // ---- Link click: scroll content to section (no load, no replace) ----
  function scrollToAnchor(id) {
    var el = document.getElementById(id);
    if (!el || !content) return;
    var top = el.getBoundingClientRect().top - content.getBoundingClientRect().top + content.scrollTop;
    content.scrollTo({ top: Math.max(0, top - 20), behavior: 'smooth' });
  }

  sidebar.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (href.length <= 1) return;
    var id = href.slice(1);
    e.preventDefault();
    scrollToAnchor(id);
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', href);
    }
  });

  content.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (href.length <= 1) return;
    var id = href.slice(1);
    if (!document.getElementById(id)) return;
    e.preventDefault();
    scrollToAnchor(id);
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', href);
    }
  });

  // Initial hash scroll
  var hash = window.location.hash ? window.location.hash.slice(1) : '';
  if (hash && document.getElementById(hash)) {
    setTimeout(function () { scrollToAnchor(hash); }, 100);
  }
})();
