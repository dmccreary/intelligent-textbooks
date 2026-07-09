# The 5Rs of Open Educational Resources — and a Sixth R for Intelligent Textbooks

## Overview

In 2014, open education researcher **[David Wiley](https://www.linkedin.com/in/opencontent/)** proposed a simple test for what makes an educational resource truly "open." An open license — such as a [Creative Commons](https://creativecommons.org) license — should grant users permission to do five things with a resource: **Retain**, **Reuse**, **Revise**, **Remix**, and **Redistribute**. These became known as the **5Rs**, and they remain the single most influential framework in the Open Educational Resources (OER) movement.

This appendix explains the 5Rs, why they mattered, and how they extend naturally to AI-generated **intelligent textbooks** — including a proposed sixth R, **Regenerate**, that captures what changes when the source artifact is no longer just a book, but a reusable set of agentic skills capable of producing many books.

## The Original 5Rs

| R | Meaning | Example |
|---|---------|---------|
| **Retain** | Make, own, and control copies of the content. | Download a textbook and keep it forever. |
| **Reuse** | Use the content in many different ways. | Teach a class using the textbook, post it on a learning management system, or print copies for students. |
| **Revise** | Modify or adapt the content. | Update outdated examples, correct errors, or translate the book into Spanish. |
| **Remix** | Combine the content with other open resources to create something new. | Merge chapters from three different open textbooks into one custom course text. |
| **Redistribute** | Share copies of the original or modified version with others. | Give students a customized version of the textbook, or publish it online for others to use. |

Each right builds on the one before it: you cannot revise a resource you cannot retain, you cannot remix a resource you cannot revise, and you cannot redistribute a resource you have no right to modify in the first place. The 5Rs are therefore cumulative — each step grants progressively more freedom to educators and learners.

The MicroSim below shows the workflow as an interactive diagram, including a proposed 6th R (Regenerate) discussed later in this appendix. Hover any step for a quick tip, or click it for a detailed explanation.

<iframe src="../../sims/five-rs-oer/main.html" height="802px" width="100%" scrolling="no"></iframe>

[Run the 5Rs of OER Workflow MicroSim Fullscreen](../sims/five-rs-oer/main.html){ .md-button .md-button--primary }

## Why the 5Rs Mattered

Before Wiley proposed the 5Rs, a great deal of "free" educational content was free only in the sense that it cost nothing to read. It was not necessarily free to modify, translate, excerpt, or share. A publisher could post a PDF at no charge while still reserving every other right under traditional copyright — no adaptation, no redistribution, no derivative works.

The 5Rs drew a sharp line between two very different ideas:

- **Free access** — "you can read this."
- **Open access** — "you can build upon this."

That distinction — between merely *gratis* content and genuinely *libre* content — became foundational to the modern OER movement, and it is the reason licenses like [CC BY](https://creativecommons.org/licenses/by/4.0/) and [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/) are treated so differently from a plain "free download" link. A resource only qualifies as *open* if a teacher can legally retain, reuse, revise, remix, and redistribute it — not just view it.

## Why the 5Rs Are Especially Relevant to Intelligent Textbooks

The vision behind this project — AI-generated **intelligent textbooks** built from learning graphs, MicroSims, and reusable agentic skills — is a natural extension of the 5R model. Traditional OER treats a textbook as a static document that a human editor can open in a word processor and change by hand. An intelligent textbook is different: it is generated, and can be regenerated, by an agentic workflow that turns a course description into chapters, simulations, quizzes, and a learning graph.

That shifts what each of the 5Rs means in practice:

| Original 5R | AI-Enabled Interpretation |
|---|---|
| **Retain** | Keep both the textbook *and* the prompts, skills, and learning graph used to generate it. |
| **Reuse** | Deploy the same textbook content across different AI platforms and classrooms. |
| **Revise** | Use AI agents to update content, examples, and simulations automatically rather than by hand. |
| **Remix** | Combine chapters, MicroSims, mascots, assessments, and learning graphs from different sources into new intelligent textbooks. |
| **Redistribute** | Publish customized versions of the book for specific schools, districts, or the broader community. |

The most important shift is in **Retain**. For a static OER textbook, retaining the source (a Word document or set of Markdown files) is sufficient to guarantee future freedom. For an intelligent textbook, the Markdown output is only half the story — the *learning graph*, the *course description*, and the *skills* that generated the chapters, MicroSims, and quizzes are just as essential to retain. Lose those, and the book becomes a static artifact again, no more adaptable than a PDF.

## Is There a Sixth R?

The AI era raises a genuinely new question: does agentic content generation require a **sixth R** — a freedom the original 5Rs didn't anticipate because it wasn't technically possible in 2014? A few candidates come up naturally:

- **Regenerate** — Recreate the textbook dynamically from reusable agentic skills, rather than hand-editing static text.
- **Reason** — Allow an AI tutor to explain, adapt, and reason about the content on the learner's behalf.
- **Respond** — Personalize instruction and pacing based on each learner's needs.
- **Reflect** — Use learner analytics and AI feedback loops to continuously improve the textbook over time.

Of these, **Regenerate** fits most naturally alongside the original 5Rs. Reason, Respond, and Reflect all describe things an AI *does with* a textbook at the point of use — closer to pedagogy than to licensing. Regenerate, by contrast, describes a *right* — the freedom to reconstruct or re-derive the artifact itself — which is exactly the kind of freedom Wiley's framework was designed to protect.

> **Regenerate**: The right to recreate, update, or produce new versions of an intelligent textbook from its underlying reusable components — the course description, learning graph, and agentic skills — rather than only from the rendered book itself.

Regenerate is a meaningful evolution beyond the original 5Rs, but it stays faithful to their spirit. Wiley's framework was always about who controls the *source* of an educational resource and what they're permitted to do with it. For an intelligent textbook, the true source is no longer only the rendered chapters — it is the structured knowledge (the learning graph), the generative process (the skills), and the platform-independent instructions that can produce many versions of the book across tools like Claude Code and OpenAI Codex. An open license that only covers the rendered Markdown, and not the learning graph and skills that generated it, gives educators a copy of the *output* but not the *means of production* — and Regenerate is the right that closes that gap.

## Applying This to This Project

This site already practices most of the 5Rs by design:

- The book's content is openly licensed (see [License](../license.md)) so educators can **retain** and **redistribute** it.
- The [learning graph](../learning-graph/index.md) and [course description](../course-description.md) are published alongside the chapters, not hidden — enabling **remix** and **regenerate**.
- The [skills](../skills/index.md) used to generate chapters, quizzes, glossaries, and MicroSims are documented and reusable, so another author can point them at a different course description and **regenerate** an entirely new intelligent textbook.
- MicroSims and other components are built to be **reused** independently of the chapter they first appeared in.

Framing the project's openness around the 5Rs — plus Regenerate — gives a concrete checklist for evaluating whether an intelligent textbook is truly open, or merely free to read: can someone else retain, reuse, revise, remix, redistribute, *and regenerate* it?

## References

- Wiley, D. (2014). [The Access Compromise and the 5th R](https://opencontent.org/blog/archives/3221). *Iterating Toward Openness* (blog).
- Wiley, D. [Defining the "Open" in Open Content and Open Educational Resources](https://opencontent.org/definition/).
- Creative Commons. [About CC Licenses](https://creativecommons.org/about/cclicenses/).
- See also: [Open Educational Resources](../concepts/open-educational-resources.md) in this book's Educational Concepts section.
