# Builds multiplus_document_tree.md from Multiplus_Ai.txt
import re
import os

BASE = os.path.dirname(os.path.abspath(__file__))
DOC = os.path.join(BASE, 'Multiplus_Ai.txt')
OUT = os.path.join(BASE, 'multiplus_document_tree.md')

with open(DOC, 'r', encoding='utf-8') as f:
    lines = f.readlines()

parts = []
for i, line in enumerate(lines):
    m = re.match(r'^PART\s+(\d+)\s+[—\-]\s+(.+)$', line.strip())
    if m:
        parts.append((int(m.group(1)), m.group(2).strip()))

sections = []
for i, line in enumerate(lines):
    m = re.match(r'^(\d+(?:\.\d+)*)\s+(.+)$', line.strip())
    if m:
        num = m.group(1)
        title = m.group(2).strip()
        if not re.match(r'^\d', title):
            sections.append((num, title))

def parent_key(num):
    p = num.split('.')
    if len(p) == 1:
        return 'P' + num
    return '.'.join(p[:-1])

def node_id(num):
    if num.isdigit():
        return 'P' + num
    return 'S' + num.replace('.', '_')

def esc(s):
    return s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ')

edges = []
node_labels = {}

node_labels['Root'] = 'Multiplus AI Financial Intelligence Platform Documentation'
for pnum, ptitle in parts:
    pid = 'P' + str(pnum)
    node_labels[pid] = 'PART ' + str(pnum) + ' — ' + ptitle
    edges.append(('Root', pid))

for num, title in sections:
    nid = node_id(num)
    pk = parent_key(num)
    pid = node_id(pk) if '.' in pk else 'P' + pk
    node_labels[nid] = num + ' ' + title
    edges.append((pid, nid))

out_lines = []
out_lines.append('flowchart TD')
out_lines.append('classDef default fill:#ffffff,stroke:#4da3ff,stroke-width:2px,color:#003366;')
out_lines.append('')

for nid in ['Root'] + ['P' + str(i) for i in range(1, 18)] + sorted([node_id(n) for n, _ in sections], key=lambda x: (x.count('_'), x)):
    if nid not in node_labels:
        continue
    lab = esc(node_labels[nid])[:100]
    out_lines.append(f'{nid}["{lab}"]')

out_lines.append('')
for a, b in edges:
    out_lines.append(f'{a} --> {b}')

out_lines.append('')
out_lines.append('class Root default')
for pid in ['P' + str(i) for i in range(1, 18)]:
    if pid in node_labels:
        out_lines.append(f'class {pid} default')
all_s = [node_id(n) for n, _ in sections]
if all_s:
    out_lines.append('class ' + ','.join(all_s) + ' default')

with open(OUT, 'w', encoding='utf-8') as f:
    f.write('\n'.join(out_lines))

print('Wrote', OUT)
print('Nodes:', len(node_labels), 'Edges:', len(edges))
