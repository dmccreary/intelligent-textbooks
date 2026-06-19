---
title: Intelligent Textbook Page Views
description: Interactive Chart.js MicroSim for intelligent textbook page views.
image: /sims/site-analytics/site-analytics.png
og:image: /sims/site-analytics/site-analytics.png
twitter:image: /sims/site-analytics/site-analytics.png
social:
   cards: false
quality_score: 0
---

# Intelligent Textbook Page Views

<iframe src="main.html" height="1690" width="100%" scrolling="no"></iframe>

[Run the Intelligent Textbook Page Views MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This chart shows Google Analytics page-view totals for the **last 90 days**
across every published intelligent textbook in the collection. Each bar is one
textbook, ranked from most-visited to least-visited, with the exact count
labeled at the end of the bar.

The chart loads its data at runtime from
[`ga4-pageviews-results.csv`](ga4-pageviews-results.csv) in this same directory,
so refreshing the report (see below) updates the chart with no code changes.

## How to Use

- **Hover** over any bar to see its exact page-view count in a tooltip.
- Bars are **sorted descending**, so the most-used textbooks appear at the top.
- The subtitle reports the number of textbooks and the combined total.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/intelligent-textbooks/sims/site-analytics/main.html"
        height="1690px"
        width="100%"
        scrolling="no"></iframe>
```

## How the Data Is Generated

The CSV is produced by `src/site-analytics/ga4-pageviews-report.py`, which:

1. Scans every `~/Documents/ws/*/mkdocs.yml` for its Google Analytics property ID.
2. Maps each ID to its numeric GA4 property via the Analytics Admin API.
3. Queries the GA4 Data API for `screenPageViews` over the last 90 days.

To refresh this chart, regenerate and copy the CSV:

```bash
conda activate google-analytics
python src/site-analytics/ga4-pageviews-report.py --csv
cp src/site-analytics/ga4-pageviews-results.csv docs/sims/site-analytics/
```

See `src/site-analytics/README.md` for full setup details.

## Lesson Plan

This MicroSim doubles as a **data-literacy** example: reading and interpreting a
ranked horizontal bar chart.

### Duration
5-10 minutes

### Activities

1. **Read the ranking** (2 min): Identify the three most-visited and three
   least-visited textbooks.
2. **Estimate vs. exact** (3 min): Estimate a mid-range bar's value from the
   axis, then hover to check against the labeled count.
3. **Interpret** (5 min): Discuss why traffic varies — topic popularity,
   publication date, promotion, and content depth.

## References

1. [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
2. [Chart.js Bar Chart (horizontal)](https://www.chartjs.org/docs/latest/charts/bar.html#horizontal-bar-chart)
3. [GA4 Data API](https://developers.google.com/analytics/devguides/reporting/data/v1)
