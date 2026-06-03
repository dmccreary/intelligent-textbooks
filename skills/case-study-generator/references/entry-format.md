# Case Study Entry Format Reference

## Entry Template

```markdown
- **[Project Title](https://username.github.io/repo-name)**

    ![Alt Text](./img/repo-name.jpg)

    Brief 1-2 sentence description of the project, its purpose, and target audience.

     XX Concepts · X Chapters · X MicroSims · X Stories · XX Quizzes · XX Glossary Terms · XX FAQ 
     · [:octicons-mark-github-16: Repository](https://github.com/username/repo-name)
```

## Formatting Rules

### Indentation
- Use 4 spaces for indentation within list items
- Image, description, and metrics lines must all be indented with 4 spaces

### Image Reference
- Path is relative: `./img/filename.jpg`
- Filename uses kebab-case matching repo name
- Prefer `.jpg` for photos, `.png` only for graphics/logos under 70KB
- Alt text should be descriptive but concise

### Metrics Line Format

- Separate metrics with ` · ` (space-dot-space)
- Round word counts to K (e.g., "18K Words" not "18,234 Words")
- Common metrics in order:
  1. Concepts (required)
  2. Chapters (required)
  3. MicroSims (recommended)
  4. Stories (optional)
  5. Chapter Quizzes (recommended)
  6. Chapter References (recommended)
  7. Glossary Terms (recommended)
  8. FAQs (recommended)
  9. Words (required)
  10. Mascot (optional)
  11. Appendices (optional)
  12. Development stage (required)
  13. (Final) End with GitHub icon link for public sites: `[:octicons-mark-github-16: Repository](URL)`

### Development Maturity Stage Tags

There are five levels of 

- `Early Stage` - Just started, minimal content, just a learning graph and chapters
- `Preliminary` - Includes at least 2 supplementary from the metrics lines from above
- `Developing` - Includes at least 5 supplementary from the metrics from above
- `Almost Complete` - Only missing 5-6 items from the list above
- `Content Complete` - Only missing 2-3 items
- (No tag) - Mature/stable project

## Example Entries

### Full Featured Entry Examples

```markdown
- **[A Skeptic's Guide to Quantum Computing](https://dmccreary.github.io/quantum-computing/)**

    ![A Skeptic's Guide to Quantum Computing](./img/quantum-computing.jpg)

    An evidence-based interactive intelligent textbook examining why quantum computing may never be economically viable, covering physics constraints, hardware realities, investment risk, and cognitive biases.  Designed for upper-division undergraduates, graduate students, technology investors, and policymakers.

    241 Concepts · 17 Chapters · 53 MicroSims · 16 Stories · 200K Words · 241 Glossary Terms  
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/quantum-computing)

- **[AI Assisted Geometry](https://dmccreary.github.io/geometry-course)**

    ![AI Assisted Geometry](./img/geometry-course.jpg)

    An online interactive intelligent textbook for high-school geometry using MicroSims. Features a detailed learning graph and over 130 interactive geometry MicroSims.

    200 Concepts · 12 Chapters · 138 MicroSims · 171K Words · 200 Glossary Terms · 200 FAQs
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/geometry-course)

```

### Minimal Entry (No Image)
```markdown
- **[Applied Linear Algebra](https://artemispearson.github.io/learning-graphs/)**

    Applied Linear Algebra for Computer Science and Electrical Engineering. Uses learning graphs to structure concept dependencies.

    200 Concepts · 21 Chapters
    · <span class="completion completion-1" title="Complete (1/5)"></span>
    [:octicons-mark-github-16: Repository](https://github.com/artemispearson/learning-graphs)
```

### Entry with Development Stage
```markdown
- **[Semiconductor Physics Course](https://dmccreary.github.io/semiconductor-physics-course)**

    ![Semiconductor Physics](./img/semiconductor-physics-course.jpg)

    College-level semiconductor physics with interactive simulations including PN Junction visualization.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/semiconductor-physics-course) · Early Stage
```

### Entry with Glossary Terms
```markdown
- **[Graph Data Modeling with AI](https://dmccreary.github.io/graph-data-modeling-course)**

    ![Graph Data Modeling](./img/graph-data-modeling-course.jpg)

    MicroSims for graph data modeling. Example models created for a variety of domains using vis.js.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/graph-data-modeling-course) · 49 Files · 13K Words · 156 Glossary Terms
```

### Entry with Only Concepts, Chapters and MicroSims Mentioned

```markdown
- **[Ethics in Modern Society](https://dmccreary.github.io/ethics-course)**

    ![Ethics Course](./img/ethics-course.jpg)

    Ethical issues backed by critical thinking and data science. Covers harm measurement, impact analysis, and systems thinking.

    200 Concepts · 12 Chapters · 40 MicroSims
    · <span class="completion completion-3" title="Developing (3/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/ethics-course)
```

## Page Structure Context· 18K Words 

Entries are placed inside this wrapper in `docs/case-studies/index.md`:

```markdown
<div class="grid cards grid-3-col" markdown>

- **[First Entry alphabetically](...)**
    ...

- **[Second Entry alphabetically](...)**
    ...

</div>
```

## Image Specifications

| Property | Value |
|----------|-------|
| Target file size | ~70KB |
| Minimum width | 400px |
| Format | JPEG (preferred) or PNG |
| Aspect ratio | Preserve original |
| Location | `docs/case-studies/img/` |
| Naming | `{repo-name}.jpg` |

## Common Mistakes to Avoid

1. **Wrong indentation** - Must use exactly 4 spaces, not tabs
2. **Missing blank line** - Need blank line between image and description
3. **Oversized images** - Compress to under 70KB
4. **Wrong image path** - Use `./img/` not `/img/` or `img/`
5. **Inconsistent metrics format** - Use ` · ` separator consistently
6. **Not alphabetized** - Insert entries in alphabetical order by title
