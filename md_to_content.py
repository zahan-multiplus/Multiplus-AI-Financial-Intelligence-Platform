"""
Converts standalone Markdown docs to HTML fragments and writes them to content/.
Adds id attributes to h1, h2, h3 for anchor navigation.
Run from project root. After running, add the new pages to document_tree.json (PART 19 — REFERENCE)
and run build_static_viewer.py.
"""
import re
import os

try:
    import markdown
except ImportError:
    markdown = None

BASE = os.path.dirname(os.path.abspath(__file__))
CONTENT_DIR = os.path.join(BASE, 'content')

DOCS = [
    ('PLATFORM_AI_DATA_SCHEMAS.md', 'platform-ai-data-schemas'),
    ('AI_GATEWAY_API_CONTRACT.md', 'ai-gateway-api-contract'),
    ('AI_TRIGGER_EVENT_MODEL.md', 'ai-trigger-event-model'),
    ('AI_MODEL_STRATEGY.md', 'ai-model-strategy'),
    ('AI_INTEGRATION_ARCHITECTURE.md', 'ai-integration-architecture'),
    ('AI_ARCHITECTURE_DIAGRAMS.md', 'ai-architecture-diagrams'),
    ('AI_MODEL_SERVING_ARCHITECTURE.md', 'ai-model-serving-architecture'),
    ('AI_MODEL_LIFECYCLE.md', 'ai-model-lifecycle'),
    ('ARCHITECTURE_BOUNDARIES.md', 'architecture-boundaries'),
    ('ARCHITECTURE_IMPLEMENTATION_MAPPING.md', 'architecture-implementation-mapping'),
    ('ARCHITECTURE_REVIEW.md', 'architecture-review'),
    ('AI_INTEGRATION_REUSE_MATRIX.md', 'ai-integration-reuse-matrix'),
    ('AI_INFRASTRUCTURE_DIAGRAMS_PLANTUML.md', 'ai-infrastructure-diagrams-plantuml'),
    ('AI_WORKFLOW_DIAGRAMS.md', 'ai-workflow-diagrams'),
    ('AI_WORKFLOW_DIAGRAMS_PLANTUML.md', 'ai-workflow-diagrams-plantuml'),
    ('DOCUMENTATION_DIAGRAM_AUDIT.md', 'documentation-diagram-audit'),
    ('docs/PLATFORM_ARCHITECTURE_INTELLIGENCE.md', 'platform-architecture-intelligence'),
]


def slug(s):
    s = s.lower().strip()
    s = re.sub(r'[^a-z0-9\s-]', '', s)
    s = re.sub(r'[\s_]+', '-', s)
    return re.sub(r'-+', '-', s).strip('-')


def add_header_ids(html):
    """Add id attribute to h1, h2, h3 from slugified header text."""
    def repl(m):
        tag, inner = m.group(1), m.group(2)
        text_clean = re.sub(r'<[^>]+>', '', inner)
        id_val = slug(text_clean) or 'section'
        return '<%s id="%s">%s</%s>' % (tag, id_val, inner, tag)
    return re.sub(r'<(h[123])>([\s\S]*?)</\1>', repl, html)


def main():
    if not markdown:
        print('Install markdown: pip install markdown')
        return
    os.makedirs(CONTENT_DIR, exist_ok=True)
    md = markdown.Markdown(extensions=['extra', 'tables', 'fenced_code', 'nl2br'])
    for rel_path, slug_name in DOCS:
        path = os.path.join(BASE, rel_path)
        if not os.path.isfile(path):
            print('Skip (not found):', rel_path)
            continue
        with open(path, 'r', encoding='utf-8') as f:
            text = f.read()
        html = md.convert(text)
        html = add_header_ids(html)
        out_path = os.path.join(CONTENT_DIR, slug_name + '.html')
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(html)
        print('Wrote', out_path)
    print('Done. Add PART 19 — REFERENCE to document_tree.json and run build_static_viewer.py')


if __name__ == '__main__':
    main()
