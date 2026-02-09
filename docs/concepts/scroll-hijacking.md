# Scroll Hijacking and MicroSim Iframes

## What is Scroll Hijacking?

Scroll hijacking occurs when a web page overrides the browser's
native scroll behavior.  Instead of the page moving at the
speed and distance the reader expects, the scroll is intercepted
to trigger animations, snap to sections, or change direction.
The result is a disorienting experience where the reader
loses control of their position in the content.

In the context of intelligent textbooks, scroll hijacking
most commonly happens **unintentionally** when an interactive
MicroSim iframe is embedded in a chapter's content area.

## Design Goal: Keep the Iframe Simple

A core goal of the MicroSim project is to make it as easy as
possible to copy a MicroSim into **any** website -- a WordPress
blog, a Google Sites page, an LMS like Canvas or Moodle, or
another MkDocs textbook.  The "Copy Iframe" workflow should
give the user the simplest possible embed code:

```html
<iframe src="https://example.github.io/course/sims/sine-wave/main.html"
    width="100%" height="650px"></iframe>
```

This means scroll-hijacking prevention must live in the
**host site's CSS and JavaScript**, not in extra classes or
attributes on the iframe itself.  If the iframe tag requires
a special class, a `tabindex`, or an inline `style` attribute
just to scroll correctly, every person who copies the embed
code must also remember to include those extras -- and they
will not.  The simpler the iframe tag, the more likely it
works correctly everywhere.

That is why the solution below applies `pointer-events: none`
to **all** iframes through the site stylesheet rather than
requiring a per-iframe class.  The iframe stays clean, and
scroll protection is handled once at the site level.

## How Iframes Cause Scroll Hijacking

When a reader scrolls through a chapter and their pointer
enters a MicroSim iframe, the browser routes scroll events
to the iframe's document instead of the parent page.
This creates three problems:

1. **The chapter stops scrolling** -- the reader's scroll wheel
   or trackpad now controls whatever is inside the iframe
   (zooming a canvas, scrolling an internal panel, or doing nothing).
2. **The reader gets stuck** -- they must deliberately move their
   pointer outside the iframe boundary to resume reading.
3. **It feels like a broken page** -- even though the developer
   did not intentionally override scroll, the iframe boundary
   creates the same disorienting effect as deliberate scroll hijacking.

This problem is worst on **tall iframes** that fill most of the
viewport, because the reader has very little room to position
their pointer outside the iframe to scroll past it.

## The `pointer-events` Solution

The most effective solution is to **disable pointer events on the
iframe by default** so that scroll events pass through to the
parent page, then **enable interaction when the reader
deliberately clicks on the MicroSim**.

### CSS

Add this to your site's `extra.css`.  These rules apply to
**all** iframes on the site, so no special class is needed
on individual iframe elements:

```css
/* All iframes: disable pointer events so page scroll
   passes through. Interaction is enabled on click via JS. */
iframe {
    pointer-events: none;
}

/* Active state: restore pointer events for full interaction */
iframe.active {
    pointer-events: auto;
}
```

### JavaScript

Add this to your site's `extra.js`:

```javascript
document.addEventListener("DOMContentLoaded", function () {

    // Click on an iframe to activate it
    document.querySelectorAll("iframe").forEach((iframe) => {
        iframe.addEventListener("click", function () {
            this.classList.add("active");
        });
    });

    // Click anywhere outside an active iframe to deactivate it
    document.addEventListener("click", function (e) {
        if (!e.target.closest("iframe")) {
            document.querySelectorAll("iframe.active")
                .forEach((iframe) => {
                    iframe.classList.remove("active");
                });
        }
    });
});
```

### HTML Usage

No special class or attribute is needed.  Standard iframe
markup works as-is:

```html
<iframe src="../../sims/sine-wave/main.html"
    width="100%"
    height="650px"
    scrolling="no"
    style="overflow: hidden;">
</iframe>
```

When the page loads, the iframe is visible but non-interactive.
The reader can scroll past it freely.  Clicking on the iframe
activates pointer events so the reader can interact with sliders,
buttons, and the canvas.  Clicking anywhere else on the page
deactivates the iframe, returning scroll control to the chapter.

## The Click-to-Interact Overlay

For a more explicit user experience, add a **visible overlay**
that tells the reader the simulation is available.  This is
especially helpful for tall MicroSims or simulations that
are not obviously interactive at first glance.

### CSS for the Overlay

