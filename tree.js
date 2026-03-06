(function () {
  'use strict';

  var container = document.getElementById('tree-container');
  var contentPanel = document.getElementById('content-panel');
  var docContent = document.getElementById('doc-content');
  var searchInput = document.getElementById('docSearch');
  var treeData = null;
  var expandedIds = null;
  var sectionObserver = null;
  var pageContentCache = {};
  var contentBase = 'content/';
  var anchorToPage = {};
  var currentPage = null;

  function loadData(url) {
    return fetch(url).then(function (r) { return r.json(); });
  }

  function loadPageContent(page) {
    if (pageContentCache[page]) return Promise.resolve(pageContentCache[page]);
    var url = contentBase + page;
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error('Failed to load ' + url);
      return r.text();
    }).then(function (html) {
      pageContentCache[page] = html;
      return html;
    });
  }

  function findInData(data, id) {
    if (data.id === id) return data;
    if (data.anchor === id) return data;
    if (data.children) {
      for (var i = 0; i < data.children.length; i++) {
        var found = findInData(data.children[i], id);
        if (found) return found;
      }
    }
    return null;
  }

  function getPageForId(id) {
    if (!treeData || !id || id === 'root') return null;
    var node = findInData(treeData, id);
    if (node && node.page) return node.page;
    return anchorToPage[id] || null;
  }

  function buildAnchorToPage(node) {
    if (!node) return;
    if (node.anchor && node.page) anchorToPage[node.anchor] = node.page;
    if (node.children) node.children.forEach(buildAnchorToPage);
  }

  function getFirstSectionId(data) {
    if (data.id && data.id !== 'root') return data.id;
    if (data.children && data.children.length) return getFirstSectionId(data.children[0]);
    return null;
  }

  function filterTreeBySearch(value) {
    var query = (value || '').trim().toLowerCase();
    var nodes = document.querySelectorAll('.tree-node');
    if (!nodes.length) return;

    function getChildNodes(li) {
      var ul = li.querySelector(':scope > .children-container .children ul');
      return ul ? Array.from(ul.querySelectorAll(':scope > li.tree-node')) : [];
    }

    var visible = new Set();
    if (query === '') {
      nodes.forEach(function (node) { visible.add(node); });
    } else {
      nodes.forEach(function (node) {
        var title = (node.getAttribute('data-title') || '').toLowerCase();
        if (title.indexOf(query) !== -1) visible.add(node);
      });
      var changed = true;
      while (changed) {
        changed = false;
        nodes.forEach(function (node) {
          if (visible.has(node)) return;
          var children = getChildNodes(node);
          for (var i = 0; i < children.length; i++) {
            if (visible.has(children[i])) {
              visible.add(node);
              changed = true;
              break;
            }
          }
        });
      }
    }

    nodes.forEach(function (node) {
      node.style.display = visible.has(node) ? '' : 'none';
    });
  }

  function escapeHtml(s) {
    if (!s) return '';
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }
  function escapeAttr(s) {
    if (!s) return '';
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function setActiveNode(id) {
    if (!container) return;
    container.querySelectorAll('.node').forEach(function (el) {
      var label = el.querySelector('.label');
      var elId = label ? (label.getAttribute('data-id') || (label.getAttribute('href') || '').slice(1)) : '';
      el.classList.toggle('active', elId === id);
    });
    ensureParentExpanded(id);
  }

  function ensureParentExpanded(id) {
    if (!container || !id || !expandedIds) return;
    var labelEl = null;
    container.querySelectorAll('.label[data-id]').forEach(function (el) {
      if (el.getAttribute('data-id') === id) labelEl = el;
    });
    if (!labelEl) return;
    var ourLi = labelEl.closest('li.tree-node');
    if (!ourLi) return;
    var ul = ourLi.closest('ul');
    if (!ul) return;
    var parentLi = ul.closest('li.tree-node');
    if (!parentLi || parentLi === ourLi || !parentLi.classList.contains('has-children')) return;
    var toggle = parentLi.querySelector('.toggle');
    if (!toggle) return;
    var nodeId = toggle.getAttribute('data-id');
    if (!nodeId || expandedIds.has(nodeId)) return;
    expandedIds.add(nodeId);
    var childContainer = parentLi.querySelector('.children-container');
    if (childContainer) runExpandAnimation(childContainer);
  }

  function getScrollContainer() {
    if (contentPanel && contentPanel.scrollHeight > contentPanel.clientHeight) return contentPanel;
    return null;
  }

  function smoothScrollTo(target) {
    if (!target) return;
    var scrollContainer = getScrollContainer();
    if (scrollContainer) {
      var top = target.getBoundingClientRect().top - scrollContainer.getBoundingClientRect().top + scrollContainer.scrollTop;
      scrollContainer.scrollTo({ top: Math.max(0, top - 20), behavior: 'smooth' });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function scrollContentToTop() {
    var scrollContainer = getScrollContainer();
    if (scrollContainer) scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function setupSectionObserver() {
    if (!docContent) return;
    var sections = docContent.querySelectorAll('[id]');
    if (sectionObserver) sectionObserver.disconnect();
    var visibleIds = new Set();
    var rafScheduled = false;
    var scrollRoot = getScrollContainer();
    function updateActive() {
      rafScheduled = false;
      if (visibleIds.size === 0) return;
      var topmost = null;
      var topY = Infinity;
      visibleIds.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) {
          var y = el.getBoundingClientRect().top;
          if (y < topY) { topY = y; topmost = id; }
        }
      });
      if (topmost) setActiveNode(topmost);
    }
    sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var id = entry.target.id;
          if (!id) return;
          if (entry.isIntersecting) visibleIds.add(id);
          else visibleIds.delete(id);
        });
        if (!rafScheduled) {
          rafScheduled = true;
          requestAnimationFrame(updateActive);
        }
      },
      { root: scrollRoot || null, rootMargin: '-40% 0px -40% 0px', threshold: 0.2 }
    );
    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  function showPageForId(id, thenScroll) {
    var page = getPageForId(id);
    if (!page) return Promise.resolve();
    return loadPageContent(page).then(function (html) {
      docContent.innerHTML = html;
      docContent.setAttribute('data-current-page', page);
      setupSectionObserver();
      if (thenScroll !== false) {
        var target = document.getElementById(id);
        if (target) {
          setTimeout(function () { smoothScrollTo(target); }, 50);
        } else {
          setTimeout(function () { scrollContentToTop(); }, 50);
        }
      }
      setActiveNode(id);
    });
  }

  function expandPathToId(node, id) {
    if (!node) return false;
    if (node.id === id || node.anchor === id) return true;
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        if (expandPathToId(node.children[i], id)) {
          expandedIds.add(node.id);
          return true;
        }
      }
    }
    return false;
  }

  function buildInitialExpanded(data) {
    var set = new Set();
    set.add('root');
    return set;
  }

  function renderNode(node, justExpandedId) {
    var children = node.children || [];
    var hasChildren = children.length > 0;
    var isExpanded = expandedIds.has(node.id);
    var id = node.id || '';
    var name = node.name || '';
    var animateExpand = id === justExpandedId;
    var showAsExpanded = isExpanded && !animateExpand;

    var fragmentId = (node.anchor || node.id) || '';
    var row = '<div class="node">';
    row += '<button type="button" class="toggle' + (hasChildren && showAsExpanded ? ' expanded' : '') + '" data-id="' + escapeAttr(id) + '" aria-label="Toggle">' + (hasChildren ? '▶' : '') + '</button>';
    if (id) {
      row += '<a href="#' + escapeAttr(fragmentId) + '" class="label doc-node" data-id="' + escapeAttr(fragmentId) + '">' + escapeHtml(name) + '</a>';
    } else {
      row += '<span class="label" data-id="">' + escapeHtml(name) + '</span>';
    }
    row += '</div>';

    var block = '';
    if (hasChildren) {
      var containerClass = showAsExpanded ? 'children-container' : 'children-container collapsed';
      var childrenClass = showAsExpanded ? 'children' : 'children collapsed';
      block = '<div class="' + containerClass + '" data-id="' + escapeAttr(id) + '"><div class="' + childrenClass + '"><ul>';
      children.forEach(function (child) {
        var childTitle = escapeAttr(child.name || '');
        block += '<li class="tree-node' + ((child.children && child.children.length) ? ' has-children' : '') + '" data-title="' + childTitle + '">' + renderNode(child, justExpandedId) + '</li>';
      });
      block += '</ul></div></div>';
    }
    return row + block;
  }

  function renderTree(data, justExpandedId) {
    if (!data) return '';
    var hasChildren = data.children && data.children.length;
    var rootTitle = escapeAttr(data.name || '');
    return '<ul class="tree"><li class="tree-node' + (hasChildren ? ' has-children' : '') + '" data-title="' + rootTitle + '">' + renderNode(data, justExpandedId) + '</li></ul>';
  }

  function runExpandAnimation(containerEl) {
    if (!containerEl) return;
    var childrenEl = containerEl.querySelector('.children');
    if (!childrenEl || !childrenEl.classList.contains('collapsed')) return;
    var ul = containerEl.querySelector('ul');
    var targetH = ul ? ul.scrollHeight : 0;
    containerEl.classList.remove('collapsed');
    containerEl.style.height = targetH + 'px';
    childrenEl.classList.remove('collapsed');
    var li = containerEl.closest('li');
    if (li) {
      var toggleBtn = li.querySelector('.toggle');
      if (toggleBtn) toggleBtn.classList.add('expanded');
    }
    var onEnd = function () {
      containerEl.removeEventListener('transitionend', onEnd);
      containerEl.style.height = 'auto';
    };
    containerEl.addEventListener('transitionend', onEnd);
  }

  function runCollapseAnimation(containerEl, onDone) {
    if (!containerEl) { if (onDone) onDone(); return; }
    var childrenEl = containerEl.querySelector('.children');
    var li = containerEl.closest('li');
    if (li) {
      var toggleBtn = li.querySelector('.toggle');
      if (toggleBtn) toggleBtn.classList.remove('expanded');
    }
    if (childrenEl) childrenEl.classList.add('collapsed');
    var h = containerEl.offsetHeight;
    containerEl.style.height = h + 'px';
    containerEl.offsetHeight;
    containerEl.classList.add('collapsed');
    containerEl.style.removeProperty('height');
    var onEnd = function () {
      containerEl.removeEventListener('transitionend', onEnd);
      if (onDone) onDone();
    };
    containerEl.addEventListener('transitionend', onEnd);
  }

  function render(justExpandedId) {
    if (!treeData || !container) return;
    var hash = window.location.hash ? window.location.hash.slice(1) : '';
    if (!expandedIds) {
      expandedIds = buildInitialExpanded(treeData);
      if (hash && hash !== 'root') {
        expandPathToId(treeData, hash);
      }
    }
    container.innerHTML = renderTree(treeData, justExpandedId);
    if (justExpandedId) {
      setTimeout(function () {
        var labelEl = container.querySelector('.label[data-id="' + justExpandedId + '"]');
        if (labelEl) {
          var nodeEl = labelEl.closest('.node');
          var li = nodeEl ? nodeEl.closest('li') : null;
          var childContainer = li ? li.querySelector('.children-container') : null;
          runExpandAnimation(childContainer);
        }
      }, 10);
    }
    filterTreeBySearch(searchInput ? searchInput.value : '');
  }

  function navigateToId(id) {
    var page = getPageForId(id);
    if (!page) return;
    showPageForId(id).then(function () {
      history.pushState(null, null, '#' + id);
    });
  }

  container.addEventListener('click', function (e) {
    var toggle = e.target.closest('.toggle');
    if (toggle) {
      e.preventDefault();
      e.stopPropagation();
      var id = toggle.getAttribute('data-id');
      if (!id) return;
      if (expandedIds.has(id)) {
        var li = toggle.closest('li');
        var childContainer = li ? li.querySelector('.children-container') : null;
        runCollapseAnimation(childContainer, function () {
          expandedIds.delete(id);
          render();
        });
      } else {
        expandedIds.add(id);
        render(id);
      }
      return;
    }
    var label = e.target.closest('.label');
    if (label && label.classList.contains('doc-node')) {
      var href = label.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        var id = href.slice(1);
        var li = label.closest('li.tree-node');
        var nodeId = (li && li.classList.contains('has-children')) ? (li.querySelector('.toggle') && li.querySelector('.toggle').getAttribute('data-id')) : null;
        var currentPage = getPageForId(id);
        var currentContentPage = docContent.getAttribute('data-current-page') || (docContent.querySelector('[id]') ? getPageForId(docContent.querySelector('[id]').id) : null);
        if (currentPage === currentContentPage) {
          var target = document.getElementById(id);
          if (target) {
            smoothScrollTo(target);
            history.pushState(null, null, href);
            setActiveNode(id);
          }
        } else {
          navigateToId(id);
        }
        if (nodeId && !expandedIds.has(nodeId)) {
          expandedIds.add(nodeId);
          render(nodeId);
        }
      }
    }
  });

  contentPanel.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (href && href.length > 1) {
      var id = href.slice(1);
      var target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        smoothScrollTo(target);
        history.pushState(null, null, href);
        setActiveNode(id);
      } else {
        e.preventDefault();
        navigateToId(id);
      }
    }
  });

  window.addEventListener('hashchange', function () {
    var hash = window.location.hash ? window.location.hash.slice(1) : '';
    if (!hash || hash === 'root') return;
    var target = document.getElementById(hash);
    if (target) {
      smoothScrollTo(target);
      setActiveNode(hash);
    } else {
      navigateToId(hash);
    }
  });

  function loadAndRender() {
    expandedIds = null;
    var treeUrl = 'data/document_tree.json';
    loadData(treeUrl).then(function (data) {
      treeData = data;
      buildAnchorToPage(treeData);
      anchorToPage['s-11-5-2b'] = 'document-intelligence.html';
      anchorToPage['s-10-9-11b'] = 'recommendation-engine.html';
      render();
      var hash = window.location.hash ? window.location.hash.slice(1) : '';
      var initialId = (hash && hash !== 'root') ? hash : getFirstSectionId(treeData);
      if (initialId) {
        showPageForId(initialId).then(function () {
          if (!hash && initialId) history.replaceState(null, null, '#' + initialId);
        });
      }
    }).catch(function (err) {
      console.error(err);
      container.innerHTML = '<p style="padding:20px;color:#9ca3af;">Failed to load tree. Serve this folder over HTTP (e.g. <code>python -m http.server 8000</code> from the project root).</p>';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      filterTreeBySearch(searchInput.value);
    });
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        searchInput.value = '';
        filterTreeBySearch('');
        searchInput.blur();
      }
    });
  }

  loadAndRender();
})();
