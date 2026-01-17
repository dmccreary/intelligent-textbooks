# Case Studies Grid Layout Update

**Date:** 2026-01-17
**Session Summary:** Converted case studies page to mkdocs-material grid layout with cover images

## Changes Made

### 1. Updated mkdocs.yml for Emoji Support

Added the `pymdownx.emoji` extension to enable octicons and other emoji icons:

```yaml
- pymdownx.emoji:
    emoji_index: !!python/name:material.extensions.emoji.twemoji
    emoji_generator: !!python/name:material.extensions.emoji.to_svg
```

### 2. Converted Case Studies to Grid Layout

Transformed `docs/case-studies/index.md` from a vertical list format to a 3-column grid card layout following the mkdocs-material pattern used in the intro-to-physics-course MicroSims index.

**Format changes:**
- Added `hide: - toc` in frontmatter
- Wrapped content in `<div class="grid cards grid-3-col" markdown>`
- Each case study now displays as a card with:
  - Title linked to site URL
  - Cover image (where available)
  - Brief description
  - GitHub repository link with `:octicons-mark-github-16:` icon
  - Key statistics inline

### 3. Collected Cover Images

Created `docs/case-studies/img/` directory and copied 33 cover images from local repositories in `/Users/dan/Documents/ws/`.

**Images copied (33 total):**

| Repository | Source Image | Destination |
|------------|--------------|-------------|
| geometry-course | cover-art.png | geometry-course.png |
| data-science-course | cover.png | data-science-course.png |
| circuits | cover.png | circuits.png |
| algebra-1 | cover.png | algebra-1.png |
| atam | cover.png | atam.png |
| beginning-electronics | banner.png | beginning-electronics.png |
| agents-course | cover.png | agents-course.png |
| conversational-ai | cover-3m.png | conversational-ai.png |
| deep-learning-course | cover-image.png | deep-learning-course.png |
| clocks-and-watches | banner.png | clocks-and-watches.png |
| ethics-course | cover.jpg | ethics-course.jpg |
| genai-arch-patterns | banner.png | genai-arch-patterns.png |
| graph-algorithms | cover.webp | graph-algorithms.webp |
| graph-data-modeling-course | banner.png | graph-data-modeling-course.png |
| graph-lms | banner.png | graph-lms.png |
| intelligent-textbooks | cover-large.png | intelligent-textbooks.png |
| intro-to-graph | cover-large.png | intro-to-graph.png |
| intro-to-physics-course | cover.png | intro-to-physics-course.png |
| it-management-graph | cover.png | it-management-graph.png |
| learning-graphs | cover-banner-image.png | learning-graphs.png |
| learning-micropython | banner.png | learning-micropython.png |
| microsims | cover.png | microsims.png |
| modeling-healthcare-data | cover.png | modeling-healthcare-data.png |
| moving-rainbow | cover.png | moving-rainbow.png |
| personal-finance | cover.png | personal-finance.png |
| prompt-class | cover.png | prompt-class.png |
| semiconductor-physics-course | cover.png | semiconductor-physics-course.png |
| stem-robots | logo.png | stem-robots.png |
| signal-processing | cover-social-media.jpg | signal-processing.jpg |
| spectrum-analyzer | logo.png | spectrum-analyzer.png |
| systems-thinking | cover-wide-small.jpg | systems-thinking.jpg |
| tracking-ai-course | cover.png | tracking-ai-course.png |
| ai-racing-league | arl-logo.png | ai-racing-league.png |

### 4. Case Studies Without Local Repositories

The following case studies are from external authors and don't have local repositories, so no images were added:

- Applied Linear Algebra (artemispearson)
- Digital Design With Programmable Logic (mcbasken)
- Fluid Power Systems
- Generative AI Strategy (cmm-for-genai)
- Generative AI for Teachers (CoderDojoTC)
- GraphRAG
- Introduction to Microcontrollers with PIC24 (irvinggsea)
- Introduction to Operating Systems (btlepak)
- Investor Relations (dberglu)
- MicroSims for Electrical Engineering (kenn0727)
- Neurodiversity Course
- Robot Day
- Trigonometric Functions (Hank Ratzesberger)

