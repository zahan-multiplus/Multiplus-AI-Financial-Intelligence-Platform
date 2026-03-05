# Script to convert Multiplus_Ai.txt into HTML content for each page.
# Run from multiplus-ai-architecture: python build_docs.py
# Reads ../Multiplus_Ai.txt and writes HTML fragments to pages/

import re
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DOC_PATH = os.path.join(BASE_DIR, '..', 'Multiplus_Ai.txt')
OUT_DIR = os.path.join(BASE_DIR, 'pages')

PART_BOUNDARIES = [
    (1, "Preface", "preface.html", 1, 797),
    (2, "Problem Context", "problem-context.html", 798, 1741),
    (3, "System Overview", "system-overview.html", 1742, 2680),
    (4, "System Architecture", "system-architecture.html", 2681, 3214),
    (5, "AI Platform Design", "ai-platform.html", 3215, 5302),
    (6, "Data Architecture", "data-architecture.html", 5303, 7623),
    (7, "Financial Data Processing", "financial-data-processing.html", 7624, 10309),
    (8, "Model Strategy", "model-strategy.html", 10310, 12300),
    (9, "AI Agent Architecture", "agent-architecture.html", 12301, 14835),
    (10, "Recommendation Engine", "recommendation-engine.html", 14836, 17660),
    (11, "Document Intelligence", "document-intelligence.html", 17661, 19670),
    (12, "Compliance", "compliance.html", 19671, 21501),
    (13, "AI Triggers", "triggers.html", 21502, 22909),
    (14, "Monitoring", "monitoring.html", 22910, 24314),
    (15, "Infrastructure", "infrastructure.html", 24315, 26369),
    (16, "Security", "security.html", 26370, 28463),
    (17, "Future Extensions", "future-extensions.html", 28464, 30546),
]

def escape(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')

def is_arrow_line(line):
    stripped = line.strip()
    return stripped == '↓' or (len(stripped) < 5 and '↓' in line)

def is_section_h2(line):
    m = re.match(r'^(\d+)\.(\d+)\s+(.+)$', line)
    return m and len(m.group(3).strip()) > 0 and not re.match(r'^\d', m.group(3))

def is_section_h3(line):
    m = re.match(r'^(\d+)\.(\d+)\.(\d+)\s+(.+)$', line)
    return m and len(m.group(4).strip()) > 0

def is_part_title(line):
    return re.match(r'^PART\s+\d+\s+—\s+.+', line.strip())

def looks_like_list_intro(line):
    s = line.strip()
    if not s.endswith(':'):
        return False
    lower = s.lower()
    return any(x in lower for x in [
        'include', 'including', 'such as', 'by:', 'follows:', 'following',
        'functions:', 'steps:', 'objectives', 'capabilities', 'examples',
        'may include', 'operations', 'components', 'responsibilities',
        'key ', 'primary ', 'typical ', 'several ', 'multiple '
    ]) or re.search(r'\b(include|such as|by|the following|steps)\s*:$', lower)

def convert_chunk(lines):
    out = []
    i = 0
    in_list = False
    list_items = []
    in_diagram = False
    diagram_lines = []
    in_para = False
    para_lines = []

    def flush_list():
        nonlocal list_items, in_list
        if list_items:
            out.append('<ul>')
            for li in list_items:
                out.append('<li>' + escape(li.strip()) + '</li>')
            out.append('</ul>')
        list_items = []
        in_list = False

    def flush_diagram():
        nonlocal diagram_lines, in_diagram
        if diagram_lines:
            text = '\n'.join(diagram_lines)
            out.append('<pre class="diagram-block">' + escape(text) + '</pre>')
        diagram_lines = []
        in_diagram = False

    def flush_para():
        nonlocal para_lines, in_para
        if para_lines:
            text = ' '.join(para_lines).strip()
            if text:
                out.append('<p>' + escape(text) + '</p>')
        para_lines = []
        in_para = False

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        if not stripped:
            flush_diagram()
            flush_para()
            if not in_list:
                flush_list()
            i += 1
            continue

        if is_part_title(line):
            flush_list()
            flush_diagram()
            flush_para()
            title = re.sub(r'^PART\s+\d+\s+—\s+', '', stripped)
            out.append('<h1 id="part">' + escape(title) + '</h1>')
            i += 1
            continue

        if is_section_h2(line):
            flush_list()
            flush_diagram()
            flush_para()
            m = re.match(r'^(\d+)\.(\d+)\s+(.+)$', line)
            title = m.group(3).strip()
            out.append('<h2 id="s-' + m.group(1) + '-' + m.group(2) + '">' + escape(title) + '</h2>')
            i += 1
            continue

        if is_section_h3(line):
            flush_list()
            flush_diagram()
            flush_para()
            m = re.match(r'^(\d+)\.(\d+)\.(\d+)\s+(.+)$', line)
            title = m.group(4).strip()
            out.append('<h3 id="s-' + m.group(1) + '-' + m.group(2) + '-' + m.group(3) + '">' + escape(title) + '</h3>')
            i += 1
            continue

        # Diagram: current line is a potential node and next line is arrow -> start diagram and collect full flow
        if not in_diagram and not in_list and i + 1 < len(lines):
            next_stripped = lines[i + 1].strip()
            if is_arrow_line(lines[i + 1]) or (next_stripped == '↓'):
                flush_para()
                in_diagram = True
                diagram_lines.append(line.rstrip())
                i += 1
                continue

        if in_diagram:
            if is_arrow_line(line) or (line.startswith('        ') and len(stripped) < 70 and '↓' in line) or (stripped and len(stripped) < 70 and not re.match(r'^\d+\.\d+', stripped)):
                diagram_lines.append(line.rstrip())
                i += 1
                continue
            else:
                flush_diagram()

        if looks_like_list_intro(stripped) and not in_list and not in_diagram:
            flush_diagram()
            flush_para()
            out.append('<p>' + escape(stripped) + '</p>')
            in_list = True
            i += 1
            continue

        if in_list:
            if re.match(r'^\d+\.\d+', stripped):
                flush_list()
            elif len(stripped) < 140 and not (stripped.endswith('.') and len(stripped) > 80):
                list_items.append(stripped)
                i += 1
                continue
            else:
                flush_list()

        if stripped.endswith('.') or len(stripped) > 90 or re.match(r'^[A-Z]', stripped):
            in_para = True
            para_lines.append(stripped)
            i += 1
            continue

        if in_list and stripped:
            list_items.append(stripped)
        elif para_lines and stripped:
            para_lines.append(stripped)
        else:
            flush_list()
            out.append('<p>' + escape(stripped) + '</p>')
        i += 1

    flush_list()
    flush_diagram()
    flush_para()
    return '\n'.join(out)

def main():
    with open(DOC_PATH, 'r', encoding='utf-8') as f:
        all_lines = f.readlines()

    os.makedirs(OUT_DIR, exist_ok=True)

    for part_num, title, filename, start, end in PART_BOUNDARIES:
        chunk = all_lines[start - 1:end]
        html_content = convert_chunk(chunk)
        out_path = os.path.join(OUT_DIR, filename.replace('.html', '_content.html'))
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print('Wrote', out_path)

if __name__ == '__main__':
    main()
