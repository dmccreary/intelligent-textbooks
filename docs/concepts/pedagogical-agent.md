---
title: Pedagogical Agents
description: A pedagogical agent is a visual mascot character embedded in a textbook or learning environment that guides students through activities, provides encouragement, and makes abstract content feel more approachable.
image: /concepts/pedagogical-agents-infographic.jpg
og:image: /concepts/pedagogical-agents-infographic.jpg
---
# Pedagogical Agents

A **pedagogical agent** is a visual mascot character embedded in
a textbook or learning environment that guides students through
activities, provides encouragement, and makes abstract content
feel more approachable. Research on the **persona effect** (coined
by James Lester) shows that the mere presence of a lifelike
character improves learner engagement and perception of the
learning experience.

![](./pedagogical-agents-infographic.jpg)

## Related Terms

| Term | Emphasis |
|---|---|
| **Animated pedagogical agent** | Character with visual movement or animation |
| **Learning companion** | Character that learns alongside the student rather than acting as authority |
| **Motivational agent** | Primary role is encouragement rather than direct instruction |
| **Margin character** | Print-textbook tradition of illustrated characters in margins with tips |

## Why Use a Pedagogical Agent?

1. **Engagement** — A consistent character gives the textbook a personality that students connect with
2. **Wayfinding** — The agent signals special content types (tips, challenges, reflections) at a glance
3. **Encouragement** — Phrases from the agent normalize struggle and celebrate progress
4. **Branding** — A distinctive mascot makes the course memorable and builds community identity

## Implementing a Pedagogical Agent in MkDocs Material

There are three progressively richer ways to bring a pedagogical
agent into an intelligent textbook built with MkDocs Material.

### Method 1: Inline Image with Markdown

![Nell using her intelligent textbook](../img/nell-colored.png){ width="100", align="right" }


The simplest approach is to place the agent image directly
in a page using the `attr_list` Markdown extension
(which must be enabled in `mkdocs.yml`).

```markdown
![Nell using her intelligent textbook]
(../img/nell-colored.png)
{ 
  width="100", 
  align="right"
}
```

This renders the image floated to the right of the surrounding
text. The `width="100"` attribute constrains the image size, and
`align="right"` wraps the text around it. This is the technique
used on the [About](../about.md) page of this site, where our
mascot **Nell** appears beside the introductory text:

```markdown
![](./img/nell-colored.png){ width="200", align="right" }
This website is part of a series of resources to help teachers
from around the world create the foundation for free and open
intelligent textbooks.

Our character to the right is **Nell**. She is using an
intelligent textbook that adapts lessons to her needs.
```

This method requires no custom CSS or JavaScript — only the
image file and the `attr_list` Markdown extension.

### Method 2: Custom Admonition with CSS

For a richer experience, you can create a **custom admonition
type** that automatically displays the agent's icon in the
corner of a callout box. This lets content authors simply write
a standard admonition and have the mascot appear without manually
inserting images.

#### CSS

Add the following to your `docs/css/extra.css`. This example
uses a class called `companion-agent` and references the
agent icon at `docs/img/nell-colored.png`:

```css
/* Companion Agent admonitions — Nell mascot in upper-right corner */
.admonition.companion-agent {
  position: relative;
  border-left-color: #1565C0 !important;
}

.admonition.companion-agent > .admonition-title {
  position: relative;
  padding-top: 14px;
  background-color: rgba(21, 101, 192, 0.1) !important;
}

.admonition.companion-agent > .admonition-title::after {
  content: "";
  position: absolute;
  top: 1px;
  right: -4px;
  width: 48px;
  height: 48px;
  background-image: url("../img/nell-colored.png");
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.9;
}

/* Scale down on mobile */
@media (max-width: 600px) {
  .admonition.companion-agent > .admonition-title::after {
    width: 32px;
    height: 32px;
    top: 1px;
    right: 4px;
  }
}
```

Note that the `::after` pseudo-element is placed on the
**`.admonition-title`** rather than the admonition container
itself. MkDocs Material applies `overflow: hidden` to the
admonition body, which clips absolutely positioned children.
Attaching the icon to the title element avoids this problem.

