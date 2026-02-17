# Axiom the Owl Style Guide

## Intelligent Textbooks Mascot Style Guide

## 1. Core Identity

**Name:** Axiom the Owl

Role: Narrative guide and pedagogical support asset for the Intelligent Textbooks ecosystem.

Archetype

The Wise Mentor + Encouraging Coach

Emotional Tone

* Cheerful
* Positive
* Optimistic
* Encouraging
* Patient
* Supportive
* Celebratory

Axiom never appears sarcastic, dismissive, anxious, or overly comedic.

## 2. Visual Identity

### 2.1 Silhouette and Form

* Compact, rounded body
* Large expressive eyes
* Small triangular beak
* Short, rounded wings
* Visible talons when perched
* Friendly proportions (no sharp or aggressive angles)

The silhouette must be recognizable even in monochrome.

### 2.2 Color Palette

Primary Palette:

* Academic Blue (Feathers): Deep, saturated blue
* Cream (Face and Chest): Soft warm ivory
* Golden Yellow (Eyes): Bright but not neon
* Orange (Beak and Talons): Warm amber tone
* Gold Accent (Collar): Metallic gold tone
* Red Accent (Tie): Bright academic red

Color Principles:

* Maintain consistent hue relationships
* Avoid oversaturation
* No neon or gradient-heavy treatments
* Flat or softly shaded illustration preferred

### 2.3 Expression Guidelines

Eyes:

* Large and open
* Pupils centered or slightly upward when excited
* Soft eyelids when patient or reflective

Eyebrows:

* Slightly angled for wisdom
* Raised for encouragement
* Symmetrical in neutral stance

Beak:

* Slight upward curve when neutral
* Open gently when speaking
* Never exaggerated into cartoonish laughter

## 3. Standard Pose Library

To ensure consistency, Axiom appears in defined canonical poses.

### 3.1 Neutral Guide Pose

**Use:** Introductory explanations

* Wings relaxed at sides
* Gentle closed-beak smile
* Eyes attentive and open
* Upright posture

Tone: Calm, steady, reliable.

### 3.2 Explaining Pose

**Use:** Concept clarification

* One wing slightly raised
* Subtle forward lean
* Focused eyes
* Slight open beak as if speaking

Tone: Clear, instructional, confident.

### 3.3 Thinking Pose

**Use:** Analytical or reflective sections

* Wing to chin
* Head slightly tilted
* Eyebrows gently angled inward
* Soft contemplative expression

Tone: Curious, analytical, patient.

### 3.4 Encouragement Pose

**Use:** Challenging content

* Wing thumbs-up gesture
* Warm smile
* Slight lean toward reader

Tone: Supportive, reassuring.

### 3.5 Warning Pose (Gentle)

**Use:** Highlighting common mistakes

* Both wings slightly raised
* Concerned but calm expression
* No alarm or panic visuals

Tone: Protective, caring, steady.

### 3.6 Celebration Pose

**Use:** End-of-chapter mastery

* Wings fully spread
* Bright, wide eyes
* Joyful expression
* Optional subtle confetti or sparkle accents

Tone: Proud, celebratory, affirming.

### 3.7 Welcome Pose

**Use:** Start of book, chapter, module, or major transition

* Wings open outward in a gentle, inviting arc
* Upright, confident posture
* Bright, friendly eyes
* Warm smile and slight forward lean
* Optional small glow or sunrise motif (keep subtle)

Tone: Inviting, warm, optimistic. Establishes psychological safety.

### 3.8 Tip Pose

**Use:** Highlighting insights, study strategies, or best practices

* One wing raised with a single feather extended upward
* Slight knowing smile
* Eyes slightly narrowed in insight (not suspicious)
* Optional sparkle or lightbulb icon near the raised feather

Tone: Insightful, helpful, strategic. Signals high-value advice.

## 4. Placement Rules

### 4.1 Margins

Axiom typically appears:

* In left margin callouts
* Adjacent to diagrams
* At start of sections
* At chapter conclusion

He should never obscure core instructional content.

### 4.2 Scale Guidelines

For print:

* Height approximately equal to 4–6 lines of body text

For web:

* 120–300px height depending on placement

For social:

* May be scaled larger but should not dominate title hierarchy

### 4.3 Background

* Transparent background preferred
* No busy scene behind Axiom
* If background is used, it must be subtle and flat

## 5. Typography Interaction

Axiom callouts use consistent formatting:

* Rounded callout boxes
* Soft border radius
* Light background tint
* Icon or small feather motif optional

Text tone must match personality:

Example:


## 6. Admonition Layout Implementation

We ship a dedicated stylesheet (`docs/css/axiom-mascot.css`) so Axiom appears inside
Material for MkDocs admonitions on the left side without covering the copy.

### 6.1 Layout Mechanics

* Every `.axiom-*` admonition uses a two-column CSS grid.  
  `grid-template-columns: calc(var(--axiom-badge-size) - 24px) minmax(0, 1fr)`
  reserves a fixed-width column for the mascot and a flexible column for text.
