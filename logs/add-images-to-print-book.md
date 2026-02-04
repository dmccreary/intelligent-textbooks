# Session Log: Adding Images to Print Book Chapters

**Date:** 2026-02-01

## Objective

Add image references from the manifest to chapter markdown files, with special emphasis on showcasing the diversity of MicroSims in Chapter 4.

## Starting Point

The session began with 15 images already in the manifest and referenced in chapters 1, 2, 6, 7, 8, and 10. The user had added 24 new images to the `print-book/images/color/` directory.

## Work Completed

### 1. Generated Metadata for 24 New Images

Viewed each new image and created detailed JSON metadata entries including:
- Unique ID
- Descriptive title
- Detailed description of visual content
- Chapter and section placement
- Alt text for accessibility
- Source attribution
- Keywords for searchability

Updated `print-book/images/manifest.json`:
- **Previous count:** 15 images
- **New count:** 39 images

### 2. Image Additions by Chapter

#### Chapter 1: What is an Intelligent Textbook (1 new image)

| Figure | Image | Description |
|--------|-------|-------------|
| 1.6 | ai-mmlu-benchmark-chart.jpg | MMLU benchmark showing AI models approaching human-level performance (89.9%) from 2020-2025 |

#### Chapter 2: How to Generate (3 new images)

| Figure | Image | Description |
|--------|-------|-------------|
| 2.3 | bloom-wheel-with-verbs-by-level.jpg | Interactive action verb wheel organized by Bloom's Taxonomy levels |
| 2.5 | concept-dependencies-for-programming.jpg | Programming concept dependency graph from Variables to Algorithms |
| 2.6 | chart-selection-driven-by-datatype.jpg | Reference guide for selecting appropriate chart types |

#### Chapter 3: Bells and Whistles (1 new image)

| Figure | Image | Description |
|--------|-------|-------------|
| 3.1 | glossary-of-terms-screenshot-automating-instructional-design.jpg | Example glossary page from MkDocs Material textbook with ISO 11179 definitions |

#### Chapter 4: MicroSims (19 new images - major expansion)

**Design Principles Section:**

| Figure | Image | Description |
|--------|-------|-------------|
| 4.1 | microsim-venn-simplicity-acessibility-ai-generation.png | Venn diagram showing three core MicroSim design principles |
| 4.2 | microsim-layout-drawing-control-regions.png | Standard two-region layout with drawing area and controls |
| 4.3 | microsim-architecture.png | Technology stack from browser to Learner Record Store |

**New "Diversity of MicroSims" Section:**

Created a comprehensive showcase demonstrating MicroSim versatility across domains:

| Figure | Image | Domain | Description |
|--------|-------|--------|-------------|
| 4.4 | bouncing-ball-simulation-simple-microsim-p5.jpg | Animation | Simplest meaningful MicroSim |
| 4.5 | microsim-screen-image-projectile-motion.jpg | Physics | Adjustable angle and power with trajectory traces |
| 4.6 | pythagorian-theorum-microsim-screen-image.jpg | Geometry | Visual proof with colored squares |
| 4.7 | least-squares-microsim-screen-image.jpg | Statistics | Regression line with visible residual squares |
| 4.8 | algebra-expression-parts-explorer.jpg | Algebra | Color-coded terms, coefficients, variables |
| 4.9 | barnsleys-fern-microsim-screen-image.jpg | Fractals | Iterated function system with parameters |
| 4.10 | conways-game-of-life-microsim-screen-image.jpg | Emergence | Cellular automaton with emergent patterns |
| 4.11 | letter-matching-game-microsim-screen-image.jpg | Literacy | Gamified uppercase/lowercase matching |
| 4.12 | solar-cell-charging-microsim-screenshot.jpg | Energy | Solar panel, battery, load system |
| 4.13 | sound-spectrum-visualization-with-p5-fft.jpg | Audio | Real-time FFT frequency visualization |
| 4.14 | tragedy-of-the-common-simulator-screen-image.jpg | Economics | Shared resource depletion simulation |
| 4.15 | causal-loop-diagram-microsim-screen-image.jpg | Systems | Reinforcing feedback loop visualization |
| 4.16 | college-loan-payback-estimator-microsim-screen-image.jpg | Finance | Student loan compound interest calculator |
| 4.17 | unix-shell-command-explorer.jpg | Computing | Color-coded command syntax guide |
| 4.18 | us-states-quality-of-life-map.jpg | Geography | Interactive choropleth with Leaflet |
| 4.19 | mccreary-family-heritage-timeline-screen-image.jpg | History | Interactive timeline with vis-timeline |

### 3. Key Content Addition

The new "Diversity of MicroSims" section in Chapter 4 emphasizes:
- MicroSims work across ALL domains, not just STEM
- Consistent design principles apply regardless of subject
- Same approach (focused interactivity, immediate feedback) scales from simple animations to complex systems
- Examples span physics, math, computing, economics, geography, history, finance, and literacy

## Technical Details

### Manifest Structure
Each image entry contains:
```json
{
  "id": "unique-identifier",
  "title": "Human-readable title",
  "description": "Detailed description of visual content",
  "color": "color/filename.jpg",
  "bw": "bw/filename.jpg",
  "chapter": 4,
  "section": "Section name",
  "altText": "Accessibility description",
  "source": "Original MicroSim",
  "keywords": ["searchable", "terms"],
  "status": "has_color"
}
```

### Image Reference Format
Markdown format used in chapters:
```markdown
![Title](../images/color/filename.jpg)

*Figure X.Y: Caption describing the image and its educational significance.*
```

## Files Modified

```
print-book/
├── images/
│   └── manifest.json              # Updated: 15 → 39 images
└── chapters/
    ├── 01-what-is-intelligent-textbook.md  # +1 image
    ├── 02-how-to-generate.md               # +3 images
    ├── 03-bells-and-whistles.md            # +1 image
    └── 04-microsims.md                     # +19 images, new section
```

## Summary Statistics

| Metric | Before | After |
|--------|--------|-------|
| Total images in manifest | 15 | 39 |
| Images in Chapter 1 | 5 | 6 |
| Images in Chapter 2 | 3 | 6 |
| Images in Chapter 3 | 0 | 1 |
| Images in Chapter 4 | 0 | 19 |
| Images in Chapters 5-10 | 7 | 7 |

## Next Steps

1. Create B&W versions of all images in `bw/` directory
2. Run EPUB build to verify images embed correctly
3. Add images to remaining chapters (5, 9) as content develops
4. Consider additional MicroSim examples for specific domains
