# Building Intelligent Textbooks with AI

This is the source code for a trade-press book that will be published
in ebook format on Amazon. It will cover the main ideas about
using AI to generate intelligent textbooks. The goal
is about 150 pages. It will have about 50 static images.

## Directory Structure

```
print-book/
├── README.md              # This file
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
│   └── 10-the-future.md
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

## Outline

### Preface: The Democratization of Education

### Chapter 1: What is an Intelligent Textbook?
- A five level model of intelligent textbooks
- AI is growing exponentially
- The METR 7-month doubling rate
- Examples of intelligent textbooks
- Features of intelligent textbook
- MicroSims
- Simplicity, Interactivity and AI
- Embedding MicroSims
- The role of a learning graph
- Ground truth
- Avoiding hallucination
- Open source
- Creative Commons
- Licensing books
- Observing copyright and using external images

### Chapter 2: How to Generate an Intelligent Textbook
- The book building process
- Generating HTML from Markdown
- Mkdocs and Material
- The Course Description
- Bloom Taxonomy of Learning Objectives
- The Concept List
- Ordering Concepts
- The Dependency Graph
- Generating the Dependency Graph
- Generating a Concept Taxonomy
- Balancing the taxonomy
- Generating a Book Ontology
- Generating chapter structures
- Balancing the chapter length
- Moving concepts and respecting dependency
- Generating chapter content
- Avoiding the wall of text
- Rules for non-pure test content
- Adding lists, tables, and diagrams
- Adding MicroSims
- Generating MicroSims

### Chapter 3: Adding Bells and Whistles
- Generating a Glossary of Terms
- Generating FAQs
- Generating quizzes
- Self assessment
- Quiz question types
- Multiple choice question generation
- Great distractors
- Formatting equations
- LaTeX
- KaTeX
- MathJax
- Admonitions
- Notes, quotes and callouts
- Generating a cover from the course description
- Generating logos and favicons

### Chapter 4: MicroSims
- Instructional design
- How humans learn
- The importance of interactive controls
- Types of MicroSims
- Infographics and Infoboxes
- Flash Cards and Memorization
- Matching Game MicroSims
- Charts and Graphs
- Making Charts Move
- Timelines
- Interactive Maps
- Geospatial tools and Leaflet
- Revisiting the Bloom Taxonomy
- Discovering learning objectives
- The Bloom verbs
- Matching levels and verbs to a MicroSim

### Chapter 5: Level 2 Book Analytics
- Google Analytics
- Metrics
- View
- Engagement
- Monitoring pageviews
- Monitoring scrolling
- Using Javascript for activity monitoring
- Instrumenting MicroSim activity
- Monitoring in-simulation actions
- Monitoring start simulation
- Monitoring slider activity

### Chapter 6: Going to Level 3
- Personalized learning
- The Personal Learning Graph
- Graph Traversal
- Assessing Knowledge
- Updating the Personal Learning Graph
- Inferring Prior Knowledge
- Recommending a concept
- Recommending
- Designing for Interactivity
- Drinking from the Event Firehose
- Pruning Events
- Analyzing Event Values

### Chapter 7: Learning Standards
- xAPI
- Learning Record Stores
- Skills
- MicroSim metadata
- MicroSim faceted search
- Intelligent textbook standards

### Chapter 8: Level 4 and 5 Textbooks
- The intelligent book chatbot
- Embeddings
- Vector stores
- Nearness measures
- Similarity
- Cost of LLMs
- Preventing misuse
- Classifying questions
- Starting with FAQs
- Monitoring the chat history
- Logging chat events
- Getting feedback
- Using feedback for improvement
- Using reinforcement learning

### Chapter 9: Generating Skills
- What are AI Skills
- Skills and Agents
- Tasks, workflows and skill matching
- Managing the context window
- Case study: Claude Code Skills
- Skills as a standard
- Book Generation Skills
- MicroSim Generation Skills
- Search and Reuse
- Embeddings and Ad-Hoc MicroSims

### Chapter 10: The Future
- AI growth trends
- Tracking capabilities
- The METR studies
- Capabilities doubling ever seven months
- Keeping costs down
- Building an energy-respectful architecture
- Personalization without LLMs