#### Tuning the Icon Position

The exact placement of the mascot icon depends on your image
dimensions and how much of the title bar you want it to
overlap. Here are the key CSS properties to adjust:

| Property | What it controls | Example |
|---|---|---|
| `padding-top` on `.admonition-title` | Height of the title bar — increase to give the icon more vertical room | `14px` makes the title bar taller |
| `top` on `::after` | Vertical offset of the icon within the title bar — positive moves down, negative moves up | `1px` sits just inside the top edge |
| `right` on `::after` | Horizontal offset from the right edge — smaller (or negative) moves the icon closer to the edge | `-4px` pushes the icon to the far right |
| `width` / `height` on `::after` | Size of the icon — keep equal to preserve aspect ratio | `48px` is a good default; use `32px` on mobile |
| `opacity` on `::after` | Transparency of the icon — `1.0` is fully opaque, lower values fade it into the background | `0.9` is slightly transparent |

A typical tuning workflow:

1. Start with the defaults above
2. Adjust `padding-top` on the title until the bar is tall enough for your icon
3. Adjust `top` and `right` on the `::after` to position the icon where you want it
4. Use your browser's developer tools (right-click the icon area, Inspect) to live-edit values before committing them to `extra.css`
5. Check the mobile breakpoint (`@media max-width: 600px`) — you will usually want a smaller icon and tighter margins on small screens

#### Markdown Usage

With the CSS in place, content authors write a standard
MkDocs Material admonition using the custom type:

```markdown
!!! companion-agent "Nell Says"
    Remember, the best way to learn a new concept is to
    connect it to something you already know. Check the
    learning graph to see what prerequisites you've
    already mastered!
```

#### Live Example

The admonition below is rendered using the CSS above, which
is active on this site. Note how Nell's icon appears in the
upper-right corner of the title bar:

!!! companion-agent "Nell Says"
    Remember, the best way to learn a new concept is to
    connect it to something you already know. Check the
    learning graph to see what prerequisites you've
    already mastered!

!!! companion-agent "Nell's Study Tip"
    Try explaining this concept to a friend. Teaching is
    one of the most powerful ways to solidify your own
    understanding!

### Method 3: Automatic Detection with JavaScript

The most flexible approach adds JavaScript that **automatically**
applies the mascot styling whenever an admonition title mentions
the agent's name or catchphrases. This means authors never need
to remember a special admonition type — they just write naturally
and the mascot appears.

#### JavaScript

Add the following to `docs/js/extra.js`:

```javascript
document.addEventListener("DOMContentLoaded", function () {

    // Phrases that trigger the companion-agent styling
    const agentPhrases = [
        "nell",
        "nell says",
        "nell's tip"
    ];

    document.querySelectorAll(".admonition").forEach((admonition) => {
        const title = admonition.querySelector(".admonition-title");
        if (title) {
            const titleText = title.textContent.toLowerCase();
            if (agentPhrases.some(phrase => titleText.includes(phrase))) {
                admonition.classList.add("companion-agent");
            }
        }
    });
});
```

Now any admonition whose title contains the word "Nell" will
automatically receive the mascot icon:

```markdown
!!! tip "Nell Says"
    Don't skip the practice problems — retrieval practice is
    one of the strongest ways to move knowledge into long-term
    memory!

!!! note "Nell's Tip"
    Try explaining this concept to a friend. If you can teach
    it, you truly understand it.
```

Both admonitions above will display the agent icon in the
upper-right corner, even though they use standard admonition
types (`tip` and `note`).

## Case Study: Sylvia the Squirrel

![Sylvia Learning Assistant](./sylvia-learning-assistent.jpg)

