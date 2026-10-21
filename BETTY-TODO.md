# Betty's Textbook Publishing TODO

Betty's tracking list for intelligent textbook publishing tasks.
(The project's own TODO.md is separate.)
Last updated: 2026-10-18

## High Priority

_(none)_

## Medium Priority

- [ ] **Hardware purchasing guides** (new quality guideline, 2026-10-18). Every book that needs hardware ordered must have a high-quality purchasing guide. Hank owns writing them, and Betty checks each hardware book for one during quality reviews.

## Low Priority

- [ ] **Add missing Google Analytics IDs** (found 2026-10-15). Use the Claude-based add-analytics skill.
  - 30 books have no `property: G-...` in `mkdocs.yml`:
    agents-course, ai-for-ee-research, asl-book, atam, business, challenger-selling,
    clan-macquarrie, dgx-eval, eight-hour-entrepreneur, fft-benchmarking,
    intelligent-textbook-ee2301, ir-textbook, learning-record-store,
    marketing-promotion-agents, marketing, mini-mba-for-startups, oer-evaluator,
    personal-financial-plan, pi-env-monitor, power-generation-and-distribution,
    psychology, public-health, scratch, spectrum-analyzer, stem-classroom-admin,
    thinking-spot-demos, token-efficiency, us-government,
    x-marketing-frontier-textbook, xapi-course
  - 1 ID with no matching GA4 property: ai-persona-testing (G-K08R4KBEXL)
  - 4 books report 0 views in 90 days (check tracking): genai-arch-patterns,
    signal-processing, systems-thinking, world-history

## Done

- [x] 2026-10-15 Renamed science-of-the-built-envrionment to science-of-the-built-environment (folder, GitHub repo, mkdocs.yml) and published.
- [x] 2026-10-15 Refreshed GA4 page-views report (87 books, 26,576 views / 90 days) and published the Site Analytics MicroSim.
- [x] 2026-10-15 Built IBook project list for Penny: ~/Documents/ws/pkg/docs/data/ibook-projects.csv
