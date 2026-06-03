---
title: Productivity Jumps Stair-Step Infographic
description: An interactive stair-step infographic showing how each new AI tool cuts the person-hours needed to build an intelligent textbook — from 3,000 hours by hand down to 10 hours with Claude Code Skills.
image: /sims/productivity-jumps/productivity-jumps.png
og:image: /sims/productivity-jumps/productivity-jumps.png
twitter:image: /sims/productivity-jumps/productivity-jumps.png
social:
   cards: false
quality_score: 0
---

# Productivity Jumps Stair-Step Infographic

<iframe src="main.html" height="597px" width="100%" scrolling="no"></iframe>

[Run the Productivity Jumps Stair-Step Infographic MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This interactive infographic tells the story of how authoring an **intelligent
textbook** has gone from a year-plus undertaking to an afternoon of work. Each
rising step on the staircase represents a generation of tooling, and the height
of the step reflects productivity on a **logarithmic scale** — every full step
up is roughly an order-of-magnitude gain.

| Step | Tool | Person-Hours | Speed-up |
|------|------|-------------:|---------:|
| 1 | **Manual** (by hand) | 3,000 | baseline |
| 2 | **ChatGPT** — generate pages & elements | 1,000 | 3× |
| 3 | **Claude Code** — agentic workflows | 100 | 30× |
| 4 | **Claude Code Skills** — full-book automation | 10 | 300× |

The labels above each step show the person-hours and the speed-up over manual
work; the labels below name the tool. Clicking a step opens a detailed
description panel beneath the diagram.

## How to Use

- **Click any step** in the staircase to read a detailed description of that
  tool in the panel below the diagram.
- Use the **◀ Prev** and **Next ▶** buttons to walk up and down the staircase
  one step at a time.
- Use **Reset** to return to the Manual baseline.

The MicroSim opens with the Manual baseline selected so the concept is visible
immediately; explore upward to watch the person-hours fall by orders of
magnitude.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/intelligent-textbooks/sims/productivity-jumps/main.html"
        height="597px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
Undergraduate / professional development for educators and content authors.

### Duration
5-10 minutes

### Prerequisites
Familiarity with the general idea of authoring digital educational content.

### Learning Objectives

After using this MicroSim, learners will be able to:

1. **Illustrate** how each generation of AI tooling reduces the effort needed to
   author an intelligent textbook.
2. **Compare** the person-hours required across the four authoring approaches on
   a logarithmic productivity scale.
3. **Explain** why reusable Claude Code Skills produce an order-of-magnitude
   productivity jump over prompting individual pages.

### Activities

1. **Exploration** (3 min): Click each step in order, from Manual to Claude Code
   Skills, and read the description for each.
2. **Guided Practice** (3 min): Ask learners to identify which transition
   produces the largest single jump in productivity and to articulate *why*
   (moving from generating individual elements to automating whole workflows).
3. **Assessment** (3 min): Have learners estimate the speed-up multiplier
   between adjacent steps and rank the four approaches by person-hours.

### Discussion Questions

- Why does encoding a workflow as a reusable Skill outperform prompting for one
  page at a time?
- What kinds of textbook content are easiest to automate, and which still
  benefit most from human authorship?

### Assessment

- Learners can correctly order the four approaches by person-hours.
- Learners can describe at least one reason the Skills step achieves a 300×
  improvement over manual authoring.

## References

1. [Intelligent Textbooks Site](https://dmccreary.github.io/intelligent-textbooks/) — the project this MicroSim documents.
2. [Claude Code](https://www.anthropic.com/claude-code) — agentic coding tool used to author content directly in project files.
3. [Five Levels of Intelligent Textbooks](https://dmccreary.github.io/intelligent-textbooks/) — background on the spectrum of textbook intelligence.
