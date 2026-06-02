---
title: History of Intelligent Textbooks & Interactive Learning Timeline
description: An interactive vis-timeline tracing the key ideas behind intelligent textbooks, MicroSims, and interactive digital learning — from Piaget's constructivism and knowledge spaces through generative AI, Claude Code, and the 100th open intelligent textbook. Filter by Theory of Learning, Learning Graphs, Generative AI, and Science Fiction.
image: /sims/intelligent-textbook-timeline/intelligent-textbook-timeline.png
og:image: /sims/intelligent-textbook-timeline/intelligent-textbook-timeline.png
twitter:image: /sims/intelligent-textbook-timeline/intelligent-textbook-timeline.png
social:
  cards: false
hide:
  - toc
library: vis-timeline
---
# History of Intelligent Textbooks & Interactive Learning

<iframe src="main.html" width="100%" height="726" scrolling="no"></iframe>

[Run the Timeline Fullscreen](main.html){ .md-button .md-button--primary }

!!! note "Scrolling and zooming"
    Scroll **horizontally** over the timeline — a sideways two-finger swipe on a
    trackpad, or hold **Shift** while turning the mouse wheel — to **zoom in and out**.
    **Vertical** scrolling is never trapped: it scrolls the page as usual. You can also
    click and drag to pan, or press **Fit All** to reset the view.

To include this MicroSim on your own web page, copy the following line of HTML:

```html
<iframe src="https://dmccreary.github.io/intelligent-textbooks/sims/intelligent-textbook-timeline/main.html" width="100%" height="726" scrolling="no"></iframe>
```

## About This Timeline

This interactive timeline traces the lineage of ideas behind **intelligent textbooks**,
**MicroSims**, and **interactive digital learning** — from foundational theories of how
people learn, through the mathematics of concept dependencies, to the generative-AI tools
that now author interactive educational content.

Every event was chosen because it **promoted critical thinking** — moving learners from
passively receiving facts toward actively building, exploring, and reasoning.

Use the filter buttons to view one of three tracks at a time:

| Filter | Color | What it covers |
|--------|-------|----------------|
| **Theory of Learning** | Blue | How people learn: Piaget's constructivism, Bloom's Taxonomy, Vygotsky's Zone of Proximal Development, and Papert's LOGO turtle. |
| **Learning Graphs** | Green | The mathematics of concept dependencies: Knowledge Space Theory, ALEKS, Wikipedia's hyperlinked knowledge, and graph-based learning paths. |
| **Generative AI** | Amber | AI that authors learning content: GPT-2, ChatGPT, Claude Code, Claude Code Skills, the MicroSims paper, and the 100th intelligent textbook. |
| **Science Fiction** | Purple | Imagined futures that inspired the field: Asimov's *The Fun They Had* and Neal Stephenson's *The Diamond Age*. |

The category filter buttons themselves carry the track colors, so they double as the legend.

## How to Use

- **Filter buttons** — click *Theory of Learning*, *Learning Graphs*, *Generative AI*, or *Science Fiction* to isolate one track; click *All Events* to see everything.
- **Click an event** — the detail panel below the timeline shows the full title, who created it, why it matters, its connection to critical thinking, and a source link where available.
- **Fit All** — resets the view to show every visible event.
- **Drag** — click and drag the timeline to pan left and right through the decades.
- **Scroll** — scroll *horizontally* (a sideways two-finger swipe or shift-scroll) over the timeline to zoom in and out; *vertical* scrolling moves the page as normal and is never trapped.

## Timeline Events

### Theory of Learning

1. **1936 — Jean Piaget's Constructivism.** Learning as active model-building, not passive reception.
2. **1956 — Bloom's Taxonomy.** A ladder of cognitive objectives whose upper rungs (analyze, evaluate, create) define critical thinking.
3. **1978 — Vygotsky's Zone of Proximal Development.** The theory behind scaffolding learners just beyond what they can do alone.
4. **1980 — Seymour Papert's *Mindstorms* and the LOGO Turtle.** Children program the computer rather than the reverse.

### Learning Graphs

5. **1985 — Knowledge Space Theory (Doignon & Falmagne).** A mathematical map of prerequisite dependencies — the ancestor of the learning graph.
6. **1996 — ALEKS.** Knowledge Space Theory deployed as a real adaptive, mastery-based learning system.
7. **Jan 15, 2001 — Wikipedia launches.** A free, hyperlinked graph of interconnected concepts and the reference layer beneath open textbooks.
8. **Oct 2019 — McCreary, *Lost in [Knowledge] Space*.** Graph databases for personalized learning paths.

### Science Fiction

9. **1951 — Isaac Asimov's *The Fun They Had*.** Perhaps the earliest depiction of a "mechanical teacher" that adjusts each lesson to the child's age and ability.
10. **1995 — Neal Stephenson's *The Diamond Age*.** Fiction imagines the "Young Lady's Illustrated Primer," an AI-powered adaptive intelligent textbook.