## Files Modified

1. `mkdocs.yml` - Added pymdownx.emoji extension
2. `docs/case-studies/index.md` - Converted to grid layout with images

## Files Created

1. `docs/case-studies/img/` directory with 33 cover images

## Total Case Studies (Initial)

- **47 case studies** listed on the page
- **33 with cover images** from local repositories
- **14 without images** (external repositories or no cover available)

---

## Session Update: Added 3-Column CSS

Added CSS to `docs/css/extra.css` for the 3-column grid layout with responsive breakpoints:

```css
/* Grid layout for cards - 3 column */
.grid.cards.grid-3-col {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

/* Responsive: 2 columns on medium screens */
@media screen and (max-width: 1200px) {
  .grid.cards.grid-3-col {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Responsive: 1 column on small screens */
@media screen and (max-width: 768px) {
  .grid.cards.grid-3-col {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
```

---

## Session Update: Added 8 New Books

Cross-referenced all directories in `/Users/dan/Documents/ws/` containing `mkdocs.yml` files against the case studies page. Found and added 8 new intelligent textbooks:

### New Books Added

| Book Title | Repository | Cover Image |
|------------|------------|-------------|
| ASL Book | Olufsonc-hub/asl-book | (none - external author) |
| Automating Instructional Design | dmccreary/automating-instructional-design | automating-instructional-design.jpg |
| Claude Skills for Intelligent Textbooks | dmccreary/claude-skills | claude-skills.png |
| FFT Benchmarking | dmccreary/fft-benchmarking | fft-benchmarking.png |
| AI Infographics | dmccreary/infographics | infographics.png |
| Learning Linux | dmccreary/learning-linux | learning-linux.png |
| Reading for Kindergarten | dmccreary/reading-for-kindergarten | reading-for-kindergarten.jpg |
| STEM Classroom Administration | dmccreary/stem-classroom-admin | stem-classroom-admin.png |

### New Cover Images Copied (7 total)

| Repository | Source Image | Destination |
|------------|--------------|-------------|
| automating-instructional-design | cover.jpg | automating-instructional-design.jpg |
| claude-skills | cover.png | claude-skills.png |
| fft-benchmarking | logo.png | fft-benchmarking.png |
| infographics | logo.png | infographics.png |
| learning-linux | cover.png | learning-linux.png |
| reading-for-kindergarten | cover.jpg | reading-for-kindergarten.jpg |
| stem-classroom-admin | cover.png | stem-classroom-admin.png |

### Repositories Not Added (Personal/Template Projects)

The following directories have `mkdocs.yml` but were not added as they are personal projects, templates, or non-educational content:

- clan-macquarrie (family history)
- dmccreary (personal site)
- game-of-thrones-tg (entertainment)
- intelligent-book-template (template, not a course)
- lambda-graph-visualization (placeholder description)
- mccreary-heritage (family history)
- mkdocs-template (template)
- native-american-crime-novels (personal reading list)
- openai-demos (demos, not a course)
- prostate-research-analysis (personal medical)
- search-microsims (utility tool)
- superfences (test project)
- tour-maps (personal project)

---

## Session Update: Added Heritage Sites

Added 2 family heritage/history educational sites:

| Book Title | Repository | Cover Image |
|------------|------------|-------------|
| Clan MacQuarrie | dmccreary/clan-macquarrie | clan-macquarrie.png |
| McCreary Family Heritage | dmccreary/mccreary-heritage | mccreary-heritage.png |

---

## Updated Totals

- **57 case studies** listed on the page (was 47)
- **42 with cover images** from local repositories (was 33)
- **15 without images** (external repositories or no cover available)

## Files Modified (Complete List)

1. `mkdocs.yml` - Added pymdownx.emoji extension
2. `docs/case-studies/index.md` - Converted to grid layout, added 8 new books
3. `docs/css/extra.css` - Added 3-column grid CSS with responsive breakpoints

## Files Created

1. `docs/case-studies/img/` directory with 42 cover images total
