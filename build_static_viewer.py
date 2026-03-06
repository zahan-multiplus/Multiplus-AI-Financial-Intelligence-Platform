"""
Builds a single static index.html with all documentation and diagrams preloaded.
No dynamic loading; navigation is anchor-based scroll only.
"""
import json
import os
import re

BASE = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE, 'data')
CONTENT_DIR = os.path.join(BASE, 'content')
OUTPUT_HTML = os.path.join(BASE, 'index.html')
TREE_JSON = os.path.join(DATA_DIR, 'document_tree.json')


def escape(s):
    if not s:
        return ''
    return (s
            .replace('&', '&amp;')
            .replace('<', '&lt;')
            .replace('>', '&gt;')
            .replace('"', '&quot;'))


def get_page_order(tree):
    """Depth-first order of unique page filenames."""
    order = []
    seen = set()

    def walk(node):
        p = node.get('page')
        if p and p not in seen:
            seen.add(p)
            order.append(p)
        for c in node.get('children') or []:
            walk(c)

    walk(tree)
    return order


def collect_links(node, valid_ids=None):
    """Collect (anchor, name) for all nodes with an anchor under node. If valid_ids set, only include anchors in it."""
    out = []
    anchor = node.get('anchor') or (node.get('id') if not (node.get('children')) else None)
    name = node.get('name') or ''
    if anchor and name and anchor != 'root':
        if valid_ids is None or anchor in valid_ids:
            out.append((anchor, name))
    for c in node.get('children') or []:
        out.extend(collect_links(c, valid_ids))
    return out


def render_sidebar(tree, valid_ids=None):
    """Render sidebar nav: one expandable group per root child (PART). Only one group expanded at a time."""
    parts = tree.get('children') or []
    buf = []
    buf.append('<ul class="sidebar-tree">')
    for part in parts:
        part_id = part.get('id') or ''
        name = part.get('name') or ''
        links = collect_links(part, valid_ids)
        buf.append('<li class="sidebar-group" data-group-id="' + escape(part_id) + '">')
        buf.append('<div class="node">')
        buf.append('<button type="button" class="toggle" aria-label="Toggle">\u25b6</button>')
        buf.append('<span class="label">' + escape(name) + '</span>')
        buf.append('</div>')
        if links:
            buf.append('<div class="children-container collapsed"><div class="children collapsed"><ul>')
            for anchor, link_name in links:
                buf.append('<li class="tree-node">')
                buf.append('<div class="node">')
                buf.append('<span class="toggle-spacer"></span>')
                buf.append('<a href="#' + escape(anchor) + '" class="label">' + escape(link_name) + '</a>')
                buf.append('</div></li>')
            buf.append('</ul></div></div>')
        buf.append('</li>')
    buf.append('</ul>')
    return '\n'.join(buf)


def load_content():
    """Load tree and all page content in order."""
    with open(TREE_JSON, 'r', encoding='utf-8') as f:
        tree = json.load(f)
    page_order = get_page_order(tree)
    content_parts = []
    for page in page_order:
        path = os.path.join(CONTENT_DIR, page)
        if not os.path.isfile(path):
            continue
        with open(path, 'r', encoding='utf-8') as f:
            content_parts.append(f.read())
    return tree, ''.join(content_parts)


def main():
    tree, full_content = load_content()

    # Collect ids present in content so sidebar only links to existing sections
    id_pattern = re.compile(r'\bid=["\']([^"\']+)["\']')
    ids_in_content = set(id_pattern.findall(full_content))
    missing = set()
    for part in tree.get('children') or []:
        for a, _ in collect_links(part, None):
            if a not in ids_in_content:
                missing.add(a)
    if missing:
        print('Note: omitted', len(missing), 'sidebar links with no target in content')

    sidebar_html = render_sidebar(tree, ids_in_content)

    html = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Multiplus AI — Architecture Documentation</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { margin: 0; font-family: Inter, system-ui, sans-serif; background: #0a0e1a; color: #e6eefc; line-height: 1.6; }
    #app {
      display: grid;
      grid-template-columns: 280px 1fr;
      height: 100vh;
    }
    #sidebar {
      overflow-y: auto;
      padding: 16px;
      background: rgba(0,0,0,0.2);
      border-right: 1px solid rgba(255,255,255,0.08);
    }
    #content {
      overflow-y: auto;
      scroll-behavior: smooth;
      padding: 24px 40px 60px;
    }
    .search-bar { margin-bottom: 16px; position: relative; }
    .search-bar input {
      width: 100%;
      padding: 10px 12px 10px 36px;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.12);
      background: rgba(255,255,255,0.06);
      color: #fff;
      font-size: 14px;
      outline: none;
    }
    .search-bar input::placeholder { color: rgba(255,255,255,0.5); }
    .search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); opacity: 0.6; pointer-events: none; }
    .sidebar-tree { list-style: none; margin: 0; padding: 0; }
    .sidebar-group { margin: 2px 0; }
    .sidebar-group .node { display: flex; align-items: center; gap: 0; padding: 6px 0; }
    .sidebar-group .toggle {
      border: none; background: none; color: rgba(255,255,255,0.5); padding: 0; width: 20px; min-width: 20px;
      cursor: pointer; font-size: 10px;
    }
    .sidebar-group .toggle.expanded { transform: rotate(90deg); }
    .sidebar-group .label { flex: 1; font-size: 14px; font-weight: 600; color: #e6eefc; }
    .tree-node .node { display: flex; align-items: center; padding: 4px 0; padding-left: 20px; }
    .tree-node .toggle-spacer { width: 20px; min-width: 20px; }
    .tree-node .label { flex: 1; font-size: 13px; font-weight: 400; color: #e6eefc; text-decoration: none; }
    .tree-node .label:hover { color: #fff; }
    .children-container { overflow: hidden; transition: height 0.2s ease; }
    .children-container.collapsed { height: 0; }
    .children.collapsed { display: none; }
    #content h1 { margin: 0 0 24px; font-size: 22px; }
    #content h2 { margin: 36px 0 12px; font-size: 18px; }
    #content h3 { margin: 24px 0 8px; font-size: 16px; }
    #content p { margin: 0 0 1em; font-size: 15px; }
    #content ul { margin: 0 0 1em; padding-left: 1.5em; }
    #content pre.diagram-block { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 16px; overflow-x: auto; font-size: 13px; margin: 1em 0; }
    #content figure.diagram-figure { margin: 1.5em 0; min-height: 400px; }
    #content figure.diagram-figure img, #content figure.diagram-figure svg { width: 100%; max-width: 100%; height: auto; display: block; margin: 0 auto; }
    #content figure.diagram-figure figcaption { font-size: 13px; color: rgba(230,238,252,0.8); margin-top: 8px; text-align: center; }
    #content a { color: #7eb8ff; text-decoration: none; }
    #content a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div id="app">
    <aside id="sidebar">
      <div class="search-bar">
        <span class="search-icon" aria-hidden="true">&#128269;</span>
        <input id="search" type="text" placeholder="Search documentation..." autocomplete="off" />
      </div>
      <nav id="nav">
''' + sidebar_html + '''
      </nav>
    </aside>
    <main id="content">
''' + full_content + '''
    </main>
  </div>
  <script src="viewer.js"></script>
</body>
</html>'''

    with open(OUTPUT_HTML, 'w', encoding='utf-8') as f:
        f.write(html)
    print('Wrote', OUTPUT_HTML)
    print('Pages included:', len(get_page_order(tree)))


if __name__ == '__main__':
    main()