### Generative AI

11. **Feb 2019 — OpenAI releases GPT-2.** The first large language model to generate fluent educational content.
12. **Nov 2022 — ChatGPT launches.** Conversational generative AI reaches millions of learners.
13. **Nov 2023 — McCreary & Lockhart, *Micro-Simulations for Education*.** Generative AI plus p5.js to author MicroSims.
14. **Nov 2024 — McCreary, *Five Levels of Intelligent Textbooks*.** A maturity model from static print to autonomous AI tutors.
15. **Feb 2025 — Anthropic launches Claude Code.** An agent that can build and deploy entire intelligent-textbook sites.
16. **Oct 2025 — Claude Code Skills.** Portable, reusable workflows for reliable content generation.
17. **Nov 2025 — MicroSims framework paper (arXiv:2511.19864).** The first formal framework for AI-generated educational simulations.
18. **Jun 1, 2026 — The 100th open intelligent textbook.** AI-assisted authoring becomes reproducible at scale.

## Lesson Plan

**Learning objective:** Students will *trace* (Bloom L2 — Understand) the intellectual lineage
of intelligent textbooks and *analyze* (Bloom L4 — Analyze) how each idea built on the ones
before it to promote critical thinking.

1. **Warm-up (5 min).** Ask: "What is the difference between a textbook that *tells* you facts and one that *helps you think*?" Record answers.
2. **Explore the three tracks (15 min).** In small groups, assign each group one filter — Theory of Learning, Learning Graphs, or Generative AI. Each group clicks through its events and summarizes the "big idea" of its track.
3. **Connect the tracks (10 min).** As a class, draw arrows between events from different tracks (e.g., Knowledge Space Theory → learning graphs → AI that generates them). Discuss how theory, data structures, and AI tools depend on one another.
4. **Critical-thinking discussion (10 min).** For each event, ask: "How did this move learners from *receiving* knowledge toward *building* it?"
5. **Extension.** Have students propose the *next* event on the timeline (2027+) and justify which track it belongs to.

## Customizing the Timeline

All event data lives inline in `intelligent-textbook-timeline.js` in the `items` array. To add an event:

```javascript
{ id: 16, cat: 'Generative AI',
  content: 'Short label',
  start: '2027-01-01',
  title: 'Full Event Title (2027)',
  by: 'Author or organization',
  significance: `What happened and why it matters.`,
  conn: `How it promoted critical thinking.`,
  link: 'https://optional-source-url' }
```

The `cat` field must be one of `Theory of Learning`, `Learning Graphs`, or `Generative AI` so
the event picks up the correct color and filter.

## References

- [Five Levels of Intelligent Textbooks — Dan McCreary, Medium (Nov 2024)](https://dmccreary.medium.com/five-levels-of-intelligent-textbooks-b81a4c1525a0) - The maturity model that frames this project.
- [Lost in [Knowledge] Space — Dan McCreary, Medium (Oct 2019)](https://dmccreary.medium.com/lost-in-knowledge-space-14be123ea083) - Graph databases for personalized learning paths.
- [Micro-Simulations for Education — Dan McCreary & Valerie Lockhart, Medium (Nov 2023)](https://dmccreary.medium.com/micro-simulations-for-education-6989eae8d85d) - Using generative AI and p5.js to build MicroSims.
- [MicroSims: A Framework for AI-Generated, Scalable Educational Simulations — arXiv:2511.19864 (Nov 2025)](https://arxiv.org/abs/2511.19864) - The formal framework for the MicroSim approach.
- [Knowledge Space — Wikipedia](https://en.wikipedia.org/wiki/Knowledge_space) - Doignon & Falmagne's 1985 Knowledge Space Theory.
- [The Fun They Had — Wikipedia](https://en.wikipedia.org/wiki/The_Fun_They_Had) - Isaac Asimov's 1951 short story depicting a home "mechanical teacher."
- [The Diamond Age — Wikipedia](https://en.wikipedia.org/wiki/The_Diamond_Age) - Neal Stephenson's 1995 novel and its "Young Lady's Illustrated Primer."
- [Wikipedia — Wikipedia](https://en.wikipedia.org/wiki/Wikipedia) - The free encyclopedia launched January 15, 2001.
- [Constructionism (learning theory) — Wikipedia](https://en.wikipedia.org/wiki/Constructionism_(learning_theory)) - Seymour Papert and the LOGO turtle.
- [GPT-2 — Wikipedia](https://en.wikipedia.org/wiki/GPT-2) - OpenAI's 2019 language model.
- [vis-timeline Documentation](https://visjs.github.io/vis-timeline/docs/timeline/) - The library powering this MicroSim.
