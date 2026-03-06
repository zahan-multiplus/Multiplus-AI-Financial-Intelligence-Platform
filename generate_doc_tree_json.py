"""
Generates document_tree.json, viewer/data/part_*.json, and viewer/data/section_content.json
from multiplus_document_tree.md and Multiplus_Ai.txt.
"""
import json
import os
import re
from collections import deque

BASE = os.path.dirname(os.path.abspath(__file__))
TREE_FILE = os.path.join(BASE, 'multiplus_document_tree.md')
DOC_SOURCE = os.path.join(BASE, 'Multiplus_Ai.txt')
DOC_TREE_JSON = os.path.join(BASE, 'document_tree.json')
VIEWER_DATA = os.path.join(BASE, 'data')

PART_PAGES = {
    1: 'preface.html',
    2: 'problem-context.html',
    3: 'system-overview.html',
    4: 'system-architecture.html',
    5: 'ai-platform.html',
    6: 'data-architecture.html',
    7: 'financial-data-processing.html',
    8: 'model-strategy.html',
    9: 'agent-architecture.html',
    10: 'recommendation-engine.html',
    11: 'document-intelligence.html',
    12: 'compliance.html',
    13: 'triggers.html',
    14: 'monitoring.html',
    15: 'infrastructure.html',
    16: 'security.html',
    17: 'future-extensions.html',
}


def parse_tree_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    lines = [line.strip() for line in content.splitlines() if line.strip()]
    nodes = {}
    edges = []
    for line in lines:
        if line.startswith('flowchart') or line.startswith('classDef') or line.startswith('class '):
            continue
        if ' --> ' in line:
            a, _, b = line.partition(' --> ')
            edges.append((a.strip(), b.strip()))
            continue
        if '["' in line and line.endswith('"]'):
            idx = line.index('["')
            nid = line[:idx].strip()
            label = line[idx + 2:-2]
            nodes[nid] = label
            continue
    children = {}
    for a, b in edges:
        children.setdefault(a, []).append(b)
    return nodes, children


def node_sort_key(nid):
    if nid == 'Root':
        return (0,)
    if nid.startswith('P'):
        return (int(nid[1:]),)
    if nid.startswith('S'):
        parts = nid[1:].split('_')
        return tuple(int(x) for x in parts)
    return (0,)


def part_from_nid(nid):
    if nid.startswith('P'):
        return int(nid[1:])
    if nid.startswith('S'):
        return int(nid[1:].split('_')[0])
    return None


def nid_to_anchor(nid):
    if not nid.startswith('S'):
        return None
    return 's-' + nid[1:].replace('_', '-')


def nid_to_section_id(nid):
    """Unique id for hash and linking: root, 1, 1.1, 1.2.1, etc."""
    if nid == 'Root':
        return 'root'
    if nid.startswith('P'):
        return nid[1:]
    if nid.startswith('S'):
        return nid[1:].replace('_', '.')
    return nid


def to_json_node(nid, nodes, children, part_filter=None):
    if part_filter is not None:
        p = part_from_nid(nid)
        if p is not None and p != part_filter:
            return None
    name = nodes.get(nid, nid)
    obj = {"name": name, "id": nid_to_section_id(nid)}
    if nid == 'Root':
        pass
    elif nid.startswith('P'):
        obj["part"] = part_from_nid(nid)
        obj["page"] = PART_PAGES.get(obj["part"])
    else:
        anchor = nid_to_anchor(nid)
        if anchor:
            obj["anchor"] = anchor
            obj["page"] = PART_PAGES.get(part_from_nid(nid))
    kid_list = children.get(nid, [])
    if part_filter is not None and nid.startswith('P'):
        kid_list = [c for c in kid_list if part_from_nid(c) == part_filter]
    sorted_kids = sorted(kid_list, key=node_sort_key)
    child_nodes = []
    for c in sorted_kids:
        if part_filter is not None and part_from_nid(c) != part_filter:
            continue
        child_obj = to_json_node(c, nodes, children, part_filter)
        if child_obj is not None:
            child_nodes.append(child_obj)
    if child_nodes:
        obj["children"] = child_nodes
    return obj


def extract_section_content(doc_path, out_path):
    """Extract section body text from Multiplus_Ai.txt; write section_content.json."""
    if not os.path.isfile(doc_path):
        print('Skip section content (source doc not found):', doc_path)
        return
    with open(doc_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    section_starts = []
    for i, line in enumerate(lines):
        stripped = line.strip()
        m = re.match(r'^(\d+(?:\.\d+)*)\s+(.+)$', stripped)
        if m and m.group(2) and not re.match(r'^\d', m.group(2)):
            section_starts.append((m.group(1), i, 'section'))
        if re.match(r'^PART\s+\d+\s+[—\-]\s+', stripped):
            part_num = re.match(r'^PART\s+(\d+)\s+', stripped)
            if part_num:
                section_starts.append((part_num.group(1), i, 'part'))
    section_starts.sort(key=lambda x: (tuple(int(n) for n in x[0].split('.')), x[1]))
    content_by_id = {}
    for idx, (sec_id, start_line, kind) in enumerate(section_starts):
        if idx + 1 < len(section_starts):
            end_line = section_starts[idx + 1][1]
        else:
            end_line = len(lines)
        block = lines[start_line:end_line]
        text = ''.join(block).strip()
        content_by_id[sec_id] = text
    os.makedirs(os.path.dirname(out_path) or '.', exist_ok=True)
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(content_by_id, f, indent=0, ensure_ascii=False)
    print('Wrote', out_path, '(%d sections)' % len(content_by_id))


def main():
    nodes, children = parse_tree_file(TREE_FILE)
    if 'Root' not in nodes:
        raise SystemExit('Root node not found in tree file')

    full = to_json_node('Root', nodes, children, part_filter=None)
    os.makedirs(os.path.dirname(DOC_TREE_JSON) or '.', exist_ok=True)
    with open(DOC_TREE_JSON, 'w', encoding='utf-8') as f:
        json.dump(full, f, indent=2, ensure_ascii=False)
    print('Wrote', DOC_TREE_JSON)

    os.makedirs(VIEWER_DATA, exist_ok=True)
    with open(os.path.join(VIEWER_DATA, 'document_tree.json'), 'w', encoding='utf-8') as f:
        json.dump(full, f, indent=2, ensure_ascii=False)
    print('Wrote', os.path.join(VIEWER_DATA, 'document_tree.json'))

    extract_section_content(DOC_SOURCE, os.path.join(VIEWER_DATA, 'section_content.json'))


if __name__ == '__main__':
    main()