```css
/* Wrapper for iframe + overlay */
.microsim-wrapper {
    position: relative;
    width: 100%;
}

/* Semi-transparent overlay with instructions */
.microsim-wrapper .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.15);
    cursor: pointer;
    z-index: 10;
    transition: opacity 0.3s;
}

.microsim-wrapper .overlay span {
    background: white;
    padding: 0.5rem 1.2rem;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.95rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

/* Hide overlay when wrapper is active */
.microsim-wrapper.active .overlay {
    opacity: 0;
    pointer-events: none;
}
```

### HTML with Overlay

```html
<div class="microsim-wrapper" markdown>
    <div class="overlay" onclick="this.parentElement.classList.add('active')">
        <span>Click to interact</span>
    </div>
    <iframe src="../../sims/sine-wave/main.html"
        width="100%"
        height="650px"
        scrolling="no"
        style="overflow: hidden;">
    </iframe>
</div>
```

## Placement Guidelines

Where you place a MicroSim within a chapter also affects
how disruptive scroll capture feels to the reader.

1. **Place MicroSims at natural reading breaks** -- the end of
   a section or after a concept explanation.  If the reader is
   already pausing, briefly losing scroll control is less jarring.
2. **Introduce the MicroSim before the iframe** -- a sentence
   like *"The simulation below lets you adjust the frequency
   and amplitude"* prepares the reader to expect an interactive
   element and reduces surprise.
3. **Leave whitespace above and below** -- padding around the
   iframe gives the reader room to position their pointer
   outside the iframe boundary when they want to scroll past.
4. **Avoid stacking multiple iframes** -- two tall iframes
   back-to-back can make it nearly impossible to scroll through
   a section without triggering one of them.

## Avoiding `mouseWheel()` Conflicts in p5.js

If your p5.js MicroSim uses the `mouseWheel()` function
(for example, to zoom a visualization), the canvas will
always consume scroll events when the pointer is over it,
even without the iframe boundary problem.

To prevent this from fighting with page scroll:

1. **Only handle `mouseWheel()` when the sim is focused** --
   check a boolean flag that is set when the user clicks
   the canvas.
2. **Call `return false`** inside `mouseWheel()` only when
   you actually handle the event -- this prevents the
   default page scroll only when the sim is actively using it.
3. **Prefer canvas-based zoom controls** -- a pair of
   "Zoom In" / "Zoom Out" buttons drawn on the canvas
   avoids the scroll conflict entirely.

```javascript
let simFocused = false;

function mousePressed() {
    // check if click is within the canvas
    if (mouseX > 0 && mouseX < width &&
        mouseY > 0 && mouseY < height) {
        simFocused = true;
    }
}

function mouseWheel(event) {
    if (simFocused) {
        // handle zoom
        scaleFactor += event.delta > 0 ? -0.05 : 0.05;
        return false; // prevent page scroll
    }
    // allow page scroll to continue
}

// reset focus when the user clicks outside
window.addEventListener("click", function () {
    simFocused = false;
});
```

## Accessibility Considerations

Scroll hijacking disproportionately affects users who navigate
with keyboards, screen readers, or alternative input devices.

- **Keyboard users** should be able to Tab past the iframe
  without getting trapped. Iframes with `tabindex="-1"` are
  skipped during keyboard navigation unless the user
  explicitly clicks into them.
- **Screen reader users** benefit from an `aria-label` or
  `title` attribute on the iframe that describes the MicroSim
  so they can decide whether to enter it.
- **Trackpad and touch users** are the most affected by
  scroll capture because their scroll gestures are always
  pointer-based.  The `pointer-events: none` approach
  described above works well for these users.

```html
<iframe src="../../sims/sine-wave/main.html"
    width="100%"
    height="650px"
    scrolling="no"
    tabindex="-1"
    title="Interactive sine wave simulation with frequency and amplitude controls"
    style="overflow: hidden;">
</iframe>
```

## Summary

| Strategy | Effort | Effectiveness |
|---|---|---|
| `pointer-events: none` with click-to-activate | Low | High |
| Click-to-interact overlay | Medium | High |
| Place iframes at section breaks | None | Medium |
| Introductory text before the iframe | None | Medium |
| Avoid `mouseWheel()` or guard it with focus | Low | High |
| `tabindex="-1"` for keyboard navigation | None | Medium |

The core principle: **a reader scrolling through a chapter should
never be surprised by losing scroll control**.  The iframe should
be easy to scroll past and intentional to interact with.
