# Print Book Image Additions

**Date:** 2026-02-01

## Summary

Added 14 new images to the print book chapters, increasing the total image count from 39 to 53 (plus cover image). This exceeds the target of ~50 images specified in the README.

## Cover Image

- Added `cover-aws-epub-portrait.png` to `print-book/images/color/`
- Updated `src/epub/metadata.yaml` to reference the cover image:
  ```yaml
  cover-image: color/cover-aws-epub-portrait.png
  ```
- Created `print-book/cover-prompt.md` with the image generation prompt for the cover

## Images Added by Chapter

### Chapter 2: How to Generate an Intelligent Textbook
| Image | Description |
|-------|-------------|
| `mkdocs-basic-intelligent-textbook-geometry-screen-image.jpg` | MkDocs Material example showing geometry textbook |
| `sample-course-description-screen-image-deep-learning.jpg` | Course description page example |

### Chapter 3: Adding Bells and Whistles
| Image | Description |
|-------|-------------|
| `mkdocs-sample-far-for-linear-algebra.jpg` | FAQ page example from linear algebra textbook |
| `mkdocs-quiz-multiple-choice-numbering.jpg` | Multiple choice quiz interface |
| `mkdocs-sample-equations-from-physics.jpg` | Equation rendering with MathJax |
| `mkdocs-basics-admonition-types.jpg` | Admonition type examples |
| `mkdocs-material-admonition-screen-image.jpg` | Admonitions in context |
| `mkdocs-social-media-preview-override.jpg` | Social media preview cards |

### Chapter 4: MicroSims
| Image | Description |
|-------|-------------|
| `temperature-and-pressure-microsim-screen-image.jpg` | Gas laws simulation |
| `sine-wave-microsim-3-sliders-screen-image.jpg` | Sine wave explorer |
| `supply-and-demand-profit-microsim-screen-image.jpg` | Economics supply/demand sim |
| `simple-recursion-tree-depth-microsim-screen-image.jpg` | Recursion tree visualization |

### Chapter 5: Level 2 Book Analytics
| Image | Description |
|-------|-------------|
| `levels-of-interactivity-level-chart.jpg` | Interactivity levels spectrum |

### Chapter 9: Generating Skills
| Image | Description |
|-------|-------------|
| `generating-circuit-diagrams-with-specialized-skill.jpg` | Circuit diagram skill example |

## Final Image Count by Chapter

| Chapter | Title | Images |
|---------|-------|--------|
| 00 | Preface | 0 |
| 01 | What is an Intelligent Textbook? | 6 |
| 02 | How to Generate | 8 |
| 03 | Adding Bells and Whistles | 7 |
| 04 | MicroSims | 23 |
| 05 | Level 2 Book Analytics | 1 |
| 06 | Going to Level 3 | 3 |
| 07 | Learning Standards | 1 |
| 08 | Level 4 and 5 Textbooks | 1 |
| 09 | Generating Skills | 1 |
| 10 | The Future | 2 |
| | **Total** | **53** |

## Files Modified

- `src/epub/metadata.yaml` - Added cover image reference
- `print-book/chapters/02-how-to-generate.md` - Added 2 images
- `print-book/chapters/03-bells-and-whistles.md` - Added 6 images
- `print-book/chapters/04-microsims.md` - Added 4 images
- `print-book/chapters/05-level-2-analytics.md` - Added 1 image
- `print-book/chapters/09-generating-skills.md` - Added 1 image

## Files Created

- `print-book/cover-prompt.md` - Image generation prompt for cover
- `logs/print-book-image-additions.md` - This log file
