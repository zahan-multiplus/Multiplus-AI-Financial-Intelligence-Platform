/**
 * Table of contents: generated from h1, h2, h3 on the current page.
 * Clicking scrolls to section; active section is highlighted on scroll.
 */
(function () {
  'use strict';

  var tocList = document.getElementById('toc-list');
  if (!tocList) return;

  var content = document.querySelector('.main-content');
  if (!content) return;

  var headings = content.querySelectorAll('h1, h2, h3');
  if (headings.length === 0) {
    tocList.innerHTML = '<li><span class="toc-empty">No headings on this page.</span></li>';
    return;
  }

  tocList.innerHTML = '';

  headings.forEach(function (h, i) {
    var id = h.id || 'section-' + (i + 1);
    if (!h.id) h.id = id;

    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = '#' + id;
    a.textContent = h.textContent.trim();
    a.className = 'toc-h' + h.tagName.charAt(1);
    li.appendChild(a);
    tocList.appendChild(li);
  });

  function setActive() {
    var fromTop = window.scrollY || document.documentElement.scrollTop;
    var headerHeight = 80;
    var current = null;
    headings.forEach(function (h) {
      var top = h.getBoundingClientRect().top + (window.scrollY || document.documentElement.scrollTop);
      if (top <= fromTop + headerHeight) current = h.id;
    });
    tocList.querySelectorAll('a').forEach(function (a) {
      var isActive = a.getAttribute('href') === '#' + current;
      a.classList.toggle('active', isActive);
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();
