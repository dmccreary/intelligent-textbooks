# Print Book TODO: Building Intelligent Textbooks with AI

**Generated:** 2026-02-01

## Overview

This document outlines the plan for generating first-draft content for all chapters of the print book. Content will be drawn from the 64 intelligent textbooks in the workspace that use the schema URI `https://dmccreary.github.io/intelligent-textbooks/ns/textbook/v1`.

## Source Books (64 total)

The following repositories contain valid intelligent textbook schemas and will be used as source material:

### Educational Technology & AI
- `intelligent-textbooks` - Primary source for concepts and workflows
- `automating-instructional-design` - Instructional design concepts
- `learning-graphs` - Learning graph theory and implementation
- `claude-skills` - Skills framework and generation
- `prompt-class` - Prompt engineering for education

### STEM Courses
- `algebra-1`, `linear-algebra`, `geometry-course` - Math textbooks
- `intro-to-physics-course`, `semiconductor-physics-course` - Physics
- `beginning-electronics`, `digital-electronics`, `circuits` - Electronics
- `control-systems`, `signal-processing`, `fft-benchmarking` - Engineering
- `data-science-course`, `deep-learning-course` - Data science/ML
- `graph-algorithms`, `graph-data-modeling-course` - Graph technology

### Other Domains
- `economics-course`, `personal-finance` - Finance/Economics
- `ethics-course` - Ethics
- `reading-for-kindergarten` - K-12 education
- `conversational-ai`, `agents-course` - AI applications
- `microsims` - MicroSim library and patterns

---

## Chapter Tasks

### Preface: The Democratization of Education
- [ ] **Research:** Review `intelligent-textbooks/docs/index.md` for vision statement
- [ ] **Research:** Check `automating-instructional-design` for democratization themes
- [ ] **Write:** Draft 2-3 page preface on how AI enables anyone to create quality educational content
- [ ] **Review:** Ensure personal voice and motivation comes through

---

### Chapter 1: What is an Intelligent Textbook?

**Primary Sources:**
- `intelligent-textbooks/docs/concepts/five-levels-of-intelligent-textbooks.md`
- `intelligent-textbooks/docs/concepts/learning-graph.md`
- `intelligent-textbooks/docs/sims/metr-task-horizon/`

**Tasks:**
- [ ] **Research:** Extract five-level model content from concepts folder
- [ ] **Research:** Find METR doubling rate data and charts
- [ ] **Research:** Gather examples from case studies
- [ ] **Write:** Section on five-level model (2-3 pages)
- [ ] **Write:** Section on AI growth trends with METR data (1-2 pages)
- [ ] **Write:** Section on MicroSims with examples (2-3 pages)
- [ ] **Write:** Section on learning graphs (1-2 pages)
- [ ] **Write:** Section on licensing and copyright (1-2 pages)
- [ ] **Images:** Identify/create 5-level diagram, METR chart, MicroSim screenshots
- [ ] **Review:** Check for flow and completeness

---

### Chapter 2: How to Generate an Intelligent Textbook

**Primary Sources:**
- `intelligent-textbooks/docs/workflow/` - All workflow documentation
- `intelligent-textbooks/docs/prompts/learning-graph/` - Generation prompts
- `intelligent-textbooks/docs/tutorial/` - MkDocs setup

**Tasks:**
- [ ] **Research:** Extract workflow steps from workflow folder
- [ ] **Research:** Review prompts for concept enumeration and dependency
- [ ] **Research:** Document MkDocs/Material setup from tutorial
- [ ] **Write:** Section on course description (1-2 pages)
- [ ] **Write:** Section on Bloom's Taxonomy (1-2 pages)
- [ ] **Write:** Section on concept enumeration and ordering (2-3 pages)
- [ ] **Write:** Section on dependency graph generation (2-3 pages)
- [ ] **Write:** Section on chapter structure generation (2-3 pages)
- [ ] **Write:** Section on content generation rules (2-3 pages)
- [ ] **Images:** Workflow diagram, concept graph example, chapter balance chart
- [ ] **Review:** Verify step-by-step reproducibility

---

### Chapter 3: Adding Bells and Whistles

**Primary Sources:**
- `intelligent-textbooks/docs/workflow/glossary.md`
- `intelligent-textbooks/docs/workflow/faq.md`
- `intelligent-textbooks/docs/tutorial/quizzes.md`
- `intelligent-textbooks/docs/formatting-tests/equations-test.md`

