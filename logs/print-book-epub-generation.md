# Session Log: Print Book EPUB Generation

**Date:** 2026-02-01

## Objective

Create a complete workflow for generating a trade-press book in EPUB format for Amazon Kindle, including first drafts of all chapters based on content from 64 intelligent textbooks in the workspace.

## Accomplishments

### 1. EPUB Build Infrastructure

Created a complete markdown-to-EPUB conversion system:

- **`src/epub/markdown-to-epub.sh`** - Build script that:
  - Activates the `mkdocs` conda environment
  - Finds and orders all chapter markdown files
  - Converts to EPUB with table of contents
  - Reports file size and next steps

- **`src/epub/metadata.yaml`** - Book metadata including:
  - Title: "Building Intelligent Textbooks with AI"
  - Author, language, publisher, description
  - Placeholder for cover image (2560×1600 pixels)

### 2. Print Book Directory Structure

```
print-book/
├── README.md              # Documentation with outline and image guide
├── TODO.md                # Comprehensive task list for completion
├── chapters/              # 11 chapter markdown files
│   ├── 00-preface.md
│   ├── 01-what-is-intelligent-textbook.md
│   ├── 02-how-to-generate.md
│   ├── 03-bells-and-whistles.md
│   ├── 04-microsims.md
│   ├── 05-level-2-analytics.md
│   ├── 06-going-to-level-3.md
│   ├── 07-learning-standards.md
│   ├── 08-level-4-and-5.md
│   ├── 09-generating-skills.md
│   └── 10-the-future.md
├── images/                # Directory for book images (empty)
└── output/
    ├── .gitignore         # Ignores generated .epub files
    └── intelligent-textbooks.epub  # Generated EPUB (132K)
```

### 3. Source Content Analysis

Identified 64 repositories in the workspace with valid intelligent textbook schema URI (`https://dmccreary.github.io/intelligent-textbooks/ns/textbook/v1`).

Key source repositories analyzed:
- `intelligent-textbooks` - Primary concepts, workflows, skills
- `microsims` - MicroSim patterns and examples
- `learning-graphs` - Graph theory and implementation
- `claude-skills` - Skills framework
- Various course repos (electronics, geometry, data science, etc.)

### 4. First Draft Content Generated

All 11 chapters written with comprehensive first-draft content:

| Chapter | Title | Topics |
|---------|-------|--------|
| 00 | Preface | Democratization of education, motivation, 60+ textbooks created |
| 01 | What is an Intelligent Textbook? | Five-level model, METR 7-month doubling, MicroSims, learning graphs, licensing |
| 02 | How to Generate | MkDocs workflow, course description, Bloom's Taxonomy, concept enumeration, dependency graphs, chapter generation |
| 03 | Adding Bells and Whistles | Glossary (ISO 11179), FAQs, quizzes, distractors, LaTeX/KaTeX/MathJax, admonitions, covers |
| 04 | MicroSims | Instructional design, learning principles, MicroSim types, Bloom's alignment, p5.js implementation |
| 05 | Level 2 Analytics | Google Analytics, pageviews, scroll tracking, MicroSim instrumentation, slider monitoring |
| 06 | Going to Level 3 | Personal learning graphs, graph traversal (BFS/DFS), knowledge assessment, recommendations, privacy |
| 07 | Learning Standards | xAPI, Learning Record Stores, skills taxonomies, MicroSim metadata, schema URI |
| 08 | Level 4 and 5 | Chatbots, embeddings, vector stores, LLM costs, feedback loops, RLHF |
| 09 | Generating Skills | AI skills framework, Claude Code case study, book generation skills, MicroSim skills |
| 10 | The Future | METR trends, capability doubling, cost reduction, energy-respectful architecture |

**Total word count:** ~13,300 words (approximately 50 pages)

### 5. TODO.md Created

Comprehensive task list including:
- Per-chapter research and writing tasks
- Image requirements (50 images planned)
- Quality checklist
- 5-phase execution plan (Research → Draft → Images → Review → Publish)

## Usage

### Build the EPUB
```bash
./src/epub/markdown-to-epub.sh
```

### View the EPUB
```bash
open print-book/output/intelligent-textbooks.epub
```

## Technical Details

- **Pandoc** installed via conda in `mkdocs` environment
- Uses `--split-level=1` for chapter breaks at H1 headings
- `--toc` generates table of contents
- `--resource-path` ensures images are found and embedded

## Next Steps

1. **Expand content** - Target 50,000 words (currently ~13,300)
2. **Add images** - Create/collect 50 images for `print-book/images/`
3. **Create cover** - 2560×1600 pixel cover image
4. **Review content** - Verify accuracy, improve flow
5. **Test with Kindle Previewer** - Ensure proper rendering
6. **Upload to Amazon KDP** - Publish when ready

## Files Created This Session

```
src/epub/
├── markdown-to-epub.sh    # Build script
└── metadata.yaml          # Book metadata

print-book/
├── README.md              # Updated with structure docs
├── TODO.md                # Task list
├── chapters/*.md          # 11 chapter files
├── images/                # Empty, ready for images
└── output/.gitignore      # Ignores .epub files

logs/
└── generate-epub.md       # Initial setup log
```
