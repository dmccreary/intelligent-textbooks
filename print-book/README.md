# Building Intelligent Textbooks with AI

This is the source code for a trade-press book that will be published
in ebook format on Amazon. It will cover the main ideas about
using AI to generate intelligent textbooks. The goal
is about 150 pages. It will have about 50 static images.

## Directory Structure

```
print-book/
├── README.md              # This file
├── outline.md             # Detailed chapter-by-chapter outline
├── chapters/              # Markdown source files for each chapter
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
│   ├── 10-the-future.md
│   └── 11-references.md
├── images/                # All images for the book
│   └── (image files)
└── output/                # Generated EPUB files (gitignored)
    └── intelligent-textbooks.epub
```

## Building the EPUB

### Prerequisites

Pandoc is installed in the `mkdocs` conda environment:
```bash
conda activate mkdocs
# If pandoc is not installed:
conda install -c conda-forge pandoc
```

### Build Command

Run from the project root:
```bash
./src/epub/markdown-to-epub.sh
```

The EPUB will be created at `print-book/output/intelligent-textbooks.epub`.

## Including Images

### Image Storage

All images should be stored in the `images/` directory. Use descriptive filenames:
- `images/five-level-model.png`
- `images/bloom-taxonomy.png`
- `images/learning-graph-example.png`

### Markdown Syntax

Reference images using relative paths from the chapter file:

```markdown
![Five Level Model of Intelligent Textbooks](../images/five-level-model.png)
```

With optional caption and sizing (pandoc extensions):

```markdown
![Five Level Model](../images/five-level-model.png){width=80%}
```

### Image Requirements for Kindle

- **Format**: PNG or JPEG (JPEG preferred for photos)
- **Resolution**: 300 DPI for print quality
- **Max size**: 5MB per image
- **Color space**: sRGB
- **Cover image**: 2560 × 1600 pixels (1.6:1 ratio)

### Image Best Practices

1. **Use descriptive alt text** - Required for accessibility
2. **Optimize file size** - Compress images before adding
3. **Consistent naming** - Use lowercase, hyphens, descriptive names
4. **One image per concept** - Avoid cluttering with too many images

## Book Outline

See [outline.md](outline.md) for the detailed chapter-by-chapter outline.