**Tasks:**
- [ ] **Research:** Extract glossary generation workflow
- [ ] **Research:** Extract FAQ generation workflow
- [ ] **Research:** Extract quiz generation patterns
- [ ] **Research:** Document LaTeX/KaTeX/MathJax usage
- [ ] **Write:** Section on glossary generation (1-2 pages)
- [ ] **Write:** Section on FAQ generation (1-2 pages)
- [ ] **Write:** Section on quiz generation (2-3 pages)
- [ ] **Write:** Section on equation formatting (1-2 pages)
- [ ] **Write:** Section on admonitions and callouts (1 page)
- [ ] **Write:** Section on cover and logo generation (1-2 pages)
- [ ] **Images:** Quiz screenshot, equation examples, cover generation prompt
- [ ] **Review:** Test all code examples

---

### Chapter 4: MicroSims

**Primary Sources:**
- `microsims/` - MicroSim library
- `intelligent-textbooks/docs/sims/` - Local MicroSims
- `intelligent-textbooks/docs/workflow/microsim.md`
- Multiple course repos with MicroSim examples

**Tasks:**
- [ ] **Research:** Catalog MicroSim types from microsims repo
- [ ] **Research:** Extract instructional design principles
- [ ] **Research:** Review Bloom's Taxonomy alignment patterns
- [ ] **Write:** Section on instructional design (2-3 pages)
- [ ] **Write:** Section on types of MicroSims (3-4 pages)
  - Infographics, Flash Cards, Matching Games
  - Charts, Timelines, Maps
- [ ] **Write:** Section on Bloom's Taxonomy and MicroSims (2-3 pages)
- [ ] **Images:** MicroSim type screenshots (8-10 images)
- [ ] **Review:** Verify p5.js examples work

---

### Chapter 5: Level 2 Book Analytics

**Primary Sources:**
- `intelligent-textbooks/docs/tutorial/google-analytics.md`
- `intelligent-textbooks/docs/tutorial/logging.md`
- `intelligent-textbooks/docs/js/extra.js` - Analytics code

**Tasks:**
- [ ] **Research:** Document Google Analytics setup
- [ ] **Research:** Extract event logging patterns from JS
- [ ] **Write:** Section on Google Analytics setup (1-2 pages)
- [ ] **Write:** Section on pageview monitoring (1-2 pages)
- [ ] **Write:** Section on scroll monitoring (1-2 pages)
- [ ] **Write:** Section on MicroSim instrumentation (2-3 pages)
- [ ] **Images:** Analytics dashboard screenshot, event flow diagram
- [ ] **Review:** Test analytics code examples

---

### Chapter 6: Going to Level 3

**Primary Sources:**
- `learning-graphs/` - Learning graph implementation
- `graph-algorithms/` - Graph traversal algorithms
- `intelligent-textbooks/docs/concepts/adaptive-assessments.md`

**Tasks:**
- [ ] **Research:** Extract personalized learning concepts
- [ ] **Research:** Document graph traversal for recommendations
- [ ] **Research:** Review adaptive assessment patterns
- [ ] **Write:** Section on personal learning graphs (2-3 pages)
- [ ] **Write:** Section on knowledge assessment (2-3 pages)
- [ ] **Write:** Section on recommendation algorithms (2-3 pages)
- [ ] **Write:** Section on event processing (1-2 pages)
- [ ] **Images:** Personal learning graph visualization, traversal diagram
- [ ] **Review:** Verify algorithm descriptions

---

### Chapter 7: Learning Standards

**Primary Sources:**
- `intelligent-textbooks/docs/uri-scheme.md`
- xAPI documentation (external)
- MicroSim metadata patterns from repos

**Tasks:**
- [ ] **Research:** Document xAPI basics
- [ ] **Research:** Review learning record store options
- [ ] **Research:** Extract MicroSim metadata patterns
- [ ] **Write:** Section on xAPI (2-3 pages)
- [ ] **Write:** Section on learning record stores (1-2 pages)
- [ ] **Write:** Section on MicroSim metadata (2-3 pages)
- [ ] **Write:** Section on intelligent textbook standards (1-2 pages)
- [ ] **Images:** xAPI statement diagram, metadata schema
- [ ] **Review:** Verify standard compliance

---

### Chapter 8: Level 4 and 5 Textbooks

