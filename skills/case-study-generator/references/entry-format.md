# Case Study Entry Format Reference

## Entry Template

```markdown
- **[Project Title](https://username.github.io/repo-name)**

    ![Alt Text](./img/repo-name.jpg)

    Brief 1-2 sentence description of the project, its purpose, and target audience.

    [:octicons-mark-github-16: Repository](https://github.com/username/repo-name) · XX Files · XXK Words · X MicroSims
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
- Start with GitHub icon link: `[:octicons-mark-github-16: Repository](URL)`
- Separate metrics with ` · ` (space-dot-space)
- Round word counts to K (e.g., "18K Words" not "18,234 Words")
- Common metrics in order:
  1. Repository link (required)
  2. File count (optional)
  3. Word count (optional)
  4. Glossary term count (optional)
  5. MicroSim count (optional)
  6. Development stage (optional)

### Development Stage Tags
- `Early Stage` - Just started, minimal content
- `Active Development` - Ongoing work, content growing
- (No tag) - Mature/stable project

## Example Entries

### Full Featured Entry
```markdown
- **[AI Assisted Geometry](https://dmccreary.github.io/geometry-course)**

    ![AI Assisted Geometry](./img/geometry-course.jpg)

    An online intelligent textbook that uses AI to help high-school students learn geometry using MicroSims. Features a detailed learning graph and about a dozen MicroSims.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/geometry-course) · 47 Files · 18K Words · 3 MicroSims
```

### Minimal Entry (No Image)
```markdown
- **[Applied Linear Algebra](https://artemispearson.github.io/learning-graphs/)**

    Applied Linear Algebra for Computer Science and Electrical Engineering. Uses learning graphs to structure concept dependencies.

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

### Entry with Only MicroSims Mentioned
```markdown
- **[Ethics in Modern Society](https://dmccreary.github.io/ethics-course)**

    ![Ethics Course](./img/ethics-course.jpg)

    Ethical issues backed by critical thinking and data science. Covers harm measurement, impact analysis, and systems thinking.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/ethics-course) · MicroSims included
```

## Page Structure Context

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
