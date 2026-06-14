"""MkDocs hook that copies the raw slide-source markdown into the built
site so the client-side slide viewer can fetch it same-origin.

MkDocs renders every `docs/**/*.md` to HTML and discards the raw
markdown. But `docs/slides/slide-viewer.html` needs the *unrendered*
markdown — it parses `##` headers into slides with marked.js in the
browser. Without this hook the viewer has to reach out to
raw.githubusercontent.com, which ties it to one hardcoded repo and
404s for any deck that only lives in this repo.

This hook copies `docs/slides/**/*.md` verbatim into the matching
`site/slides/**/*.md` path, alongside the rendered `index.html`, so a
relative `fetch('<deck>/index.md')` from slide-viewer.html resolves on
both `mkdocs serve` and GitHub Pages.

Loaded via the `hooks:` entry in mkdocs.yml (NOT under `plugins:`):

    hooks:
      - plugins/social_override.py
      - plugins/copy_slide_sources.py
"""

import os
import shutil


def on_post_build(config, **kwargs):
    """After the site is built, copy every slide-source .md file into the
    output directory verbatim so the viewer can fetch the raw markdown."""
    docs_dir = config['docs_dir']
    site_dir = config['site_dir']
    slides_src = os.path.join(docs_dir, 'slides')

    if not os.path.isdir(slides_src):
        return

    copied = 0
    for root, _dirs, files in os.walk(slides_src):
        for name in files:
            if not name.endswith('.md'):
                continue
            src_path = os.path.join(root, name)
            rel_path = os.path.relpath(src_path, docs_dir)
            dest_path = os.path.join(site_dir, rel_path)
            os.makedirs(os.path.dirname(dest_path), exist_ok=True)
            shutil.copy2(src_path, dest_path)
            copied += 1

    if copied:
        print(f"copy_slide_sources: copied {copied} slide .md file(s) into the build")
