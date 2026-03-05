# Wraps each _content.html in the full page template and writes the final .html files.

import os

BASE = os.path.dirname(os.path.abspath(__file__))
PAGES_DIR = os.path.join(BASE, 'pages')

SIDEBAR_LINKS = [
    ('index.html', 'Home'),
    ('pages/preface.html', 'Preface'),
    ('pages/problem-context.html', 'Problem Context'),
    ('pages/system-overview.html', 'System Overview'),
    ('pages/system-architecture.html', 'System Architecture'),
    ('pages/ai-platform.html', 'AI Platform'),
    ('pages/data-architecture.html', 'Data Architecture'),
    ('pages/financial-data-processing.html', 'Financial Data Processing'),
    ('pages/model-strategy.html', 'Model Strategy'),
    ('pages/agent-architecture.html', 'Agent Architecture'),
    ('pages/recommendation-engine.html', 'Recommendation Engine'),
    ('pages/document-intelligence.html', 'Document Intelligence'),
    ('pages/compliance.html', 'Compliance'),
    ('pages/triggers.html', 'Triggers'),
    ('pages/monitoring.html', 'Monitoring'),
    ('pages/infrastructure.html', 'Infrastructure'),
    ('pages/security.html', 'Security'),
    ('pages/future-extensions.html', 'Future Extensions'),
]

def sidebar_html():
    return '\n'.join(
        '<li><a href="{}">{}</a></li>'.format(href, label)
        for href, label in SIDEBAR_LINKS
    )

TEMPLATE = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <base href="../">
  <title>{title} — Multiplus AI Architecture</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <div class="layout">
    <header class="site-header">
      <div class="site-title-wrap">
        <h1 class="site-title">Multiplus AI Financial Intelligence Platform</h1>
        <p class="site-subtitle">Architecture Documentation</p>
      </div>
      <div class="search-wrap">
        <input type="search" id="search-input" class="search-input" placeholder="Search documentation…" aria-label="Search">
        <div id="search-results" aria-live="polite"></div>
      </div>
    </header>
    <nav class="sidebar">
      <ul class="sidebar-nav">
{sidebar}
      </ul>
    </nav>
    <main class="main-content">
{content}
    </main>
    <aside class="toc-panel">
      <h2 class="toc-title">On this page</h2>
      <ul id="toc-list" class="toc-list"></ul>
    </aside>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
  <script src="assets/js/navigation.js"></script>
  <script src="assets/js/toc.js"></script>
  <script src="assets/js/search.js"></script>
  <script src="assets/js/diagram-converter.js"></script>
  <script>mermaid.initialize({{ startOnLoad: false, theme: "dark" }});</script>
</body>
</html>
'''

MAP = [
    ('preface_content.html', 'preface.html', 'Preface'),
    ('problem-context_content.html', 'problem-context.html', 'Problem Context'),
    ('system-overview_content.html', 'system-overview.html', 'System Overview'),
    ('system-architecture_content.html', 'system-architecture.html', 'System Architecture'),
    ('ai-platform_content.html', 'ai-platform.html', 'AI Platform'),
    ('data-architecture_content.html', 'data-architecture.html', 'Data Architecture'),
    ('financial-data-processing_content.html', 'financial-data-processing.html', 'Financial Data Processing'),
    ('model-strategy_content.html', 'model-strategy.html', 'Model Strategy'),
    ('agent-architecture_content.html', 'agent-architecture.html', 'Agent Architecture'),
    ('recommendation-engine_content.html', 'recommendation-engine.html', 'Recommendation Engine'),
    ('document-intelligence_content.html', 'document-intelligence.html', 'Document Intelligence'),
    ('compliance_content.html', 'compliance.html', 'Compliance'),
    ('triggers_content.html', 'triggers.html', 'Triggers'),
    ('monitoring_content.html', 'monitoring.html', 'Monitoring'),
    ('infrastructure_content.html', 'infrastructure.html', 'Infrastructure'),
    ('security_content.html', 'security.html', 'Security'),
    ('future-extensions_content.html', 'future-extensions.html', 'Future Extensions'),
]

def main():
    sidebar = sidebar_html()
    for src, out_name, title in MAP:
        src_path = os.path.join(PAGES_DIR, src)
        out_path = os.path.join(PAGES_DIR, out_name)
        with open(src_path, 'r', encoding='utf-8') as f:
            content = f.read()
        html = TEMPLATE.format(title=title, sidebar=sidebar, content=content)
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(html)
        print('Wrote', out_path)

if __name__ == '__main__':
    main()