The [AP Statistics Course](https://dmccreary.github.io/statistics-course/)
provides an excellent real-world example of a fully integrated
pedagogical agent. The mascot is **Sylvia**, a friendly red
squirrel whose visual identity is woven into every layer of the
site.

### Character Design

Sylvia has a detailed persona that reinforces the course theme:

- A red squirrel who became interested in statistics through optimizing her acorn collection
- Wears a forest-green cardigan and round glasses
- Catchphrase: *"Let's crack this nut!"*
- Additional signature phrases: *"Acorn for your thoughts"*, *"Squirrel away"*, *"My tail's tingling"*

### Site-Wide Color Theme

The entire MkDocs Material color palette is derived from
Sylvia's appearance, defined as CSS custom properties:

```css
:root {
  --sylvia-green: #2E7D32;       /* cardigan */
  --sylvia-auburn: #B5651D;      /* fur */
  --sylvia-cream: #FFF8E1;       /* belly */
  --sylvia-hazel: #8B7355;       /* eyes/glasses */
}
```

These variables override the Material theme defaults so that
links use her auburn fur color, iframes get a green cardigan
border, and the primary header matches her green cardigan.

### Custom Admonition CSS

Sylvia has her own admonition class that places a 48x48 image
of her in the upper-right corner of the callout box:

```css
.admonition.sylvia {
  position: relative;
  border-left-color: var(--sylvia-green) !important;
}

.admonition.sylvia > .admonition-title {
  background-color: rgba(46, 125, 50, 0.1) !important;
}

.admonition.sylvia::after {
  content: "";
  position: absolute;
  top: 3px;
  right: 12px;
  width: 48px;
  height: 48px;
  background-image: url("../img/sylvia-192.png");
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.9;
}
```

### Automatic JavaScript Detection

The JavaScript scans every admonition title for Sylvia's name
or any of her catchphrases and adds the `sylvia` class
automatically:

```javascript
const sylviaPhrases = [
    "sylvia",
    "acorn for your thoughts",
    "let's crack this nut",
    "squirrel away",
    "my tail's tingling"
];

document.querySelectorAll(".admonition").forEach((admonition) => {
    const title = admonition.querySelector(".admonition-title");
    if (title) {
        const titleText = title.textContent.toLowerCase();
        if (sylviaPhrases.some(phrase => titleText.includes(phrase))) {
            admonition.classList.add("sylvia");
        }
    }
});
```

This means a content author simply writes:

```markdown
!!! quote "Sylvia Says"
    A p-value less than 0.05 doesn't mean the result is
    important — it means the result is unlikely under the
    null hypothesis. Let's crack this nut!
```

And Sylvia's icon and green styling appear automatically.

### Sylvia FAQ Reference

The statistics course FAQ includes a dedicated section
explaining who Sylvia is and why she appears throughout
the textbook:
[Who is Sylvia the Squirrel?](https://dmccreary.github.io/statistics-course/faq/#who-is-sylvia-the-squirrel)

## Summary of the Three-Layer Pattern

| Layer | Files | Author Effort | Flexibility |
|---|---|---|---|
| Inline image | Markdown only | Add image tag per page | Low — manual placement |
| Custom admonition CSS | `extra.css` | Use custom admonition type | Medium — consistent styling |
| Auto-detect JavaScript | `extra.css` + `extra.js` | Write naturally, agent appears | High — zero author overhead |

For most intelligent textbook projects, we recommend implementing
all three layers. The inline image works well for the About page
and chapter introductions. The custom admonition CSS provides
consistent branding for tips and encouragement callouts. The
JavaScript auto-detection ensures the agent appears whenever
authors mention the character, even if they forget the custom
admonition type.

## Integrating the Agent into Content Generation

Once the CSS and JavaScript layers are in place, the final
step is to ensure that AI-powered content generation tools
consistently include the pedagogical agent. When using
Claude Code skills to generate chapter content, the agent's
personality, voice, and placement rules must be documented
in the project's `CLAUDE.md` file so that every skill
invocation produces content with the agent woven in.

### Why CLAUDE.md Matters

The `CLAUDE.md` file is the single source of truth that
Claude Code reads at the start of every session. Any
instruction placed here applies automatically to all
skills — chapter generation, quiz generation, FAQ generation,
and more. By encoding the agent's character, voice, and
placement rules in `CLAUDE.md`, you guarantee consistent
agent presence across hundreds of generated pages without
repeating instructions in every prompt.

### What to Include

A complete pedagogical agent section in `CLAUDE.md` should
cover five areas:

| Area | Purpose | Example |
|---|---|---|
| **Character overview** | Name, species/form, backstory, role in the book | "Sylvia is a red squirrel who discovered statistics while optimizing her acorn collection" |
| **Appearance** | Visual details so image prompts stay consistent | "Round tortoiseshell glasses, green cardigan with elbow patches, fluffy tail" |
| **Voice and signature phrases** | Tone, speech patterns, catchphrases that trigger the CSS/JS styling | "Let's crack this nut!", "Acorn for your thoughts?" |
| **Placement rules** | Where the agent appears in each chapter and how often | "Chapter openings, difficult concepts, margin notes, after hard sections, chapter summaries" |
| **Do's and don'ts** | Guardrails to prevent overuse or tone-breaking content | "She's a seasoning, not the main dish — 1-2 appearances per major section" |

### Example: Statistics Course CLAUDE.md

The [Statistics Course CLAUDE.md](https://github.com/dmccreary/statistics-course/blob/main/CLAUDE.md)
is a real-world example of this pattern. Here is how the
key sections are structured:

#### Narrative Anchor Section

The file begins with a `## Narrative Anchor: Sylvia the Statistical Squirrel`
section containing:

- **Character Overview** — a short paragraph establishing
  Sylvia as the book's mascot and guide
- **Appearance** — a bullet list of species, signature
  features, outfit, accessories, and expressions
- **Personality Traits** — a table mapping traits like
  "Curious", "Encouraging", and "Self-deprecating" to
  descriptions
- **Backstory** — a paragraph about how Sylvia optimized
  her acorn collection, referenced occasionally in content
- **Voice & Language** — tone description, speech patterns,
  and a list of signature phrases

#### Placement Rules Table

A table tells the content generator exactly when Sylvia
should appear:

| Context | Role |
|---|---|
| Chapter openings | Introduces the topic with enthusiasm |
| Difficult concepts | Offers reassurance and reframes the challenge |
| Margin notes | Quick tips, puns, or encouragement |
| Common mistakes | Gently warns without shaming |
| After hard sections | Celebrates progress |
| Practice problems | Encourages engagement |
| Chapter summaries | Reinforces key takeaways |

#### Do's and Don'ts

Explicit guardrails prevent the generator from overusing
the character:

- **Do:** Use the agent to make emotional connections, ask
  guiding questions, celebrate milestones
- **Don't:** Overuse her, make her annoying or interruptive,
  have her explain things condescendingly, force jokes

#### Chapter Structure Template

The chapter content structure section explicitly references
the agent at two points:

1. **Introduction** — "engaging hook with Sylvia quote"
2. **Summary** — "Let's squirrel away..." wrap-up

This ensures every generated chapter begins and ends with
the agent's voice.

#### Color Theme Section

A `## Sylvia Color Theme` section defines CSS variables
derived from the character's appearance and maps them to
site elements. This gives the content generator context
for why specific colors are used in MicroSim templates:

```css
:root {
  --sylvia-green: #2E7D32;   /* Cardigan - primary */
  --sylvia-auburn: #B5651D;  /* Fur - accent */
  --sylvia-cream: #FFF8E1;   /* Belly - backgrounds */
  --sylvia-hazel: #8B7355;   /* Eyes/glasses - decorative */
}
```

### Minimal CLAUDE.md Template

For a new project, start with this minimal template and
expand as needed:

```markdown
## Narrative Anchor: [Agent Name]

### Character Overview

**[Name]** is the book's mascot and guide — [1-2 sentence
description of who they are and why they appear in the book].

### Voice

**Tone:** [e.g., warm, encouraging, playful]

**Signature phrases:**
- "[Phrase 1]" (used when [context])
- "[Phrase 2]" (used when [context])

### Placement Rules

| Context | Role |
|---|---|
| Chapter openings | Introduces the topic |
| Difficult concepts | Offers reassurance |
| Chapter summaries | Reinforces key takeaways |

### Do's and Don'ts

**Do:** Use [Name] to encourage, ask guiding questions,
celebrate milestones. Limit to 1-2 appearances per section.

**Don't:** Overuse, interrupt flow, be condescending, or
force humor.

### Custom Admonition

Any admonition with "[Name]" in the title will automatically
display the mascot icon via CSS/JS. Use any standard
admonition type:

    !!! tip "[Name] Says"
        [Content here]
```

### How Skills Use These Instructions

When a Claude Code skill like `chapter-content-generator`
runs, it reads `CLAUDE.md` before generating any content.
The skill does not need special logic for the agent — it
simply follows the instructions it finds:

1. The **character overview** tells it who the agent is
2. The **voice section** tells it how the agent speaks
3. The **placement rules** tell it where to insert agent
   dialogue
4. The **do's and don'ts** prevent overuse
5. The **custom admonition** format tells it the exact
   Markdown syntax to use

The CSS and JavaScript layers then handle rendering
automatically — the skill only needs to produce the
correct Markdown, and the agent icon and styling appear
on the published site.

## References

1. [The Persona Effect: Affective Impact of Animated Pedagogical Agents](https://dl.acm.org/doi/10.1145/258549.258797) - 1997 - ACM CHI '97 - The seminal paper by James C. Lester et al. that coined the term "persona effect," demonstrating that the mere presence of a lifelike animated agent improves learner engagement and perception of the learning experience. Study of 100 middle school students interacting with Herman the Bug in the Design-A-Plant environment.
2. [The Persona Effect: Affective Impact of Animated Pedagogical Agents (PDF)](https://intellimedia.ncsu.edu/wp-content/uploads/sites/42/dap-chi-97.pdf) - 1997 - NC State IntelliMedia Lab - Full text PDF of the original persona effect paper hosted by Lester's research lab at North Carolina State University.
3. [Pedagogical Agent — Wikipedia](https://en.wikipedia.org/wiki/Pedagogical_agent) - Wikipedia - General overview of pedagogical agents including history, design principles, and the role of the persona effect in educational technology research.
4. [Pedagogical Agent — ScienceDirect Topics](https://www.sciencedirect.com/topics/computer-science/pedagogical-agent) - ScienceDirect - Comprehensive survey of pedagogical agent research including social agency theory, which explains why lifelike agents trigger social responses that increase learner motivation.
5. [The Psychometric Structure of Pedagogical Agent Persona](https://amybaylor.com/Articles/2005TICL.pdf) - 2005 - Amy Baylor - Extends persona effect research by defining the psychometric dimensions (facilitator, motivator, expert) along which learners perceive pedagogical agents.
6. [Effects of Image and Animation on Agent Persona](https://amybaylor.com/Articles/2003JECR.pdf) - 2003 - Amy Baylor, JECR - Investigates whether the visual image or animation of an agent drives the persona effect, finding that voice may contribute more to learning outcomes than the animated character alone.
7. [James C. Lester — Academic Profile](https://research.com/u/james-lester) - Research.com - Profile of James C. Lester's research at NC State covering learning environments, AI, human-computer interaction, and narrative-centered learning.
8. [The Politeness Effect: Pedagogical Agents and Learning Outcomes](https://www.sciencedirect.com/science/article/abs/pii/S1071581907001267) - 2007 - ScienceDirect - Builds on the persona effect by showing that polite language from pedagogical agents further improves learning outcomes, extending social agency theory to conversational style.
9. [Statistics Course — Sylvia the Squirrel FAQ](https://dmccreary.github.io/statistics-course/faq/#who-is-sylvia-the-squirrel) - AP Statistics Course - Real-world example of a fully integrated pedagogical agent with custom CSS, JavaScript auto-detection, and character-driven color theme.
10. [Statistics Course CSS](https://github.com/dmccreary/statistics-course/blob/main/docs/css/extra.css) - GitHub - Implementation of the Sylvia custom admonition CSS pattern showing how to place a pedagogical agent icon in admonition title bars.
11. [Statistics Course JavaScript](https://github.com/dmccreary/statistics-course/blob/main/docs/js/extra.js) - GitHub - JavaScript auto-detection code that scans admonition titles for agent phrases and applies mascot styling automatically.
12. [Statistics Course CLAUDE.md](https://github.com/dmccreary/statistics-course/blob/main/CLAUDE.md) - GitHub - Example of encoding a pedagogical agent's character, voice, placement rules, and do's/don'ts in CLAUDE.md so AI content generation tools consistently include the agent.