* The grid gap is set to `0` so the title bar spans edge-to-edge. The body text
  reinserts spacing with `padding-left/right: var(--axiom-grid-gap)` so only the
  content column offsets from the mascot.
* The title sits in `grid-column: 1 / -1` with `padding-left: 10px`. This keeps
  the background color flush with the container but indents the text slightly.
* The mascot image is drawn via a `::before` pseudo-element anchored to column 1.
  Each pose points to a pose-specific PNG under `docs/img/mascot`.

### 6.2 Asset Preparation

* All mascot PNGs were trimmed with a Pillow script (see
  `docs/learning-graph/trim-mascot-padding.md`) to remove transparent borders.
  Without this, the fixed column created large white gutters.
* We keep a 4px buffer around the artwork to prevent clipping when the owl feels
  animated.

### 6.3 Design Tradeoffs and Alternatives

* **Overlapping badge (old design)**  
  Pros: visually dramatic. Cons: required negative offsets, complicated
  collapsible blocks, and conflicted with the title bar height.
* **Inline icon in the title**  
  Reduces vertical space but makes the header tall and shrinks the owl to fit the
  line-height. We abandoned this to keep the mascot readable.
* **Grid-based “mascot beside body” (current)**  
  Keeps the title simple, allows any body length, and works with collapsible
  details. Tradeoff: badge width is fixed; very long headings wrap early, so we
  added the 10px indent to maintain breathing room.
* **Float-based layout**  
  Was considered but rejected because floats collapse inside
  `<details>` summary blocks and cause awkward wrapping on small screens.

When creating new poses or colors, add the pose class in Markdown
(`!!! info axiom-explain "..."`) and extend the CSS block with the
appropriate palette + `background-image`.

> “Pause here. What pattern do you notice?”

Never:

> “You should already know this.”

## 7. Behavioral Consistency

Axiom must:

* Normalize confusion
* Encourage reflection
* Celebrate effort
* Connect concepts across chapters
* Guide MicroSim exploration

Axiom must not:

* Provide full solutions without prompting thought
* Replace instructional clarity
* Overuse humor
* Appear in every paragraph

Recommended frequency:

* 3–6 appearances per chapter


## 8. Bloom Taxonomy Alignment

Axiom’s pose correlates with cognitive level:

* Remember → Gentle reminder pose
* Understand → Explaining pose
* Apply → Guiding pose
* Analyze → Thinking pose
* Evaluate → Reflective pose
* Create → Celebration pose


## 9. Animation (Optional for Web)

If animated:

* Subtle wing motion
* Gentle blink cycle
* Minimal bounce when celebrating
* No exaggerated cartoon physics

Animation duration:

* 0.5–1.5 seconds max

## 10. Accessibility

* Provide alt-text for all appearances
* Ensure sufficient contrast
* Avoid relying solely on color to convey meaning
* Maintain legibility at small sizes


## 11. Governance

All future renderings must:

* Match approved color palette
* Follow defined pose library
* Preserve personality tone
* Be reviewed against canonical mascot reference image

Versioning recommended:
Axiom v1.0 – Initial Intelligent Textbooks Edition


## 12. Emotional Contract with the Reader

Axiom represents:

* Growth from Seed Prompt to Knowledge Tree
* Patient mentorship
* Structured curiosity
* Celebrated mastery

## 13. Pose Governance Matrix

| Pose          | Emotional Function | Bloom Alignment       | Placement            |
| ------------- | ------------------ | --------------------- | -------------------- |
| Welcome       | Orientation        | Remember / Understand | Chapter start        |
| Neutral       | Guidance           | Understand            | Body sections        |
| Explaining    | Clarification      | Understand / Apply    | Concept sections     |
| Thinking      | Reflection         | Analyze               | Analytical passages  |
| Tip           | Strategic Insight  | Apply / Analyze       | Margin callouts      |
| Encouragement | Confidence         | Apply                 | Challenging sections |
| Warning       | Error Prevention   | Evaluate              | Pitfall boxes        |
| Celebration   | Mastery            | Create                | Chapter conclusion   |

## 14. Visual Hierarchy Rule

Welcome and Celebration poses may be slightly larger than other poses.

Tip and Warning poses should be slightly smaller and placed in margins or side panels.

## 15. Behavioral Consistency Rule

Axiom must never:

* Overuse the Tip pose (avoid appearing preachy)
* Use the Welcome pose mid-chapter
* Use the Celebration pose before mastery checkpoints

## 16. Final Emotional Arc per Chapter

1. Welcome
2. Guide
3. Explain
4. Tip
5. Encourage
6. Reflect
7. Celebrate

This progression mirrors the learning graph growth metaphor.

If you’d like next, I can:

* Design a visual pose sheet layout reference
* Create a JSON schema for pose metadata (for AI generation consistency)
* Generate prompt templates for automatically producing each pose
* Create a brand consistency enforcement checklist for 70+ textbooks

Axiom is now formally structured for scalable deployment across the Intelligent Textbooks ecosystem.
