# Multiplus AI Architecture Documentation

Static single-page documentation for the **Multiplus AI Financial Intelligence Platform** architecture.

## Opening the site

- **Local:** Serve the folder with a static server (e.g. `python -m http.server 8000`), then open **http://localhost:8000/**.
- **Direct file:** Opening `index.html` in a browser works; all content and diagrams are preloaded.

## Structure

- `index.html` — Static documentation viewer (built; single entry point with all content inline)
- `viewer.js` — Search, sidebar accordion (one group expanded at a time), and anchor scroll
- `data/document_tree.json` — Documentation tree (sections and hierarchy)
- `content/` — One HTML file per major section (preface, problem-context, system-overview, diagrams, etc.)
- `assets/diagrams/` — Architecture and flow diagrams (SVG)

The viewer is **static**: all documentation and diagrams are present in the page at load. Navigation only scrolls to anchors; no dynamic loading or fetch.

## Build

To regenerate `index.html` from `content/` and `data/document_tree.json`:

```bash
python build_static_viewer.py
```

To regenerate the tree from source, run `python generate_doc_tree_json.py` (requires `multiplus_document_tree.md` and `Multiplus_Ai.txt`).