**Primary Sources:**
- `conversational-ai/` - Chatbot concepts
- `deep-learning-course/` - Embeddings and vectors
- `intelligent-textbooks/docs/prompts/semantic-search.md`

**Tasks:**
- [ ] **Research:** Document chatbot integration patterns
- [ ] **Research:** Extract embedding and vector store concepts
- [ ] **Research:** Review FAQ-based chatbot approaches
- [ ] **Write:** Section on intelligent chatbots (2-3 pages)
- [ ] **Write:** Section on embeddings and vectors (2-3 pages)
- [ ] **Write:** Section on cost management (1-2 pages)
- [ ] **Write:** Section on feedback and improvement (2-3 pages)
- [ ] **Images:** Chatbot architecture, vector similarity diagram
- [ ] **Review:** Verify LLM cost estimates

---

### Chapter 9: Generating Skills

**Primary Sources:**
- `claude-skills/` - Skills framework
- `intelligent-textbooks/docs/skills/` - Skill documentation
- `intelligent-textbooks/skills/` - Local skill implementations

**Tasks:**
- [ ] **Research:** Document Claude Code skills framework
- [ ] **Research:** Extract skill patterns from implementations
- [ ] **Research:** Review workflow automation examples
- [ ] **Write:** Section on AI skills concepts (2-3 pages)
- [ ] **Write:** Section on Claude Code skills case study (2-3 pages)
- [ ] **Write:** Section on book generation skills (2-3 pages)
- [ ] **Write:** Section on MicroSim generation skills (2-3 pages)
- [ ] **Images:** Skill architecture diagram, workflow examples
- [ ] **Review:** Test skill examples

---

### Chapter 10: The Future

**Primary Sources:**
- `intelligent-textbooks/docs/sims/metr-task-horizon/`
- `tracking-ai-course/` - AI trends
- External METR studies

**Tasks:**
- [ ] **Research:** Compile AI capability trends
- [ ] **Research:** Document METR doubling studies
- [ ] **Research:** Identify cost reduction patterns
- [ ] **Write:** Section on AI growth trends (2-3 pages)
- [ ] **Write:** Section on METR capabilities (1-2 pages)
- [ ] **Write:** Section on sustainable architecture (2-3 pages)
- [ ] **Write:** Section on future predictions (1-2 pages)
- [ ] **Images:** METR chart, cost trend graph
- [ ] **Review:** Fact-check all predictions

---

## Image Tasks

- [ ] Create `print-book/images/` inventory spreadsheet
- [ ] Identify 50 required images from outline
- [ ] Extract existing diagrams from source repos
- [ ] Create new diagrams where needed
- [ ] Compress all images for Kindle (300 DPI, <5MB each)
- [ ] Create cover image (2560 × 1600 pixels)

---

## Quality Checklist

### Per-Chapter Review
- [ ] Word count target: ~4,000-5,000 words per chapter (≈15 pages)
- [ ] All sections from outline covered
- [ ] Code examples tested
- [ ] Images referenced and present
- [ ] Cross-references to other chapters added
- [ ] No TODO comments remaining

### Final Review
- [ ] Total word count: ~50,000 words (150 pages)
- [ ] Table of contents accurate
- [ ] All images embedded correctly
- [ ] EPUB validates with Kindle Previewer
- [ ] ISBN obtained (if needed)
- [ ] Amazon KDP account ready

---

## Execution Plan

### Phase 1: Research (1-2 days)
1. Run content extraction scripts on all source repos
2. Create consolidated notes for each chapter
3. Identify missing content that needs original writing

### Phase 2: First Draft (3-5 days)
1. Generate chapter drafts using AI assistance
2. Write one chapter at a time in order
3. Add placeholder references for images

### Phase 3: Images (1-2 days)
1. Collect existing images from repos
2. Create new diagrams as needed
3. Compress and organize in images folder

### Phase 4: Review & Polish (2-3 days)
1. Read through for flow and consistency
2. Fix cross-references
3. Test all code examples
4. Run EPUB build and test in Kindle Previewer

### Phase 5: Publish
1. Final EPUB build
2. Upload to Amazon KDP
3. Set pricing and metadata
4. Submit for review

---

## Notes

- Use `./src/epub/markdown-to-epub.sh` to build EPUB at any time
- Test frequently with `open print-book/output/intelligent-textbooks.epub`
- Keep chapters focused - this is a trade book, not academic text
- Target audience: educators and developers interested in AI-powered education
