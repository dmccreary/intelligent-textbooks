# Print Book Updates - February 2, 2026

## Session Summary

This session continued work on the print book "Building Intelligent Textbooks with AI" with focus on image additions, documentation reorganization, and content updates to match a revised outline.

## Changes Made

### 1. Added 10 New Feature Images

Added feature checklist images from the intelligent textbook features page to the manifest and chapters:

| Image | Chapter | Section |
|-------|---------|---------|
| feature-list-basic.jpg | 3 | Generating a Features Checklist |
| feature-list-intermediate.jpg | 3 | Generating a Features Checklist |
| feature-list-content.jpg | 3 | Generating a Features Checklist |
| feature-list-publishing.jpg | 3 | Generating a Features Checklist |
| feature-list-content-mascot.jpg | 3 | Generating Logos and Favicons |
| feature-list-course-mascot-example.jpg | 3 | Generating Logos and Favicons |
| feature-list-interactive.jpg | 4 | Types of MicroSims |
| feature-list-learning-graph.jpg | 2 | The Dependency Graph |
| feature-list-content-generation.jpg | 2 | Generating Chapter Content |
| feature-effor-levels-manual-genai-skills.jpg | 9 | What Are AI Skills |

**Manifest updated:** 58 → 68 images

### 2. Reorganized Documentation

**Moved book outline to separate file:**
- Created: `print-book/outline.md` (detailed chapter-by-chapter outline)
- Updated: `print-book/README.md` (now references outline.md, reduced from 278 to 92 lines)
- Added outline.md to directory structure in README

### 3. Added New Chapter

**File:** `print-book/chapters/11-references.md`

The EPUB build script (`src/epub/markdown-to-epub.sh`) automatically discovers chapters via `ls *.md | sort`, so no script changes were needed.

Updated README.md directory structure to include the new chapter.

### 4. Updated Chapter 1 Content

Significant content additions to match the revised outline. Chapter 1 expanded from 255 to 369 lines.

**Renamed section:**
- "Embedding MicroSims" → "Embedding MicroSims in Web Pages"

**Added new sections:**
- The Iframe Superpower
- Separating Concepts from Content
- The Learning Graph as the Core Data Structure
- Generating Book Chapter Structure
- The Graph as Ground Truth for Content Generation
- Learning Paths
- The Student Graph
- Finding the Zone of Proximal Learning
- Recommending Concepts
- Recommending Content

**Expanded section:**
- "The Role of a Learning Graph" → "The Learning Graph" (content distributed across new sections)

### 5. New Sections Added to Chapter 3

Added to support feature checklist images:
- "Course Mascots" subsection under "Generating Logos and Favicons"
- "Generating a Features Checklist" section with subsections:
  - Basic Features
  - Intermediate Features
  - Site-Wide Resources
  - Publishing Features

## Files Modified

- `print-book/images/manifest.json` - Added 10 new image entries, updated count to 68
- `print-book/README.md` - Moved outline, added outline.md reference, added 11-references.md
- `print-book/chapters/01-what-is-intelligent-textbook.md` - Major content additions
- `print-book/chapters/02-how-to-generate.md` - Added 2 feature images
- `print-book/chapters/03-bells-and-whistles.md` - Added 6 feature images and new sections
- `print-book/chapters/04-microsims.md` - Added 1 feature image
- `print-book/chapters/09-generating-skills.md` - Added 1 effort levels image

## Files Created

- `print-book/outline.md` - Extracted book outline (217 lines)
- `print-book/chapters/11-references.md` - New references chapter (placeholder)
- `logs/print-book-outline-updates-feb-2.md` - This log file

## Current Stats

- **Total chapters:** 12 (preface + 10 chapters + references)
- **Total images in manifest:** 68
- **Total image references in chapters:** 68 ✓
