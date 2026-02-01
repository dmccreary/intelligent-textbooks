# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an educational resource repository for building intelligent textbooks using MkDocs with the Material theme. The project demonstrates how to create interactive educational content with microsimulations (MicroSims) using p5.js, learning graphs for concept dependencies, and AI-powered content generation workflows.

## Development Commands

### Local Development
```bash
# Install dependencies (requires conda environment)
conda create -n mkdocs python=3
conda activate mkdocs
pip install mkdocs "mkdocs-material[imaging]"

# Build the site locally
mkdocs build

# Run local development server
mkdocs serve
# Site will be available at http://localhost:8000

# Deploy to GitHub Pages
mkdocs gh-deploy
```

### Image Processing Dependencies (macOS)
For social card generation, install additional dependencies:
```bash
brew install cairo freetype libffi libjpeg libpng zlib
export DYLD_FALLBACK_LIBRARY_PATH=/opt/homebrew/lib
```

## Architecture

### Core Components

**MkDocs Site Structure**: Standard MkDocs project with Material theme, organized into educational sections (Tutorial, Concepts, Prompts, Workflows, MicroSims, Case Studies).

**MicroSims**: Interactive p5.js simulations embedded via iframes. Each MicroSim has:
- `index.md` - Documentation and embedding
- `main.html` - Standalone HTML page
- `*.js` - p5.js simulation code
- Template structure in `docs/sims/templates/`

**Custom Social Override Plugin**: Python plugin (`plugins/social_override.py`) that allows pages to specify custom Open Graph images via metadata instead of auto-generated social cards.

**Learning Graphs**: Concept dependency visualizations stored as CSV/JSON data in `docs/sims/learning-graph/` with interactive graph viewer.

**Content Organization**:
- `docs/` - All markdown content
- `docs/sims/` - MicroSim directories
- `docs/css/extra.css` and `docs/js/extra.js` - Custom styling and functionality
- `src/` - Python utility scripts for analytics, CSV processing, and content generation

### Key Features

**Educational Concepts**: Implements Bloom's Taxonomy, scaffolding, and five levels of textbook intelligence.

**AI Prompts Collection**: Structured prompts for content generation, concept enumeration, dependency mapping, and quality assessment.

**Workflow Documentation**: Step-by-step processes for creating educational content with AI assistance.

**Analytics Scripts**: Python tools in `src/` for site metrics, content analysis, and report generation.

## File Conventions

**MicroSim Structure**: Each simulation follows the pattern:
```
docs/sims/[name]/
├── index.md          # Documentation page
├── main.html         # Standalone simulation
└── [name].js         # p5.js code
```

**Social Images**: Pages can override auto-generated social cards by adding `image: path/to/image.png` in frontmatter.

**Navigation**: All content structure defined in `mkdocs.yml` nav section - update this when adding new pages.

## Python Environment

The project uses conda for environment management rather than venv to support potential future multi-language dependencies. All Python utilities are in `src/` subdirectories with specific purposes (analytics, CSV processing, etc.).

## Available Skills

### case-study-generator

**Location:** `skills/case-study-generator/SKILL.md`

**Purpose:** Generates case study entries for the case studies page from GitHub repositories.

**When to use:** When the user provides a GitHub repo URL and wants to add it to `docs/case-studies/index.md`.

**Usage:**
```
Add a case study for https://github.com/username/repo-name
```

**Workflow:**
1. Check if repo exists in `~/Documents/ws/{repo-name}` first - if found, run `git pull` to update it
2. If not found locally, clone to `/tmp/{repo-name}` (shallow clone)
3. Extract metrics: title, description, file count, word count, MicroSim count, glossary terms
4. Find or copy a thumbnail image from the repo's `docs/img/` directory
5. Compress thumbnail to ~70KB using `python3 src/compress-thumbnails.py docs/case-studies/img 70`
6. If PNG won't compress below 70KB, convert to JPEG: `python3 src/convert-png-to-jpg.py docs/case-studies/img 70`
7. Generate the markdown entry with metrics
8. Insert alphabetically into `docs/case-studies/index.md` inside the `<div class="grid cards grid-3-col" markdown>` block
9. Clean up backup files; only clean up `/tmp` clone (not local workspace repos)

**Entry format:**
```markdown
- **[Project Title](https://username.github.io/repo-name)**

    ![Alt Text](./img/repo-name.jpg)

    Brief 1-2 sentence description.

    [:octicons-mark-github-16: Repository](https://github.com/username/repo-name) · XX Files · XXK Words · X MicroSims
```