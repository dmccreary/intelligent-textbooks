---
title: Book Concept Count Histogram
description: Histogram showing the distribution of concept counts across 55 intelligent textbooks, binned into 15 ranges.
image: /sims/concept-count-histogram/concept-count-histogram.png
og:image: /sims/concept-count-histogram/concept-count-histogram.png
twitter:image: /sims/concept-count-histogram/concept-count-histogram.png
social:
   cards: false
---

# Book Concept Count Histogram

<iframe src="main.html" height="542px" width="100%" scrolling="no"></iframe>

[Run the Book Concept Count Histogram MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This histogram visualizes the number of concepts in each of 55 intelligent
textbooks generated using the Learning Graph Generator. Each book's
concept count comes from its `docs/learning-graph/concept-list.md` file
and is summarized in
[book-concept-counts.csv](../concept-analytics/book-concept-counts.csv).

The horizontal axis is divided into 15 equal-width bins covering the
observed range of concept counts. The vertical axis is the number of
books that fall into each bin. Hovering over a bar shows the exact
range, the count of books in that bin, and the names of the books
(up to 8) along with their concept counts.

## How to Read It

- A bin labeled `200-236`, for example, contains every book whose
  concept count is at least 200 and less than 236.
- The tallest bin marks the most common concept-count range.
- Outliers on the right tail are textbooks with unusually large
  concept inventories (Calculus at 680, Information Systems at 580,
  Learning Linux at 550).
- The single book in the leftmost bin is the lowest-count textbook
  (Unicorns and Other Mythical Beasts at 140).

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/intelligent-textbooks/sims/concept-count-histogram/main.html"
        height="542px"
        width="100%"
        scrolling="no"></iframe>
```

## Data Source

Concept counts are extracted from each textbook's
`docs/learning-graph/concept-list.md` by counting unique numbered list
items. The summary CSV lives at
[/sims/concept-analytics/book-concept-counts.csv](../concept-analytics/book-concept-counts.csv).

## References

- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
- [Histogram (Wikipedia)](https://en.wikipedia.org/wiki/Histogram)
