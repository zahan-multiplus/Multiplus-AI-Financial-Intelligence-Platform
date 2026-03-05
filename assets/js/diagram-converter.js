/**
 * Converts text-based flow diagrams (pre.diagram-block and adjacent p nodes)
 * into Mermaid diagrams. Runs after DOM ready; requires Mermaid to be loaded.
 */
(function () {
  'use strict';

  function isArrowLine(text) {
    return /^\s*↓\s*$/.test(text);
  }

  function textToMermaid(text) {
    var lines = text.split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
    if (lines.length === 0) return null;
    var nodes = [];
    var i = 0;
    while (i < lines.length) {
      if (isArrowLine(lines[i])) {
        i++;
        continue;
      }
      nodes.push(lines[i]);
      i++;
    }
    if (nodes.length < 2) return null;
    var id = 'n';
    var linesOut = ['graph TD'];
    var ids = [];
    nodes.forEach(function (label, idx) {
      var nid = id + idx;
      ids.push(nid);
      var safe = label.replace(/"/g, '\\"');
      linesOut.push('  ' + nid + '["' + safe + '"]');
    });
    for (var j = 0; j < ids.length - 1; j++) {
      linesOut.push('  ' + ids[j] + ' --> ' + ids[j + 1]);
    }
    return linesOut.join('\n');
  }

  function collectDiagramRun(startPre) {
    var run = [];
    var prev = startPre.previousElementSibling;
    if (prev && prev.tagName === 'P' && prev.textContent.trim().length > 0 && prev.textContent.trim().length < 120) {
      run.push(prev);
    }
    run.push(startPre);
    var el = startPre;
    for (;;) {
      var next = el.nextElementSibling;
      if (!next) break;
      if (next.tagName === 'P' && next.textContent.trim().length > 0 && next.textContent.trim().length < 120) {
        run.push(next);
        el = next;
        continue;
      }
      if (next.classList && next.classList.contains('diagram-block')) {
        run.push(next);
        el = next;
        continue;
      }
      break;
    }
    return run;
  }

  function runToMermaid(run) {
    var parts = [];
    run.forEach(function (el) {
      if (el.tagName === 'P') {
        parts.push(el.textContent.trim());
      } else if (el.classList && el.classList.contains('diagram-block')) {
        var t = el.textContent.trim();
        if (t === '↓' || /^↓\s*$/.test(t)) parts.push('↓');
        else parts.push(t);
      }
    });
    var text = parts.join('\n');
    return textToMermaid(text);
  }

  function init() {
    var main = document.querySelector('.main-content');
    if (!main) return;

    var preBlocks = main.querySelectorAll('pre.diagram-block');
    var processed = new Set();

    preBlocks.forEach(function (pre) {
      if (processed.has(pre)) return;
      var run = collectDiagramRun(pre);
      if (run.length < 2) {
        var single = pre.textContent.trim();
        if (single === '↓') return;
        var mm = textToMermaid(single);
        if (mm) {
          var wrap = document.createElement('div');
          wrap.className = 'mermaid-wrap';
          var div = document.createElement('div');
          div.className = 'mermaid';
          div.textContent = mm;
          wrap.appendChild(div);
          pre.parentNode.replaceChild(wrap, pre);
        }
        processed.add(pre);
        return;
      }
      var mermaidSrc = runToMermaid(run);
      if (!mermaidSrc) return;
      var wrap = document.createElement('div');
      wrap.className = 'mermaid-wrap';
      var div = document.createElement('div');
      div.className = 'mermaid';
      div.textContent = mermaidSrc;
      wrap.appendChild(div);
      run.forEach(function (node) { processed.add(node); });
      run[0].parentNode.insertBefore(wrap, run[0]);
      run.forEach(function (node) { if (node.parentNode) node.parentNode.removeChild(node); });
    });
  }

  if (typeof mermaid === 'undefined') {
    window.addEventListener('load', function () {
      if (typeof mermaid !== 'undefined') {
        init();
        mermaid.run({ querySelector: '.mermaid', suppressErrors: true });
      }
    });
    return;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      mermaid.run({ querySelector: '.mermaid', suppressErrors: true });
    });
  } else {
    init();
    mermaid.run({ querySelector: '.mermaid', suppressErrors: true });
  }
})();
