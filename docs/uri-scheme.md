# URI Scheme for Intelligent Textbooks and MicroSims

This document defines a permanent URI scheme for identifying and discovering intelligent textbooks and MicroSims across GitHub and the web.

## Purpose

As intelligent textbooks and MicroSims proliferate across GitHub repositories, we need a reliable way to:

1. **Count** - Determine how many intelligent textbooks and MicroSims exist
2. **Discover** - Find new projects using these methodologies
3. **Track** - Monitor adoption and growth over time
4. **Verify** - Confirm a project follows the intelligent textbook pattern

## URI Namespace

We use the GitHub Pages URL as a stable namespace authority:

```
https://dmccreary.github.io/intelligent-textbooks/ns/
```

### Resource Types

| Resource Type | URI |
|---------------|-----|
| Intelligent Textbook | `https://dmccreary.github.io/intelligent-textbooks/ns/textbook/v1` |
| MicroSim | `https://dmccreary.github.io/intelligent-textbooks/ns/microsim/v1` |
| Learning Graph | `https://dmccreary.github.io/intelligent-textbooks/ns/learning-graph/v1` |
| Glossary | `https://dmccreary.github.io/intelligent-textbooks/ns/glossary/v1` |

## Embedding the URI

### MicroSims (JavaScript files)

Add this comment at the top of each MicroSim JavaScript file:

```javascript
// @schema https://dmccreary.github.io/intelligent-textbooks/ns/microsim/v1
// @name Example MicroSim
// @description Brief description of what this MicroSim demonstrates
```

### MicroSims (HTML files)

Add a meta tag in the `<head>` section:

```html
<meta name="schema" content="https://dmccreary.github.io/intelligent-textbooks/ns/microsim/v1">
<meta name="microsim-name" content="Example MicroSim">
```

### Intelligent Textbooks (mkdocs.yml)

Add the schema URI to the `extra` section:

```yaml
extra:
  schema: https://dmccreary.github.io/intelligent-textbooks/ns/textbook/v1
  textbook_name: My Intelligent Textbook
  textbook_version: "1.0"
```

### Learning Graphs (JSON/CSV)

Add a schema field to learning graph data files:

```json
{
  "schema": "https://dmccreary.github.io/intelligent-textbooks/ns/learning-graph/v1",
  "name": "Course Learning Graph",
  "concepts": [...]
}
```

## Search Queries

### GitHub Code Search

Find all MicroSims:
```
"dmccreary.github.io/intelligent-textbooks/ns/microsim"
```

Find all intelligent textbooks:
```
"dmccreary.github.io/intelligent-textbooks/ns/textbook" filename:mkdocs.yml
```

Find MicroSims in JavaScript files:
```
"dmccreary.github.io/intelligent-textbooks/ns/microsim" language:JavaScript
```

Find MicroSims in HTML files:
```
"dmccreary.github.io/intelligent-textbooks/ns/microsim" language:HTML
```

### Google Search

Find all indexed resources:
```
"dmccreary.github.io/intelligent-textbooks/ns/microsim"
```

Find textbooks only:
```
"dmccreary.github.io/intelligent-textbooks/ns/textbook"
```

## Design Principles

### Why This Scheme Works

1. **Uniqueness** - The GitHub username and repository path combination ensures no false positives in search results

2. **Stability** - GitHub Pages URLs are permanent and don't require separate domain registration or renewal

3. **Verifiability** - The namespace URL can host actual documentation (this page)

4. **Versionability** - The `/v1` suffix allows future schema evolution without breaking existing identifiers

5. **Searchability** - The full URL is distinctive enough to work with both GitHub code search and Google

6. **Zero Cost** - Uses existing GitHub infrastructure with no additional hosting requirements

### URI Structure

```
https://dmccreary.github.io/intelligent-textbooks/ns/{type}/v{version}
                │                    │            │    │      │
                └─ Authority         │            │    │      └─ Version
                                     └─ Repo      │    └─ Resource type
                                                  └─ Namespace indicator
```

## Implementation Checklist

When creating a new intelligent textbook:

- [ ] Add `schema` to `mkdocs.yml` extra section
- [ ] Include schema meta tag in MicroSim HTML files
- [ ] Add schema comment to MicroSim JavaScript files
- [ ] Add schema field to learning graph JSON/CSV files

## Counting Resources

To get current counts, use the GitHub API or code search:

```bash
# Count MicroSims (requires GitHub CLI)
gh search code "dmccreary.github.io/intelligent-textbooks/ns/microsim" --limit 1000 | wc -l

# Count textbooks
gh search code "dmccreary.github.io/intelligent-textbooks/ns/textbook" --limit 1000 | wc -l
```

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2025-02-01 | Initial URI scheme definition |

## Related Resources

- [Intelligent Textbooks Project](https://dmccreary.github.io/intelligent-textbooks/)
- [MicroSim Templates](../sims/templates/)
- [Learning Graph Viewer](../sims/learning-graph/)
