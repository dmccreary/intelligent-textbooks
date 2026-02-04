# Session Log: EPUB Generation Setup

**Date:** 2026-02-01

## Objective

Set up a workflow to convert markdown chapters into an EPUB file for publishing on Amazon Kindle.

## Solution

Used **Pandoc** (installed via conda) to convert markdown files to EPUB format.

## Files Created

### Build Scripts

- `src/epub/markdown-to-epub.sh` - Main build script that:
  - Activates the `mkdocs` conda environment
  - Finds all chapter markdown files in order
  - Converts them to EPUB with table of contents
  - Outputs to `print-book/output/intelligent-textbooks.epub`

- `src/epub/metadata.yaml` - Book metadata including:
  - Title: "Building Intelligent Textbooks with AI"
  - Author, language, publisher, description
  - Placeholder for cover image

### Chapter Structure

Created `print-book/chapters/` with 11 placeholder files based on the book outline:

```
00-preface.md
01-what-is-intelligent-textbook.md
02-how-to-generate.md
03-bells-and-whistles.md
04-microsims.md
05-level-2-analytics.md
06-going-to-level-3.md
07-learning-standards.md
08-level-4-and-5.md
09-generating-skills.md
10-the-future.md
```

Each chapter contains section headings from the outline with `<!-- TODO: Content -->` placeholders.

### Supporting Files

- `print-book/images/` - Directory for book images
- `print-book/output/.gitignore` - Ignores generated .epub files
- `print-book/README.md` - Updated with directory structure and image documentation

## Usage

```bash
./src/epub/markdown-to-epub.sh
```

Output: `print-book/output/intelligent-textbooks.epub` (20K with placeholder content)

## Image Handling

Images are stored in `print-book/images/` and referenced from chapters using relative paths:

```markdown
![Alt text](../images/filename.png)
```

Pandoc's `--resource-path` option ensures images are found and embedded in the EPUB.

### Kindle Image Requirements

- Format: PNG or JPEG
- Resolution: 300 DPI for print quality
- Max size: 5MB per image
- Cover image: 2560 × 1600 pixels (1.6:1 ratio)

## Dependencies

- Conda environment: `mkdocs`
- Package: `pandoc` (installed via `conda install -c conda-forge pandoc`)

## Next Steps

1. Write chapter content in the markdown files
2. Add images to `print-book/images/`
3. Create a cover image (2560 × 1600 pixels)
4. Test with Kindle Previewer before uploading
5. Upload to Amazon KDP
