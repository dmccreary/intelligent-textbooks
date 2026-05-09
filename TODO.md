# TODO

## Run /init-textbook on new high-school textbook repos

The following repos were created and cloned but still need the `/init-textbook`
skill run to scaffold the mkdocs-material project structure:

- [ ] `~/Documents/ws/english-language-arts`
- [ ] `~/Documents/ws/us-government`
- [ ] `~/Documents/ws/algebra-2`
- [ ] `~/Documents/ws/psychology`
- [ ] `~/Documents/ws/sociology`
- [ ] `~/Documents/ws/spanish-language`
- [ ] `~/Documents/ws/health-education`
- [ ] `~/Documents/ws/graphic-design`
- [ ] `~/Documents/ws/accounting`

Already done:
- [x] `~/Documents/ws/business`
- [x] `~/Documents/ws/marketing`
- [x] `~/Documents/ws/us-history`

---

Future cleanup tasks for this project and related textbooks.

## Concept-list metadata vs body drift

Several `docs/learning-graph/concept-list.md` files across the textbook
portfolio have a `**Total Concepts:** N` header that disagrees with the
number of numbered items in the body. This is a "two sources of truth"
footgun — downstream metrics (like
[docs/sims/concept-analytics/book-concept-counts.csv](docs/sims/concept-analytics/book-concept-counts.csv)
and the
[concept-count histogram](docs/sims/concept-count-histogram/index.md))
have to pick one and may pick the wrong one silently.

Known cases:

- **calculus** — header says 380, body has 680. Resolved: book covers AP
  Calculus AB only (380 concepts, verified by chapter "Concepts Covered"
  sections). The body was extended with AP Calculus BC concepts
  (parametric, polar, sequences/series, Taylor) for future expansion.
  Chapters are the ground truth → **380 is correct**.
- **genetics** — header says 350, body has 450. **Not yet verified** —
  need to check whether chapters cover 350, 450, or some other number.

### Cleanup tasks

- [ ] Verify genetics: parse `## Concepts Covered` sections in
  `~/Documents/ws/genetics/docs/chapters/*/index.md`, compare totals.
- [ ] Audit all 11 `concept-list.md` files that have a `**Total Concepts:**`
  header for metadata-vs-body drift:
  asl-book, calculus, circuits, claude-skills, genetics,
  graph-data-modeling-course, intro-to-graph, microsims, personal-finance,
  signal-processing, unicorns.
- [ ] For each book in the portfolio, count concepts ACTUALLY covered in
  chapters (sum of unique concepts across all `## Concepts Covered`
  sections) and compare to `book-concept-counts.csv`. Chapter coverage is
  the most defensible "size of textbook" metric.
- [ ] Decide on a single canonical concept-count source and add a
  validation step (CI or pre-commit) that flags drift between the header,
  the body, and chapter coverage.
- [ ] Where the body has aspirational/unused concepts (like calculus BC),
  decide whether to (a) split into two files (`concept-list-ab.md` +
  `concept-list-bc.md`), (b) annotate unused concepts as such, or
  (c) delete them until they're incorporated into chapters.

## Concept-count CSV / histogram

- [ ] Once chapter-coverage counts exist, regenerate
  [book-concept-counts.csv](docs/sims/concept-analytics/book-concept-counts.csv)
  using chapter coverage as the source of truth (current approach prefers
  `**Total Concepts:**` metadata, falling back to body line-counting).
- [ ] After the CSV is regenerated, update the embedded data array in
  [concept-count-histogram.js](docs/sims/concept-count-histogram/concept-count-histogram.js)
  and re-capture the screenshot.
- [ ] Consider replacing the inline data array in the histogram MicroSim
  with a `fetch()` of the CSV so the visualization auto-updates when the
  CSV changes — at the cost of needing a live server (won't work via
  `file://`).

## Books missing site_url

These textbooks have no `site_url` in `mkdocs.yml`, so they appear in
`book-concept-counts.csv` with a blank URL:

- **ir-textbook** ("Investor Relations Textbook")
- **intelligent-textbook-ee2301** ("Intelligent Textbook - Digital System
  Design")

- [ ] Set `site_url` in each project's `mkdocs.yml`, or decide whether to
  exclude these from the portfolio CSV.
