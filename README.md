# Multiplus AI Architecture Documentation

Single-page documentation viewer for the **Multiplus AI Financial Intelligence Platform** architecture.

## Opening the site

- **Local:** Serve the folder with a static server (e.g. `python -m http.server 8000`), then open **http://localhost:8000/**.
- **Direct file:** Opening `index.html` in a browser may work for navigation, but content is loaded via fetch; for full functionality use a local server.

## Structure

- `index.html` — Documentation viewer (single entry point)
- `tree.js` — Navigation tree and content loading
- `data/document_tree.json` — Documentation tree (sections and hierarchy)
- `content/` — One HTML file per major section (preface, problem-context, system-overview, diagrams, etc.)
- `diagrams/` — Architecture and flow diagrams (SVG)

The viewer loads section content from `content/*.html` when you navigate. No build step is required for viewing. To regenerate the tree from source, run `python generate_doc_tree_json.py` (requires `multiplus_document_tree.md` and `Multiplus_Ai.txt`).
