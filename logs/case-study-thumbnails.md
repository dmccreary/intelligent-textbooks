# Case Study Thumbnail Optimization

**Date:** 2026-01-17
**Task:** Reduce case study thumbnail images to ~70KB for faster page loading

## Problem

The case studies index page (`docs/case-studies/index.md`) was loading slowly due to oversized thumbnail images. Many images were 2-3 MB each, with a total size of 45.4 MB for 42 images.

## Solution

Created two Python scripts based on the existing `bk-resize-images` shell script template:

### 1. Initial Compression (`src/compress-thumbnails.py`)

First pass compression targeting 70KB with 400px minimum width:
- Reduced images from 45.4 MB to 6.7 MB (85% reduction)
- PNG format couldn't achieve 70KB target for most photographic images
- JPEG and WebP images easily hit the target

### 2. PNG to JPEG Conversion (`src/convert-png-to-jpg.py`)

Converted remaining large PNG files to JPEG format:
- 31 PNG files converted to JPEG
- Reduced from 6.5 MB to 1.1 MB (84% additional reduction)
- Transparent areas filled with white background

## Results

| Metric | Before | After |
|--------|--------|-------|
| Total size | 45.4 MB | 1.4 MB |
| Reduction | - | **97%** |
| Image count | 42 | 42 |
| Max file size | 3.6 MB | 67 KB |
| Average file size | 1.1 MB | 34 KB |

### Final Image Sizes (sorted by size)

```
67.2 KB  circuits.jpg
64.5 KB  learning-micropython.png
61.2 KB  graph-lms.png
55.3 KB  geometry-course.jpg
54.4 KB  deep-learning-course.jpg
53.9 KB  ai-racing-league.png
50.7 KB  stem-classroom-admin.jpg
46.3 KB  personal-finance.jpg
46.3 KB  learning-graphs.jpg
44.4 KB  prompt-class.jpg
41.8 KB  graph-algorithms.webp
41.1 KB  semiconductor-physics-course.jpg
40.6 KB  graph-data-modeling-course.jpg
39.0 KB  clocks-and-watches.jpg
37.0 KB  agents-course.jpg
36.5 KB  genai-arch-patterns.jpg
35.7 KB  claude-skills.jpg
35.6 KB  beginning-electronics.jpg
32.4 KB  modeling-healthcare-data.jpg
32.2 KB  intro-to-physics-course.jpg
32.1 KB  conversational-ai.jpg
31.5 KB  signal-processing.jpg
30.9 KB  systems-thinking.jpg
30.3 KB  microsims.jpg
29.9 KB  moving-rainbow.jpg
28.2 KB  tracking-ai-course.jpg
28.1 KB  intro-to-graph.jpg
27.0 KB  atam.jpg
26.8 KB  data-science-course.jpg
25.1 KB  intelligent-textbooks.jpg
25.0 KB  learning-linux.jpg
24.9 KB  algebra-1.jpg
24.6 KB  it-management-graph.jpg
21.2 KB  reading-for-kindergarten.jpg
20.9 KB  ethics-course.jpg
19.4 KB  mccreary-heritage.jpg
18.5 KB  clan-macquarrie.jpg
17.5 KB  stem-robots.png
14.7 KB  automating-instructional-design.jpg
13.8 KB  fft-benchmarking.jpg
 9.1 KB  infographics.jpg
 2.8 KB  spectrum-analyzer.png
```

### Files Kept as PNG (already small or needed transparency)

- `ai-racing-league.png` (53.9 KB)
- `graph-lms.png` (61.2 KB)
- `learning-micropython.png` (64.5 KB)
- `spectrum-analyzer.png` (2.8 KB)
- `stem-robots.png` (17.5 KB)

## Files Modified

### New Scripts Created

- `src/compress-thumbnails.py` - Compresses images to target KB size
- `src/convert-png-to-jpg.py` - Converts PNG to JPEG with compression

### Updated Files

- `docs/case-studies/index.md` - Updated 31 image references from `.png` to `.jpg`

### Backup Files Created

All original images backed up as `.backup` files in `docs/case-studies/img/`. To remove backups after verification:

```bash
rm docs/case-studies/img/*.backup
```

## Script Usage

### Compress Thumbnails

```bash
python3 src/compress-thumbnails.py <directory> [target_kb]
# Example: python3 src/compress-thumbnails.py docs/case-studies/img 70
```

### Convert PNG to JPEG

```bash
python3 src/convert-png-to-jpg.py <directory> [target_kb]
# Example: python3 src/convert-png-to-jpg.py docs/case-studies/img 70
```

## Technical Details

### Compression Settings

- **Minimum width:** 400px (suitable for card thumbnails)
- **JPEG quality:** 85 (reduced as needed to hit target)
- **PNG compression:** Level 9 with optimization
- **Resampling:** LANCZOS for high-quality downscaling

### Image Dimensions After Compression

Most images resized to approximately 400px width while maintaining aspect ratio. Tall images (portrait orientation) maintain 400px width with proportional height up to 600px.
