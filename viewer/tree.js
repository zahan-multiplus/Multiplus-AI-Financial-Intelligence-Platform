(function () {
  'use strict';

  var container = document.getElementById('tree-container');
  var contentPanel = document.getElementById('content-panel');
  var docContent = document.getElementById('doc-content');
  var searchInput = document.getElementById('docSearch');
  var treeData = null;
  var sectionContent = {};
  var expandedIds = null;
  var sectionObserver = null;

  function loadData(url) {
    return fetch(url).then(function (r) { return r.json(); });
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

  function findInData(data, id) {
    if (data.id === id) return data;
    if (data.children) {
      for (var i = 0; i < data.children.length; i++) {
        var found = findInData(data.children[i], id);
        if (found) return found;
      }
    }
    return null;
  }

  function collectSections(node, depth, out) {
    if (node.id && node.id !== 'root') out.push({ node: node, depth: depth });
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        collectSections(node.children[i], depth + 1, out);
      }
    }
  }

  function buildDocContent(data, contentMap) {
    var out = [];
    collectSections(data, 0, out);
    var minDepth = out.length ? out[0].depth : 0;
    for (var i = 0; i < out.length; i++) {
      if (out[i].depth < minDepth) minDepth = out[i].depth;
    }
    var html = '';
    for (var i = 0; i < out.length; i++) {
      var item = out[i];
      var n = item.node;
      var d = item.depth - minDepth;
      var id = n.id || '';
      var name = n.name || '';
      var tag = d === 0 ? 'h1' : (d === 1 ? 'h2' : 'h3');
      var body = contentMap[id] || '';
      html += '<section id="' + escapeAttr(id) + '">';
      html += '<' + tag + '>' + escapeHtml(name) + '</' + tag + '>';
      if (body) html += '<div class="doc-section-body">' + escapeHtml(body) + '</div>';
      html += '</section>';
    }
    return html;
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
  }

  function smoothScrollTo(target) {
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function setupDocContent() {
    if (!docContent || !treeData) return;
    docContent.innerHTML = buildDocContent(treeData, sectionContent);
    var sections = docContent.querySelectorAll('section[id]');
    if (sectionObserver) sectionObserver.disconnect();
    var visibleIds = new Set();
    var rafScheduled = false;
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
      { root: null, rootMargin: '-15% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  function expandPathToId(node, id) {
    if (!node) return false;
    if (node.id === id) return true;
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

    var row = '<div class="node">';
    row += '<button type="button" class="toggle' + (hasChildren && showAsExpanded ? ' expanded' : '') + '" data-id="' + escapeAttr(id) + '" aria-label="Toggle">' + (hasChildren ? '▶' : '') + '</button>';
    if (id) {
      row += '<a href="#' + escapeAttr(id) + '" class="label doc-node" data-id="' + escapeAttr(id) + '">' + escapeHtml(name) + '</a>';
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
    setupDocContent();
    filterTreeBySearch(searchInput ? searchInput.value : '');
    var hash = window.location.hash ? window.location.hash.slice(1) : '';
    if (hash && hash !== 'root') {
      var targetSection = document.getElementById(hash);
      if (targetSection) {
        setTimeout(function () { smoothScrollTo(targetSection); }, 50);
      }
      setActiveNode(hash);
    }
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
        e.preventDefault();
        var href = label.getAttribute('href');
        if (href && href.length > 1) {
          var id = href.slice(1);
          var target = document.getElementById(id);
          if (target) {
            smoothScrollTo(target);
            history.pushState(null, null, href);
          }
        }
      }
    });

  contentPanel.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (href && href.length > 1) {
      e.preventDefault();
      var id = href.slice(1);
      var target = document.getElementById(id);
      if (target) {
        smoothScrollTo(target);
        history.pushState(null, null, href);
      }
      setActiveNode(id);
    }
  });

  window.addEventListener('hashchange', function () {
    var hash = window.location.hash ? window.location.hash.slice(1) : '';
    if (!hash || hash === 'root') return;
    var target = document.getElementById(hash);
    if (target) smoothScrollTo(target);
    setActiveNode(hash);
  });

  function loadAndRender() {
    expandedIds = null;
    var treeUrl = 'data/document_tree.json';
    var contentUrl = 'data/section_content.json';
    Promise.all([loadData(treeUrl), loadData(contentUrl)]).then(function (results) {
      treeData = results[0];
      sectionContent = results[1] || {};
      render();
    }).catch(function (err) {
      console.error(err);
      container.innerHTML = '<p style="padding:20px;color:#9ca3af;">Failed to load tree. Serve this folder over HTTP (e.g. <code>python -m http.server 8080</code> from the project root).</p>';
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
